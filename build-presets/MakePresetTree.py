"""
This code a model based on json inputs to create a new preset tree. It loops through all the TMY weather files for each state.
"""
import pandas as pd
import json
import PySAM.Pvwattsv7 as pvwatts
import glob
import PySAM.ResourceTools as tools
import PySAM.PySSC as pssc

# to avoid rounding issues, the lat and lon returned by pysam are in this file
# turn this into json????
locations_from_file = {}
df = pd.read_csv('/Users/sandrews/Documents/pysam_coords_final.csv')
for index, row in df.iterrows():
	locations_from_file[(row['Latitude'], row['Longitude'])] = 'USA ' + row['State'] + ' ' + row['Place']
print(locations_from_file)	

# %% Define feasible system configurations
cell_technologies = ['mono-Si', 'multi-Si', 'CdTe']

package_types = {
    'mono-Si': ('glass-polymer backsheet', 'glass-glass'),
    'multi-Si': ('glass-polymer backsheet', 'glass-glass'),
    'CdTe': ('glass-glass')
}

system_types = {
    'mono-Si': ('fixed tilt, utility scale', 'single-axis tracked, utility scale', 'roof-mounted, residential scale', 'roof-mounted, commercial scale', 'fixed tilt, commercial scale'),
    'multi-Si': ('fixed tilt, utility scale', 'single-axis tracked, utility scale', 'roof-mounted, commercial scale', 'fixed tilt, commercial scale'),
    'CdTe': ('fixed tilt, utility scale', 'single-axis tracked, utility scale', 'roof-mounted, commercial scale', 'fixed tilt, commercial scale')
}


# %% Preset values for module parameters: costs are in USD per square meter, efficiency reported as a percentage
module_details = {
    'cost_front_layer': 3.5,
    'cost_cell': {'mono-Si': 22.2, 'multi-Si': 19.4, 'CdTe': 21.3},
    'cost_back_layer': {'glass-polymer backsheet': 2.4, 'glass-glass': 3},
    'cost_noncell': 13.6,
    'efficiency': {'mono-Si': 19.5, 'multi-Si': 17.5, 'CdTe': 18.0},
}


# %% Preset values for operation & maintenance costs, reported in USD/kW(DC) per year
cost_om = {
    'fixed tilt, utility scale': 16.32,
    'single-axis tracked, utility scale': 17.46,
    'roof-mounted, residential scale': 28.94,
    'roof-mounted, commercial scale': 18.55,
    'fixed tilt, commercial scale': 18.71
}

inverter_load_ratio = {1.1, 1.3, 1.4}
 
# creating model with template json file (that doesn't have location info)

json_file = open("/Users/sandrews/Documents/pvwatts.json")
dic = json.load(json_file)
pv_dat = pssc.dict_to_ssc_table(dic, "pvwattsv7")
json_file.close()
json_model = pvwatts.wrap(pv_dat)

# convert weather files into format that can be used by PySAM
weather_folder = "/Users/sandrews/Documents/calculator_locations"
weather_files = glob.glob(weather_folder + "/*.csv")
weather_data = [tools.SAM_CSV_to_solar_data(f) for f in weather_files]

tilt = {'fixed tilt, utility scale': 33, 'single-axis tracked, utility scale': 33, 'roof-mounted, residential scale': 25, 'roof-mounted, commercial scale': 10, 'fixed tilt, commercial scale': 10}
array_type = {'fixed tilt, utility scale': 0, 'single-axis tracked, utility scale': 2, 'roof-mounted, residential scale': 1, 'roof-mounted, commercial scale': 1, 'fixed tilt, commercial scale': 0}
ground_coverage_ratio = {'fixed tilt, utility scale': 0.44, 'single-axis tracked, utility scale': 0.33, 'roof-mounted, residential scale': 0.44, 'roof-mounted, commercial scale': 0.44, 'fixed tilt, commercial scale': 0.44}

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
				for solar_resource_file in weather_data:
					for ilr in inverter_load_ratio:
						json_model.SolarResource.solar_resource_data = solar_resource_file
						lat = json_model.SolarResource.solar_resource_data['lat']
						lon = json_model.SolarResource.solar_resource_data['lon']
						location = locations_from_file[(lat, lon)]

						json_model.SystemDesign.gcr = ground_coverage_ratio[system_type]
						json_model.SystemDesign.array_type = array_type[system_type]
						json_model.SystemDesign.tilt = tilt[system_type]
						json_model.SystemDesign.dc_ac_ratio = ilr
						json_model.execute(0)
						energy_yield = json_model.Outputs.kwh_per_kw

						preset_tree[cell_technology][package_type][system_type][location] = {
							'cost_front_layer': module_details['cost_front_layer'],
            						'cost_cell': module_details['cost_cell'][cell_technology],
           						'cost_back_layer': module_details['cost_back_layer'][package_type],
            						'cost_noncell': module_details['cost_noncell'],
            						'cost_om': cost_om[system_type],
            						'efficiency': module_details['efficiency'][cell_technology],
            						'energy_yield': energy_yield,
            						# 'degradation_rate': degradation_rates[(cell_technology, package_type, system_type, location)],
            						'state': location.split(' ')[1],
							'ILR': ilr,
							'tilt': tilt[system_type]
						}

# print(preset_tree)			
with open('preset_tree.js', 'w') as file:
    file.write('var preset_tree = ' + json.dumps(preset_tree, indent=2, separators=(',', ': ')))

