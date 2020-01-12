import os, sys, getopt, urllib.request, urllib.parse, json, requests, lxml.html as lh

#-------------------------------------------------------------------
# Constants and initialization
#-------------------------------------------------------------------

# Limit by default to 100 pages (5000 most downloaded projects).
currentPage = 0
# @todo get last page from the first call.
# @todo overrid with cli argument.
lastPage = 99

fullCmdArguments = sys.argv
argumentList = fullCmdArguments[1:]
unixOptions = "hp:v"
gnuOptions = ["help", "project_type=", "verbose"]

# Arguments
verbose = False
project_type = ''
valid_types = ['module', 'theme', 'distribution']

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
        print ("Example: python3 %s --project_type=module --verbose" % (sys.argv[0]))
        # @todo exit
    elif currentArgument in ("-p", "--project_type"):
        # @todo throw error if empty
        project_type = currentValue
        print (("Setting the project type to '%s'") % (currentValue))

endpoint = 'https://www.drupal.org/api-d7/node.json?type=project_'+ project_type +'&field_project_type=full&status=1&sort=field_download_count&direction=DESC'
outputDirectory = '../output/raw/projects/'+ project_type

# Create the directory to store json files if it does not exist
os.makedirs(outputDirectory, exist_ok=True)

if project_type in valid_types:

    #-------------------------------------------------------------------
    # Delete files
    #-------------------------------------------------------------------

    for file in os.listdir(outputDirectory):
        filePath = os.path.join(outputDirectory, file)
        try:
            if os.path.isfile(filePath):
                os.unlink(filePath)
        except Exception as e:
            print(e)

    #-------------------------------------------------------------------
    # Get all pages
    #-------------------------------------------------------------------

    while currentPage <= lastPage:
        # Get the json.
        with urllib.request.urlopen(endpoint + '&page=' + str(currentPage)) as url:
            jsonContent = json.loads(url.read().decode())
        # Create the file and append json.
        fileName = project_type + '_projects_usage_' + str(currentPage) + '.json'
        with open(outputDirectory + '/' + fileName, 'w') as outfile:
            json.dump(jsonContent, outfile)
        print('Created file ' + fileName)
        currentPage += 1

else:
    print('Not a valid project type. Valid values: ')
    print(valid_types)
