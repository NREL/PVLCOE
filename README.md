# PVLCOE
The Comparative PV LCOE Calculator calculates levelized cost of energy (LCOE) for photovoltaic (PV) systems based on cost, performance, and reliability inputs for a *baseline* and a *proposed* technology. It is a single javascript-powered web page that runs entirely on the client side. Check the `lcoe_calculator_documentation.html` file for more detailed documentation.

# Building a Preset Tree for NREL PVLCOE Calculator
In the /build-presets/ folder, the MakePresetTree.py file builds a javascript file which supplies the preset values that appear in the NREL PVLCOE calculator at http://pvlcoe.nrel.gov/, for the following parameters:
 - front layer cost
 - cell cost 
 - back layer cost 
 - non-cell costs
 - O&M costs
 - module efficiency 
 - energy yield 
 - degradation rate

The values for efficiency and all costs listed above are defined in the python file. The sources for these values are cited in https://www.nrel.gov/pv/lcoe-calculator/documentation.html. Energy yield and degradation rate values are populated from an Excel sheet ('Energy-yield_deg-rate.xlsx') which contains data for all feasible combinations of different hardware configurations (cell technology, module package type, system type) and locations. The sources for these values are also cited in the documentation file. You can edit (or add) default values that are preset in the calculator. Follow the instructions depending on which values you want to edit:

## If you only want to change or add locations, energy yield values, or degradation rate values:
 - Edit the relevant rows in 'Energy-yield_deg-rate.xlsx' which is stored in the /build-presets/ folder
 - Install the requirements listed in 'requirements.txt' in the /build-presets/ folder
 - Run MakePresetTree.py in the /build-presets/ folder
 - Then, lcoe_calculator.html will show your new presets!

## If you want to change or add cell technologies, package types, system types, non-BOS costs, or efficiency
 - Install the requirements listed in 'requirements.txt' in the /build-presets/ folder
 - If desired, add cell technologies, package types, or system types to the lists already available in MakePresetTree.py, then add new rows for these additional types in 'Energy-yield_deg-rate.xlsx' and enter values for energy yield and degradation rate
 - Add/edit costs and efficiency values in-line in the MakePresetTree.py script
 - Run MakePresetTree.py in the /build-presets/ folder
 - Then, lcoe_calculator.html will show your new presets!

