import os, urllib.request, urllib.parse, json, requests, lxml.html as lh

#-------------------------------------------------------------------
# Constants and initialization
#-------------------------------------------------------------------
drupalUserEndpoint = 'https://www.drupal.org/api-d7/user.json'
drupalCoresUrl = 'http://drupalcores.com/index.html'
outputDirectory = '../output/raw/core_user/'
# Create the outputDirectory to store json files if it does not exist
os.makedirs(outputDirectory, exist_ok=True)

# Optionally restart at a page number
# Can be used to restart at a page number 
# - in case of a network error
# - for incremental updates
startPage = 1
# Used to keep track of the pages per user
currentPage = 1
maxPages = 10000

#-------------------------------------------------------------------
# Get all core user names from http://drupalcores.com/
#-------------------------------------------------------------------

# Get page
page = requests.get(drupalCoresUrl)
# Parse data between <tr></tr>
doc = lh.fromstring(page.content)
tr_elements = doc.xpath('//tr')

# Parse the first row as the header
tr_elements = doc.xpath('//tr')
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

coreContributorsDictionary={title:column for (title,column) in col}
coreContributorsUserNames=coreContributorsDictionary['Drupal.org Username']
print(coreContributorsUserNames)

#-------------------------------------------------------------------
# Delete files before importing them.
#-------------------------------------------------------------------

# @todo add option to only get users that do not have a file
# so incremental updates will be possible

# for file in os.listdir(outputDirectory):
#    filePath = os.path.join(outputDirectory, file)
#    try:
#        if os.path.isfile(filePath):
#            os.unlink(filePath)
#    except Exception as e:
#        print(e)

#-------------------------------------------------------------------
# Get json pages
#-------------------------------------------------------------------

# Iterate core contributor user names to get their json pages
# via the Drupal.org api
for userName in coreContributorsUserNames:
    if currentPage<=maxPages:
        print(userName)
        if currentPage >= startPage:
            urlEncodedUserName=urllib.parse.quote(str(userName))
            # Get the json for this user
            with urllib.request.urlopen(drupalUserEndpoint + '?name=' + str(urlEncodedUserName)) as url:
                jsonContent = json.loads(url.read().decode())

            # Create the file and append json.
            fileName = 'user_'+str(currentPage)+'.json'
            with open(outputDirectory + fileName, 'w') as outfile:
                json.dump(jsonContent, outfile)
            print('Created file ' + fileName)
        currentPage += 1
    else:
      break
