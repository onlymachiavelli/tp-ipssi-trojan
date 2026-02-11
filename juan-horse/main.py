import os
import re


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
    
    print(computerHostData())
