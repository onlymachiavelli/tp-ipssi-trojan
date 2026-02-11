import os 


def getIpFromWindows():

    output = os.popen("getmac").read()
    for line in output.splitlines():
        if "IPv4 Address" in line:
            return line.split(":")[1].strip()
    return None


def getMacFromWindows():

    output = os.popen("getmac").read()
    for line in output.splitlines():
        if "Physical Address" in line:
            return line
    return None


def getNetworkStiff() : 
    output = os.popen("getmac").read()
    return output

if __name__ == "__main__":

    data  = getNetworkStiff()
    print(data)