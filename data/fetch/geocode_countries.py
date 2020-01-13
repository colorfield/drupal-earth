import os, urllib.request, json, configparser

# Geocode countries from the core_users.json aggregate.

#-------------------------------------------------------------------
# Constants and initialization
#-------------------------------------------------------------------

# File that contains the aggregated data.
usersAggregateFilePath = '../output/aggregate/core_users.json'

outputDirectory= '../output/aggregate'
jsonFileName = 'countries.json'

# List of country codes from the users aggregated data.
countryCodes = []
# Dictionary of countries that will contain the name and geocode data.
countriesGeocoded = {}

# API endpoints.
# Country name with alpha2 country code
countryEndpoint = 'https://restcountries.eu/rest/v2/alpha/'

# Geocoding with LocationIQ (optional)
# Read .env file to get the API key.
# Copy .env.example to .env local and set your API key(s).
# @see https://docs.python.org/3/library/configparser.html

#config = configparser.RawConfigParser()
#config.read('.env.local')
#locationIQKey = config.get('rest_key', 'locationiq_key')
#geocodeEndpoint = 'https://eu1.locationiq.com/v1/search.php?key='+locationIQKey

#-------------------------------------------------------------------
# Get the list of country codes to geocode from aggregated data
#-------------------------------------------------------------------

try:
    if os.path.isfile(usersAggregateFilePath):
        with open(usersAggregateFilePath) as jsonFile:
            data = json.load(jsonFile)
            for countryCode in data['countries']:
                countryCodes.append(countryCode)
except Exception as e:
    print(e)

print(countryCodes)

#-------------------------------------------------------------------
# Geocode countries by country code
#-------------------------------------------------------------------

for countryCode in countryCodes:
  # @todo try/catch
  # Get first the country name
  print('Get country content from ' + countryEndpoint + countryCode)
  with urllib.request.urlopen(countryEndpoint + countryCode) as url:
      countryContent = json.loads(url.read().decode())
  # Then the geocode
  #print('Get geocode from ' + geocodeEndpoint + '&q=' + countryContent['name'] + '&format=json')
  #with urllib.request.urlopen(geocodeEndpoint + '&q=' + countryContent['name'] + '&format=json') as url:
  #    geoContent = json.loads(url.read().decode())
  country = {
    "code": countryCode,
    "name": countryContent['name'],
    "population": countryContent['population'],
    "demonym": countryContent['demonym'],
    "area": countryContent['area'],
    "region": countryContent['region'],
    "flag": countryContent['flag'],
    "latitude": countryContent['latlng'][0],
    "longitude": countryContent['latlng'][1]
    #"latitude": geoContent[0]['lat'],
    #"longitude": geoContent[0]['lon']
  }
  countriesGeocoded[countryCode] = country

jsonOutput = json.dumps(countriesGeocoded)
print(jsonOutput)
with open(outputDirectory + '/' + jsonFileName, 'w') as outfile:
     outfile.write(jsonOutput)
     outfile.close()
print('Countries json file created')
