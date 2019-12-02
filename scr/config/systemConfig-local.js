
exports.systemConfigTemplate = {
    _id : "systemConfig",
    opperationName : "GROW338",
    timerTESTrate: 3000,
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
       id: "testboard",
       port: "COM3"
      }
     ],
    devices: [
       { deviceID: "sensor2", deviceTYPE:"thermometer", devicePIN: 6, deviceNODE:"testboard", controller: "DS18B20", color: "rgb(240, 143, 14, .6)"},
       { deviceID: "Light", deviceTYPE:"relay", devicePIN: 11, deviceNODE:"testboard", relayType: "NO", deviceCONTROLS: "light", color: "rgb(14, 240, 138)",   timers: [ { type: "cron", crontOBJ: "5 * * * * *", style: "timeOut" }]},
       // { deviceID: "Heater", deviceTYPE:"relay", devicePIN: 4, deviceNODE:"testboard", relayType: "NO", deviceCONTROLS: "heater", color: "rgb(14, 159, 240)" , timers: [ { type: "cron", crontOBJ: "0 */30 9-17 * * *"}]},
       // { deviceID: "Pump", deviceTYPE:"relay", devicePIN: 9, deviceNODE:"testboard", relayType: "NO", deviceCONTROLS: "pump", color: "rgb(168, 14, 240)"},
       //  { deviceID: "Fan", deviceTYPE:"relay", devicePIN: 11, deviceNODE:"testboard", relayType: "NO", deviceCONTROLS: "fan", color: "rgb(240, 14, 210)"},
       //  { deviceID: "C02", deviceTYPE:"relay", devicePIN: 12, deviceNODE:"testboard", relayType: "NO", deviceCONTROLS: "gas", color: "rgb(240, 68, 14)"}
    ],
} //end of entire object
