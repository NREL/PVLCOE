"""
This script makes calls to the NSRDB API to get weather files to run the PySAM model. Note: you must create your own API key before this script will run

get API key: https://developer.nrel.gov/signup/
API instructions: https://nsrdb.nrel.gov/data-sets/api-instructions.html
"""

import pandas as pd
from pathlib import Path  # for platform independent paths


df = pd.read_csv('location_coordinates.csv')

lat_list = []
lon_list = []
states = []
ids = []

# read in csv with state abbreviation and corresponding latitude and longitude
# used for creating file names
for index, row in df.iterrows():
    lat_list.append(row['Latitude'])
    lon_list.append(row['Longitude'])
    states.append(row['State'])
    ids.append(row['ID'])

# make an API call for each location
for i in range(len(lat_list)):
    lat = lat_list[i]
    lon = lon_list[i]
    state = states[i]
    location_id = ids[i]

    # all variables must be strings, with spaces replaced by +
    api_key = ''  # REPLACE: get an API key from the link in the header comment
    attributes = 'ghi,dhi,dni,wind_speed,air_temperature,dew_point,surface_pressure,wind_direction,surface_albedo'
    data_type = 'tmy'
    utc = 'false'
    your_name = ''  # REPLACE and separate with + (e.g. Jane+Doe)
    reason_for_use = 'testing'
    your_affiliation = ''  # REPLACE (e.g. NREL)
    your_email = ''  # REPLACE
    mailing_list = 'false'

    url = 'https://developer.nrel.gov/api/nsrdb/v2/solar/psm3-tmy-download.csv?wkt=POINT({lon}%20{lat})&names={type}&utc={utc}&full_name={name}&email={email}&affiliation={affiliation}&mailing_list={mailing_list}&reason={reason}&api_key={api}&attributes={attr}'.format(
        lat=lat, lon=lon, type=data_type, utc=utc, name=your_name, email=your_email, mailing_list=mailing_list, affiliation=your_affiliation, reason=reason_for_use, api=api_key, attr=attributes)

    info = pd.read_csv(url)
    # save the info to a csv, the weather_files folder must already be created
    info.to_csv(Path('weather_data/' + str(location_id) + '_' + state +
                     '_' + str(lat) + '_' + str(lon) + '_tmy.csv'), index=False)
