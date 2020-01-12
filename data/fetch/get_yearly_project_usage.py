import os, sys, getopt, urllib.request, urllib.parse, json, requests, lxml.html as lh

#-------------------------------------------------------------------
# Constants and initialization
#-------------------------------------------------------------------

fullCmdArguments = sys.argv
argumentList = fullCmdArguments[1:]
unixOptions = "hp:v"
gnuOptions = ["help", "project=", "verbose"]

# Arguments
verbose = False
project = ''

try:
    arguments, values = getopt.getopt(argumentList, unixOptions, gnuOptions)
except getopt.error as err:
    # Output error, and return with an error code
    print (str(err))
    sys.exit(2)

# Evaluate given options
for currentArgument, currentValue in arguments:
    if currentArgument in ("-v", "--verbose"):
        verbose = True
    elif currentArgument in ("-h", "--help"):
        print ("Example: python3 get_project_usage.py --project=drupal --verbose")
        # @todo exit
    elif currentArgument in ("-p", "--project"):
        # @todo throw error if empty
        project = currentValue
        print (("Setting the project to '%s'") % (currentValue))

drupalCoreProjectUrl = 'https://www.drupal.org/project/usage/' + project
outputDirectory = '../output/raw/'
outputFile = project + '_project_usage.json'

# Create the directory to store json files if it does not exist
os.makedirs(outputDirectory, exist_ok=True)

#-------------------------------------------------------------------
# Get core usage data
#-------------------------------------------------------------------

# Get the page
page = requests.get(drupalCoreProjectUrl)
doc = lh.fromstring(page.content)

# Get table with this id "project-usage-project-api"
tr_elements = doc.xpath("//table[@id='project-usage-project-api']//tr")

col=[]
i = 0
# For each row, store each first element (header) and an empty list
for t in tr_elements[0]:
    i += 1
    name=t.text_content()
    #print ('%d:"%s"'%(i,name))
    col.append((name,[]))

# Get data starting from the second row (skip header)
for j in range(1,len(tr_elements)):
    # T is the j'th row
    T = tr_elements[j]
    # column index
    i = 0

    # Iterate through each element of the row
    for t in T.iterchildren():
        data=t.text_content()
        # Check if row is empty
        if i > 0:
        # Convert any numerical value to integers
            try:
                data=int(data)
            except:
                pass
        # Append the data to the empty list of the i'th column
        col[i][1].append(data)
        # Increment i for the next column
        i += 1

coreUsageDictionary={title:column for (title,column) in col}

if verbose:
  print(coreUsageDictionary)

# Delete if file exists, create it and append json
filePath = os.path.join(outputDirectory, outputFile)
try:
    if os.path.isfile(filePath):
        os.unlink(filePath)
except Exception as e:
    print(e)

with open(outputDirectory + outputFile, 'w') as outfile:
    json.dump(coreUsageDictionary, outfile)
print('Created file ' + outputFile)
