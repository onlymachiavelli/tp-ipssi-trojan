# import os 



# def getNetworkIpWindows():
#     data = os.popen("ipconfig").read()

#     #split and get the line with IPv4
#     data = data.split("\n")
#     for line in data:        
#         if "IPv4" in line:
#             data = line.split(":")[1].strip()
    

    
#     return data


# def getMacAddressWindows():
#     data = os.popen("getmac").read()
    
#     #split and get the line with the mac address
#     data = data.split("\n")
    

      
    
#     for line in data:        
#         if "Media disconnected" not in line and "Physical Address" not in line and "===" not in line and line.strip() != "":
#             data = line.split()[0].strip()
#             break
            
#     return data.








# if __name__ == "__main__":

    
#     print("IP Address:")
#     print(getNetworkIpWindows())
#     print("MAC Address:")
#     print(getMacAddressWindows())