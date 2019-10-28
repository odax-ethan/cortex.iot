const timerTESTrate = 60000

exports.systemConfig = {
    opperationName : "GROW338",
    timerTESTrate: timerTESTrate,
    admin:"Karl",
    nodes: [
    {  id: "testboard",
       port: "COM3"
    }
     // {  id: "tent2",
     //    port: "COM4"
     //  }
      // {  id: "room",
      //    portName: "COM5",
      //    nodeName: "room"
      //  },
     ], // list of node for generation
    devices: [
       { deviceID: "sensor2", deviceTYPE:"thermometer", devicePIN: 7, deviceNODE:"tent1", controller: "DS18B20", freq: timerTESTrate},
       { deviceID: "sensor3", deviceTYPE:"thermometer", devicePIN: 8, deviceNODE:"tent1", controller: "DS18B20", freq: timerTESTrate},
       { deviceID: "sensor4", deviceTYPE:"thermometer", devicePIN: 7, deviceNODE:"tent2", controller: "DS18B20", freq: timerTESTrate},
       { deviceID: "sensor5", deviceTYPE:"thermometer", devicePIN: 8, deviceNODE:"tent2", controller: "DS18B20", freq: timerTESTrate}//,
      // { deviceID: "sensor2", deviceTYPE:"thermometer", devicePIN: 7, deviceNODE:"room", controller: "DS18B20", freq: timerTESTrate},
       // { deviceID: "sensor2", deviceTYPE:"thermometer", devicePIN: 8, deviceNODE:"room", controller: "DS18B20", freq: timerTESTrate}
    ],
    timers: [
    ] // list of all devices in the system
} //end of entire object
