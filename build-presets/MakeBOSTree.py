import pandas as pd
import numpy as np
from scipy.optimize import curve_fit
import json

efficiencies = []

# 10% to 40% efficiency
# building a list of efficiencies
start = 0.1
while (start < 0.41):
	efficiencies.append(round(start, 2)) 
	start += 0.01

# creates a data frame for each system type
bos_table = {
	'fixed tilt, utility scale': pd.read_csv('BOS_cost_data/fixed_tilt_utility.csv'),
	'single-axis tracked, utility scale': pd.read_csv('BOS_cost_data/tracked_utility.csv'),
	'roof-mounted, residential scale': pd.read_csv('BOS_cost_data/roof_residential.csv'),
	'roof-mounted, commercial scale': pd.read_csv('BOS_cost_data/roof_commercial.csv'),
	'fixed tilt, commercial scale': pd.read_csv('BOS_cost_data/fixed_tilt_commercial.csv')
}

ilr = [1.1, 1.3, 1.4]
constraints = ["Area_Constrained", "Power_Constrained"]

# function used for curve fit
def bos_cost(efficiency, per_power, per_area):
	return per_power + per_area/(efficiency * 1000.0)

bos_presets = {}
for system_type in bos_table:
	# strip leading and trailing white space
	bos_table[system_type]['Area_Power_Constrained'] = bos_table[system_type]['Area_Power_Constrained'].str.strip()
	# convert spaces to underscores, needed for the query function to filter the data frames
	bos_table[system_type]['Area_Power_Constrained'] = bos_table[system_type]['Area_Power_Constrained'].replace(' ', '_', regex=True)
	
	if system_type not in bos_presets:
		bos_presets[system_type] = {}
	for val in ilr:
		if val not in bos_presets[system_type]:
			bos_presets[system_type][val] = {}
		for constraint in constraints:
			if constraint not in bos_presets[system_type][val]:
				bos_presets[system_type][val][constraint] = {}
			# filters the data frame to only get the costs for the given ILR and constraint
			costs = bos_table[system_type].query('Area_Power_Constrained == @constraint and ILR == @val')['System Cost'].values.tolist()
			
			bos_presets[system_type][val][constraint] = dict(
            			zip(
                			['cost_bos_power', 'cost_bos_area'],
                			np.around(curve_fit(bos_cost, efficiencies, costs)[0], decimals=2).tolist()
            			)
        		)
			
with open('../js/BOSCostTree.js', 'w') as file:
    file.write('var cost_bos_tree = ' + json.dumps(bos_presets, indent=2, separators=(',', ': ')))