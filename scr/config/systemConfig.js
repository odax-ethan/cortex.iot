
exports.systemConfigTemplate = {
    _id : "systemConfig",
    opperationName : "Your New Opperation",
    timerTESTrate: 9000000,
    admin:"Your Name",
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
       id: "testboard",
       port: "COM3"
      }
     ],
    devices: [
       { deviceID: "sensor2", deviceTYPE:"thermometer", devicePIN: 6, deviceNODE:"testboard", controller: "DS18B20", freq: 3000},
       { deviceID: "Light", deviceTYPE:"relay", devicePIN: 11, deviceNODE:"testboard", relayType: "NO", deviceCONTROLS: "light"},
       { deviceID: "Heater", deviceTYPE:"relay", devicePIN: 4, deviceNODE:"testboard", relayType: "NO", deviceCONTROLS: "heater"}
       // { deviceID: "Pump", deviceTYPE:"relay", devicePIN: 9, deviceNODE:"testboard", relayType: "NO", deviceCONTROLS: "pump"},
       //  { deviceID: "Fan", deviceTYPE:"relay", devicePIN: 11, deviceNODE:"testboard", relayType: "NO", deviceCONTROLS: "fan"},
       //  { deviceID: "C02", deviceTYPE:"relay", devicePIN: 12, deviceNODE:"testboard", relayType: "NO", deviceCONTROLS: "gas"}
    ],
    timers: [
    ] // list of all devices in the system
} //end of entire object
