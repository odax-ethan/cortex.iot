
exports.systemConfigTemplate = {
    _id : "systemConfig",
    opperationName : "GROW338",
    timerTESTrate: 9000,
    admin:"Karl",
    coordinates : {
      lat: 45,
      long:23
    },
    settings : {
      firstLoad: false ,
      tutorial: false,
      passWord: false
    },
    nodes: [
      {
       id: "veg_tent",
       port: "/dev/ttyACM0"
      },
      {
       id: "room",
       port: "/dev/ttyACM1"
      },
      {
       id: "flowerTent",
       port: "/dev/ttyACM2"
      }
     ],
    devices: [
       { deviceID: "Bottom-Sensor", deviceTYPE:"thermometer", devicePIN: 8, deviceNODE:"veg_tent", controller: "DS18B20", color: "rgba(65, 124, 211, .5)"},
       { deviceID: "Top-Sensor", deviceTYPE:"thermometer", devicePIN: 7, deviceNODE:"veg_tent", controller: "DS18B20", color: "rgba(188, 231, 132, .5)"},

       { deviceID: "window", deviceTYPE:"thermometer", devicePIN: 7, deviceNODE:"room", controller: "DS18B20", color: "rgba(147, 29, 86, .5)"},
       { deviceID: "center_room", deviceTYPE:"thermometer", devicePIN: 8, deviceNODE:"room", controller: "DS18B20", color: "rgba(221, 211, 73, .5)"},

       { deviceID: "Bottom_Sensor", deviceTYPE:"thermometer", devicePIN: 7, deviceNODE:"flowerTent", controller: "DS18B20", color: "rgba(74, 64, 153, .5)"},
       { deviceID: "Top_Sensor", deviceTYPE:"thermometer", devicePIN: 8, deviceNODE:"flowerTent", controller: "DS18B20",color: "rgba(13, 6, 48, .5)"},
    ],
    timers: [
    ] // list of all devices in the system
} //end of entire object
