"""
This code uses the PySAM wrapper for the SAM GUI to generate energy yield and create a new preset tree.
It loops through every combination of cell technology, package type, system type, inverter loading ratio
and location to determine the energy yield with those settings.

Note: this script runs PySAM 3300 times (for each preset combination) and takes ~30 mins to finish running.
"""
import pandas as pd
import json
import PySAM.Pvwattsv7 as pvwatts
import glob
import PySAM.ResourceTools as tools
import PySAM.PySSC as pssc
from pathlib import Path  # for platform independent paths

# to avoid rounding issues, the lat and lon returned by pysam are in this file
# locations maps a lat/lon pair to the string name of the location
locations = {}
df = pd.read_csv('location_coordinates.csv')
for index, row in df.iterrows():
    locations[row['ID']] = 'USA ' + \
        row['State'] + ' ' + row['Place']

# Define feasible system configurations
cell_technologies = ['mono-Si', 'multi-Si', 'CdTe']

package_types = {
    'mono-Si': ['glass-polymer backsheet', 'glass-glass'],
    'multi-Si': ['glass-polymer backsheet', 'glass-glass'],
    'CdTe': ['glass-glass']
}

system_types = {
    'mono-Si': ('fixed tilt, utility scale', 'single-axis tracked, utility scale', 'roof-mounted, residential scale', 'roof-mounted, commercial scale', 'fixed tilt, commercial scale'),
    'multi-Si': ('fixed tilt, utility scale', 'single-axis tracked, utility scale', 'roof-mounted, commercial scale', 'fixed tilt, commercial scale'),
    'CdTe': ('fixed tilt, utility scale', 'single-axis tracked, utility scale', 'roof-mounted, commercial scale', 'fixed tilt, commercial scale')
}


# Preset values for module parameters: costs are in USD per square meter, efficiency reported as a percentage
module_details = {
    'cost_front_layer': 3.5,
    'cost_cell': {'mono-Si': 22.2, 'multi-Si': 19.4, 'CdTe': 21.3},
    'cost_back_layer': {'glass-polymer backsheet': 2.4, 'glass-glass': 3},
    'cost_noncell': 13.6,
    'efficiency': {'mono-Si': 19.5, 'multi-Si': 17.5, 'CdTe': 18.0},
}


# Preset values for operation & maintenance costs, reported in USD/kW(DC) per year
cost_om = {
    'fixed tilt, utility scale': 16.32,
    'single-axis tracked, utility scale': 17.46,
    'roof-mounted, residential scale': 28.94,
    'roof-mounted, commercial scale': 18.55,
    'fixed tilt, commercial scale': 18.71
}

# WARNING: make sure these values are the same as in the MakeBOSTree.py file
inverter_loading_ratio = [1.1, 1.3, 1.4]

# creating PySAM model with default info from json file (that doesn't have location info)
json_file = open("pvwatts_inputs.json")
pvwatts_dict = json.load(json_file)

# using the pvwatts model
pv_dat = pssc.dict_to_ssc_table(pvwatts_dict, "pvwattsv7")
json_file.close()
json_model = pvwatts.wrap(pv_dat)

# convert weather files into format that can be used by PySAM
weather_folder = "weather_data"
weather_files = glob.glob(weather_folder + "/*.csv")

# tilt angles reported in degrees, needed for running PySAM
tilt = {'fixed tilt, utility scale': 33, 'single-axis tracked, utility scale': 0,
        'roof-mounted, residential scale': 25, 'roof-mounted, commercial scale': 10, 'fixed tilt, commercial scale': 10}

# 0: fixed rack, 1: fixed roof, 2: 1 axis, 3: backtracked; needed for running PySAM
# backtracking for the silicon single-axis tracked systems but not for CdTe
array_type = {'mono-Si': {'fixed tilt, utility scale': 0, 'single-axis tracked, utility scale': 3,
                          'roof-mounted, residential scale': 1, 'roof-mounted, commercial scale': 1, 'fixed tilt, commercial scale': 0},
              'multi-Si': {'fixed tilt, utility scale': 0, 'single-axis tracked, utility scale': 3,
                           'roof-mounted, residential scale': 1, 'roof-mounted, commercial scale': 1, 'fixed tilt, commercial scale': 0},
              'CdTe': {'fixed tilt, utility scale': 0, 'single-axis tracked, utility scale': 2,
                       'roof-mounted, residential scale': 1, 'roof-mounted, commercial scale': 1, 'fixed tilt, commercial scale': 0}}


# between 0 and 1, needed for running PySAM
ground_coverage_ratio = {'fixed tilt, utility scale': 0.44, 'single-axis tracked, utility scale': 0.33,
                         'roof-mounted, residential scale': 0.44, 'roof-mounted, commercial scale': 0.44, 'fixed tilt, commercial scale': 0.44}

preset_tree = {}
for cell_technology in cell_technologies:
    if cell_technology not in preset_tree:
        preset_tree[cell_technology] = {}
    for package_type in package_types[cell_technology]:
        if package_type not in preset_tree[cell_technology]:
            preset_tree[cell_technology][package_type] = {}
        for system_type in system_types[cell_technology]:
            if system_type not in preset_tree[cell_technology][package_type]:
                preset_tree[cell_technology][package_type][system_type] = {}
            for ilr in inverter_loading_ratio:
                if ilr not in preset_tree[cell_technology][package_type][system_type]:
                    preset_tree[cell_technology][package_type][system_type][ilr] = {}
                for f in weather_files:
                    json_model.SolarResource.solar_resource_data = tools.SAM_CSV_to_solar_data(
                        f)
                    # remove folder name from file name
                    f = f.replace(weather_folder + '/', '')
                    # get the id from the beginning of the string
                    location_id = f.split('_')[0]
                    # string name of location
                    location = locations[int(location_id)]

                    # set specific inputs of PySAM model based on system type and ILR
                    json_model.SystemDesign.gcr = ground_coverage_ratio[system_type]
                    json_model.SystemDesign.array_type = array_type[cell_technology][system_type]
                    json_model.SystemDesign.tilt = tilt[system_type]
                    json_model.SystemDesign.dc_ac_ratio = ilr

                    json_model.execute(0)  # run the model
                    # get the energy yield from the outputs
                    energy_yield = json_model.Outputs.kwh_per_kw

                    preset_tree[cell_technology][package_type][system_type][ilr][location] = {
                        'cost_front_layer': module_details['cost_front_layer'],
                        'cost_cell': module_details['cost_cell'][cell_technology],
                        'cost_back_layer': module_details['cost_back_layer'][package_type],
                        'cost_noncell': module_details['cost_noncell'],
                        'cost_om': cost_om[system_type],
                        'efficiency': module_details['efficiency'][cell_technology],
                        'energy_yield': energy_yield,
                        'degradation_rate': 0.7,
                        'state': location.split(' ')[1]
                    }


with open(Path('../js/PresetTree.js'), 'w') as file:
    file.write('var preset_tree = ' + json.dumps(preset_tree,
                                                 indent=2, separators=(',', ': ')))
