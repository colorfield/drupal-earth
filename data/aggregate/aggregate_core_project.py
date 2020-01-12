import os, json, datetime

# Aggregates data fetched with get_yearly_core_project_usage.py

#-------------------------------------------------------------------
# Constants and initialization
#-------------------------------------------------------------------

# @todo generalize for other projects with cli argument
# e.g. https://www.drupal.org/project/usage/views
# views

sourceFile = '../output/raw/core_project_usage.json'
outputDirectory= '../output/aggregate'
jsonOutputFileName = 'core_project.json'

#-------------------------------------------------------------------
# Aggregate values
#-------------------------------------------------------------------

# The table output is per week, so aggregate weeks rows per year.
yearsIndexes = {}
if os.path.isfile(sourceFile):
    with open(sourceFile) as jsonFile:
        data = json.load(jsonFile)
        rowIndex = 0
        for week in data['Week']:
          # Get the last 4 chars, for the year.
          year = week[-4:]
          if year not in yearsIndexes:
              yearsIndexes[year] = {
                'rows': [],
                'versions': {}
              }
          yearsIndexes[year]['rows'].append(rowIndex)
          rowIndex += 1

# Iterate then through each row to sum the amount for each version.
for key in data:
  # If the column is a major version, sum the values.
  try:
    # The first column key index provides the major version.
    # Cast it and throw to make sure that other columns are excluded.
    majorVersion = int(key[0])
    # Then set it back to string to use it as a key, with the '.x' suffix
    majorVersion = str(key[0]) + '.x'
    # Iterate through each year rows indexes.
    for year in yearsIndexes:
      # There are several columns with several sub versions for a major version.
      # so make sure to init to 0 when the first one is met.
      if majorVersion not in yearsIndexes[year]['versions']:
        yearsIndexes[year]['versions'][majorVersion] = 0

      # Get the value from the raw data for each row per year.  
      for row in yearsIndexes[year]['rows']:
        # Try to parse as int the amount of installations.
        # Formatted with a comma as thousands separator.
        rowValueWithoutSeparator = data[key][row]
        if type(data[key][row]) == str:
          rowValueWithoutSeparator = data[key][row].replace(',', '')
        else:
          rowValueWithoutSeparator = data[key][row]
        try:
          installations = int(rowValueWithoutSeparator)
          # The average will be done later, just sum each row.
          yearsIndexes[year]['versions'][majorVersion] = yearsIndexes[year]['versions'][majorVersion] + installations
        except ValueError:
          pass
  # Exclude other columns  
  except ValueError:
    pass

# Prepare the final output, with the average
versionsPerYearOutput = []
# Expected output for a year
#[
# {
#  "year": 2019,
#  "5.x": n,
#  "6.x": n,
#  "7.x": n,
#  "8.x": n 
# }
#]
for year in yearsIndexes:
  yearOutput = {}
  yearOutput['year'] = year
  totalRows = len(yearsIndexes[year]['rows'])
  for version in yearsIndexes[year]['versions']:
    yearOutput[version] = round(int(yearsIndexes[year]['versions'][version]) / int(totalRows))
  versionsPerYearOutput.append(yearOutput)

# Reverse to order asc by year
versionsPerYearOutput.reverse()

# dumps (plural) converts lists
jsonOutput = json.dumps(versionsPerYearOutput)
print(jsonOutput)
with open(outputDirectory + '/' + jsonOutputFileName, 'w') as outfile:
  outfile.write(jsonOutput)
  outfile.close()
print('Aggregate core project json file created')
