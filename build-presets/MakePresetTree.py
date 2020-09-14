#!/usr/bin/env python
# coding: utf-8

# %%
import pandas as pd
import numpy as np
import json


# %% Define feasible system configurations
cell_technologies = ['mono-Si', 'multi-Si', 'CdTe']

package_types = {
    'mono-Si': ('glass-polymer backsheet', 'glass-glass'),
    'multi-Si': ('glass-polymer backsheet', 'glass-glass'),
    'CdTe': ('glass-glass', )
}

system_types = {
    'mono-Si': ('fixed tilt, utility scale', 'single-axis tracked, utility scale', 'roof-mounted, residential scale'),
    'multi-Si': ('fixed tilt, utility scale', 'single-axis tracked, utility scale'),
    'CdTe': ('fixed tilt, utility scale', 'single-axis tracked, utility scale')
}


# %% Preset values for module parameters: costs are in USD per square meter, efficiency reported as a percentage
module_details = {
    'cost_front_layer': 4.06,
    'cost_cell': {'mono-Si': 34.4, 'multi-Si': 31.45, 'CdTe': 30},
    'cost_back_layer': {'glass-polymer backsheet': 2.32, 'glass-glass': 3},
    'cost_noncell': 18.,
    'efficiency': {'mono-Si': 19.0, 'multi-Si': 17.0, 'CdTe': 16.0},
}


# %% Preset values for operation & maintenance costs, reported in USD/kW(DC) per year
cost_om = {
    'fixed tilt, utility scale': 15.4,
    'single-axis tracked, utility scale': 18.50,
    'roof-mounted, residential scale': 21.00
}


# %%  Read energy yield and degradation rate data, remove weather file types from Location names
df_yield = pd.read_excel('Energy-yield_deg-rates.xlsx')
df_yield['Location'] = [label.replace(' (TMY2)', '').replace(' (TMY3)', '') for label in df_yield['Location']]


# %% Turn first four columns into keys, and create dictionaries for each energy yield and degradation rate by location
key_cols = list(df_yield.columns[:4])
value_cols = df_yield.columns[4:]
seq_keys = df_yield.groupby(key_cols).apply(lambda sub_df: sub_df[value_cols].values.tolist()).to_dict()

system_yield = {k: v[0][1] for k, v in seq_keys.items()}
degradation_rates = {k: v[0][2] for k, v in seq_keys.items()}


# %% Build the full preset tree
preset_tree = {}
for cell_technology, package_type, system_type, location in system_yield:
    if cell_technology not in preset_tree:
        preset_tree[cell_technology] = {}
    if package_type not in preset_tree[cell_technology]:
        preset_tree[cell_technology][package_type] = {}
    if system_type not in preset_tree[cell_technology][package_type]:
        preset_tree[cell_technology][package_type][system_type] = {}
    preset_tree[cell_technology][package_type][system_type][location] = {
            'cost_front_layer': module_details['cost_front_layer'],
            'cost_cell': module_details['cost_cell'][cell_technology],
            'cost_back_layer': module_details['cost_back_layer'][package_type],
            'cost_noncell': module_details['cost_noncell'],
            'cost_om': cost_om[system_type],
            'efficiency': module_details['efficiency'][cell_technology],
            'energy_yield': np.round(system_yield[(cell_technology, package_type, system_type, location)]),
            'degradation_rate': degradation_rates[(cell_technology, package_type, system_type, location)],
            'state': location.split(' ')[1]
        }


# %% Save as javascript files
with open('../js/preset_tree.min.js', 'w') as file:
    file.write('var preset_tree = ' + json.dumps(preset_tree, separators=(',', ':')))
# Create preset_tree.js if you want a version that is more legible to humans    
# with open('../js/preset_tree.js', 'w') as file:
#     file.write('var preset_tree = ' + json.dumps(preset_tree, indent=2, separators=(',', ': ')))

