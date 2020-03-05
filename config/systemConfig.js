

////////////////////////////////////////////////////////////////////////////////
// boards
////////////////////////////////////////////////////////////////////////////////

// define all boards in the system

// name your board with id
// no duplicate names - it will start but will not return correct values
// for one of the boards

// Define port based on your OS's style
// LINUX:
// OXS:
// WINDOWS: COM**  [example: COM2, COM54 ]

// example
// [
//  {id: "testboard",
//  port: "****"},
//  {id: "testboard1",
//  port: "****"},
//  {id: "testboard2",
//  port: "****"}
//  ]

const boards = [
        {
        id: "testboard",
        port: "COM3",
        color: "rgba(65, 124, 211, .5)"
        }
      ]


////////////////////////////////////////////////////////////////////////////////
// device
////////////////////////////////////////////////////////////////////////////////

// starter template:
// edit this for quick deployment of a predefined system.

// edit this with caution.
// guide to this is in systemConfigREADME.md

// device types pre-installed in this version
// deviceTYPE:"thermometer"
// deviceTYPE:"relay"


const devices = [
             // { deviceID: "Bottom-Sensor", deviceTYPE:"thermometer", devicePIN: 6, deviceBOARDS:"testboard", controller: "DS18B20", color: "rgba(65, 124, 211, .5)"},
             { deviceID: "Light", deviceTYPE:"relay", devicePIN: 13, deviceBOARDS:"testboard", relayType: "NO", deviceCONTROLS: "light", color: "rgb(14, 240, 138)", cron: []}
      ];


////////////////////////////////////////////////////////////////////////////////
// event schedular
////////////////////////////////////////////////////////////////////////////////

// scheduling format is in CRON
// each event has 5 parts

// // an name to help you track what trigger the event
// let cronID = 'morning fans'
// // which device to assign cron to
//  deviceID: "test-relay",
// //options:
// // burts (timer with a cron define start - and count down to turn off)
// let cronTYPE = 'burst'
// // how long is the event in milliseonds
// let cronEventLength = 5000
// // cron event definition
// let cronOBJ = ' */10 * * * * * '
// color
// color: "rgba(65, 124, 211, .5)"

const crons = [
         // { cronID: "morning_fans",  deviceBOARDS:"testboard", deviceID: "Light" , cronTYPE:"burst", cronOBJ: ' */15 * * * * * ', cronEventLength: 5000, color: "rgba(65, 124, 211, .5)"},
          { cronID: "morning_fans",  deviceBOARDS:"testboard", deviceID: "Light" , cronTYPE:"burst", cronOBJ: ' 32 * * * * * ', cronEventLength: 5000, color: "rgba(65, 124, 211, .5)"},
  ];



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// warning: changes bellow could break software,
// understanding what you are doing, before changing anything.
////////////////////////////////////////////////////////////////////////////////
// don't do it if you don't understand it.
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////

// server socket definitions

const blindHostIP = '0.0.0.0'; // express needs a blank ip to dynamically define itself
const cortexPort = 9090; // define system port


////////////////////////////////////////////////////////////////////////////////
  // see docs for systemPreSetting shape
 const {systemSettings} = require('./systemSettings.js');

 var boardBank = [] //empty boardBank array used to define Johnny-five,js
 var hardwareBank = [] //empty hardwareBank array used to define entire system

  // parse boards create board bank for J5.js
  boards.forEach((board,index,arr)=>{
      //create working board object for each board for j5.js
      boardBank.push({id:board.id, port: board.port })
      //create deveivce bank with board containing devices in an array
      hardwareBank.push({id:board.id, devices:[], color: board.color})

  })

  // parse boards create board bank for J5.js
  hardwareBank.forEach((board,index,arr)=>{

      boardDevices = board.devices

      // for each device in devices
      // where boardID = deviceID put into devices []
      // for each device if check if there is cron whith the same deviceID
      // if they are the same put into devices cron list

      //
      devices.forEach((device,index) => {

        deviceCron = device.cron

        switch (device.deviceBOARDS) {
          case board.id:
              //if doard.id is the same put this device into the target board


                  crons.forEach((cron,index) => {
                      // console.log(device.deviceID);
                      switch (cron.deviceID) {
                        case device.deviceID:
                            //if doard.id is the same put this cron into the target board

                            deviceCron.push(cron)
                          break;
                        default:
                          //do nothings
                      };
                    });

                    boardDevices.push(device)
            break;
          default:
          //do nothings
        }

      })

      console.log(board.devices);

  }) //end of hardwareBank construction




module.exports = {hardwareBank, boardBank, systemSettings};
