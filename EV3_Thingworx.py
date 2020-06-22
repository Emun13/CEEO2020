# from ev3dev.ev3 import *
# import ev3dev.ev3 as ev3 # package for EV3 Commands
import sys
import linecache
import requests,json # packages for Thingworx POST & GET
from time import sleep
from multiprocessing import Process,Array,Value
import time,termios,tty
from timeit import Timer

################## THINGWORX UPLOAD INFO ##############################

# new Thingworx
url = "https://pp-1909111719d4.portal.ptc.io/Thingworx/Things/RealityEngine/Properties/LEGO_EV3"
headers = {
        'AppKey': "7f9c8b30-9ae0-43b8-89f1-d796ca1a757c",
        'Accept': "application/json",
        'Content-Type': "application/json"
        }

def thingworxGET():
  return requests.get(url,headers=headers)

def thingworxPUT(propValue):
  return requests.put(url,headers=headers,json=propValue)


temp = {'LEGO_EV3':"Its working!!"}
thingworxPUT(temp)

temp_get = thingworxGET()
data_temp = temp_get.json()
print(data_temp)


