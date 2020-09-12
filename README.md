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
 
The values for efficiency and all costs listed above are defined in the python file. The sources for these values are cited in https://www.nrel.gov/pv/lcoe-calculator/documentation.html. Energy yield and degradation rate values are populated from an Excel sheet ('Energy-yield_deg-rate.xlsx') which contains data for all feasible combinations of different hardware configurations (cell material, module packaging, system type) and locations. The sources for these values are also cited in the documentation file.  

