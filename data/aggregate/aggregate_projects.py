import os, sys, getopt, json, datetime

# Aggregates data fetched with get_projects_usage_by_type.py

#-------------------------------------------------------------------
# Constants and initialization
#-------------------------------------------------------------------

fullCmdArguments = sys.argv
argumentList = fullCmdArguments[1:]
unixOptions = "hp:t:v"
gnuOptions = ["help", "project_type=", "truncate=","verbose"]

# Arguments
verbose = False
project_type = ''
valid_types = ['module', 'theme', 'distribution']
# Maximum values to aggregate (can be overridden with argument)
truncate = 100

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
        print ("Example: python3 %s --project_type=module --truncate=20 --verbose" % (sys.argv[0]))
        # @todo exit
    elif currentArgument in ("-p", "--project_type"):
        # @todo throw error if empty
        project_type = currentValue
        print (("Setting the project type to '%s'") % (currentValue))
    elif currentArgument in ("-t", "--truncate"):
        # @todo throw error if empty
        truncate = int(currentValue)
        print (("Truncating results to '%s'") % (currentValue))    

if project_type in valid_types:
    sourceDirectory = '../output/raw/projects/' + project_type
    outputDirectory= '../output/aggregate'
    jsonFileName = 'projects_'+ project_type +'.json'
    totalPages = 0
    totalProjects = 0

    projectsOutput = []

    #-------------------------------------------------------------------
    # Aggregate values
    #-------------------------------------------------------------------

    # Read all pages (files) and aggregate values
    for file in os.listdir(sourceDirectory):
        filePath = os.path.join(sourceDirectory, file)
        print('Reading file ' + file)
        try:
            if os.path.isfile(filePath):
                with open(filePath) as jsonFile:
                    data = json.load(jsonFile)
                    totalPages += 1
                    for project in data['list']:
                        projectOutput = {}
                        projectOutput['title'] = project['title']
                        projectAllVersions = 0
                        for version in project['project_usage']:
                            projectOutput[version] = project['project_usage'][version]
                            projectAllVersions += int(project['project_usage'][version])
                        projectOutput['total'] = projectAllVersions
                        # Exclude non 8.x
                        # @todo this can be used to identify 7.x to core modules or not ported yet
                        # if '8.x' in projectOutput:
                        projectsOutput.append(projectOutput)
                        totalProjects += 1
        except Exception as e:
            print(e)

    # Sort desc by 8.x versions usage
    projectsOutput = sorted(projectsOutput, key = lambda i: i['total'], reverse = True)
    #projectsOutput = sorted(projectsOutput, key = lambda i: i['8.x'], reverse = True)

    # Truncate to first 100 projects
    projectsOutput = projectsOutput[0 : truncate - 1]
    # Reverse for display
    projectsOutput.reverse()

    # Print results
    print('Total pages: ' + str(totalPages))
    print('Total projects: ' + str(totalProjects))

    # dumps (plural) converts lists
    jsonOutput = json.dumps(projectsOutput)

    if verbose:
        print(jsonOutput)
    
    with open(outputDirectory + '/' + jsonFileName, 'w') as outfile:
        outfile.write(jsonOutput)
        outfile.close()
    print('Aggregate projects json file created.')

else:
    print('Not a valid project type. Valid values: ')
    print(valid_types)