import os, json, datetime

# Aggregates data fetched with get_core_users.py

#-------------------------------------------------------------------
# Constants and initialization
#-------------------------------------------------------------------

sourceDirectory = '../output/raw/core_user'
outputDirectory= '../output/aggregate'
jsonFileName = 'core_users.json'
totalPages = 0
totalUsers = 0

# Dict of values to be aggregated.
usersAggregate = {
  'countries': {},
  'locations': {},
  'da_membership_status': {},
  'primary_languages': {},
  'languages': {},
  'years': {},
  'industries': {},
  'contributions': {},
  'events': {},
  'totalUsers': 0
}

#-------------------------------------------------------------------
# Helpers
#-------------------------------------------------------------------

# Aggregates scalar field values.
def aggregateScalarValue(field_value, aggregate_name):
    # 'None' value is not stored.
    if field_value is not None:
        #fieldKey = slugify(field_value)
        fieldKey = field_value
        if fieldKey in usersAggregate[aggregate_name]:
            usersAggregate[aggregate_name][fieldKey] += 1
        else:
            usersAggregate[aggregate_name][fieldKey] = 1

# Aggregates compound field values.
def aggregateCompoundValue(compound_field_value, aggregate_name):
    if isinstance(compound_field_value, list) and compound_field_value:
        for field_value in compound_field_value:
            aggregateScalarValue(str(field_value), aggregate_name)

# Maps scalar field and aggregate name.
# Gender does not seem to be exposed anymore.
scalarFields = {
  'field_country': 'countries',
  'field_user_location': 'locations',
  'field_da_ind_membership': 'da_membership_status',
  'field_user_primary_language': 'primary_languages'
}

# Maps compound field and aggregate name.
compoundFields = {
  'field_languages': 'languages',
  'field_industries_worked_in': 'industries',
  'field_contributed': 'contributions',
  'field_events_attended': 'events'
}

 #-------------------------------------------------------------------
 # Aggregate values
 #-------------------------------------------------------------------

# Read all pages (files) and aggregate values.
# @todo also aggregate values with cross references (e.g. country/languages)
for file in os.listdir(sourceDirectory):
    filePath = os.path.join(sourceDirectory, file)
    print('Reading file ' + file)
    try:
        if os.path.isfile(filePath):
            with open(filePath) as jsonFile:
                data = json.load(jsonFile)
                totalPages += 1
                for user in data['list']:
                    for field in scalarFields:
                      aggregateScalarValue(user[field], scalarFields[field])
                    for field in compoundFields:
                      aggregateCompoundValue(user[field], compoundFields[field])
                    # Convert in year then aggregate
                    if user['created'] is not None:
                        year = datetime.datetime.fromtimestamp(int(user['created'])).year
                        aggregateScalarValue(year, 'years')
                    totalUsers += 1
    except Exception as e:
        print(e)

usersAggregate['totalUsers'] = totalPages

# Print results.
print('Total pages: ' + str(totalPages))
# @todo document the difference
print('Total users: ' + str(totalUsers))

# dumps (plural) converts lists
jsonOutput = json.dumps(usersAggregate)
print(jsonOutput)
with open(outputDirectory + '/' + jsonFileName, 'w') as outfile:
     outfile.write(jsonOutput)
     outfile.close()
print('Aggregate core users json file created')
