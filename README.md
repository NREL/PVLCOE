# PVLCOE
The Comparative PV LCOE Calculator calculates levelized cost of energy (LCOE) for photovoltaic (PV) systems based on cost, performance, and reliability inputs for a *baseline* and a *proposed* technology. It is a single javascript-powered web page that runs entirely on the client side. Check the `lcoe_calculator_documentation.html` file for more detailed documentation. The calculator can be run from the source by downloading this repository and opening `lcoe_calculator.html` in a web browser. The latest release of the calculator is available to use online at https://pvlcoe.nrel.gov 

The structure of the repository is shown below.

![image](https://user-images.githubusercontent.com/70656408/122481236-5605ca80-cf9c-11eb-9c63-e30ef10d3a4a.png)

 
# Building a Preset Tree for NREL PVLCOE Calculator
In the `/build-presets/` folder, the `MakePresetTree.py` file builds a javascript file which supplies the preset values that appear in the NREL PVLCOE calculator at http://pvlcoe.nrel.gov/.

The values for efficiency, degradation rate, and all costs listed above are defined in the python file. The sources for these values are cited in https://www.nrel.gov/pv/lcoe-calculator/documentation.html. Energy yield is populated by running the NREL PySAM model inside the `MakePresetTree.py` script for every combination of presets (cell technology, module package type, system type, inverter loading ratio, and location). PySAM installation instructions are here: https://nrel-pysam.readthedocs.io/en/master/. The sources for these values are also cited in the documentation file. You can edit (or add) default values that are preset in the calculator. Follow the instructions depending on which values you want to edit:

## If you only want to change or add locations:
 - The `get_weather_files.py` script contains code to make calls to the NSRDB API to get the weather files necessary for running PySAM. Fill in your information on the lines marked by `REPLACE` in the script. Links to the API instructions and getting a key are in the file header comment. To add a location, add the name of the location and its latitude and longitude coordinates to the `location_coordinates.csv` files. Re-running `get_weather_files.py` may affect results if NSRDB has been updated (e.g. a new year of data released) after the original files were generated. 
 - Install the requirements listed in `requirements.txt` in the `/build-presets/` folder
 - Run `get_weather_files.py` to get a weather file for this location, and then run `MakePresetTree.py`.
 - Then, `lcoe_calculator.html` will show your new presets!

## If you want to change energy yield or the inputs to the PySAM model:
 - Install the requirements listed in `requirements.txt` in the `/build-presets/` folder
 - Make changes to the PySAM settings within `MakePresetTree.py`
 - Run `MakePresetTree.py` in the `/build-presets/` folder
 - Then, `lcoe_calculator.html` will show your new presets!

## If you want to change or add cell technologies, package types, system types, non-BOS costs, or efficiency:
 - Install the requirements listed in `requirements.txt` in the `/build-presets/` folder
 - If desired, add cell technologies, package types, or system types to the lists already available in `MakePresetTree.py`
 - Add/edit costs and efficiency values in-line in the `MakePresetTree.py` script
 - Run `MakePresetTree.py` in the `/build-presets/` folder
 - Then, `lcoe_calculator.html` will show your new presets!

## If you want to change or add BOS costs:
 - Install the requirements listed in `requirements.txt` in the `/build-presets/` folder
 - If desired, edit the costs in the spreadsheets corresponding to system type in the `/build-presets/BOS_cost_data/` folder
 - Run `MakeBOSTree.py` in the `/build-presets/` folder
 - Then, `lcoe_calculator.html` will show your new presets!

# Acknowledgment
This work was supported by the Durable Modules Consortium (DuraMAT), an Energy Materials Network Consortium funded by the U.S. Department of Energy, Office of Energy Efficiency and Renewable Energy, Solar Energy Technologies Office.