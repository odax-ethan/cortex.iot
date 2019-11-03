
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

    ],
    timers: [
    ] // list of all devices in the system
} //end of entire object
