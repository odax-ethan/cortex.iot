//****************************************************************************\\
// Imports and settings
//****************************************************************************\\
// 'use strict' // strick mode breaks using dynamics variables in a function
const { Boards, Relay, Thermometer } = require("johnny-five");
const {hardwareBank, boardBank , systemSettings} = require('../../config/systemConfig.js');
var CronJob = require('cron').CronJob; // event schedular
//get local time: timeTime(systemSettings.utcOffSet)
const {localTime} = require('../utility/utility.js');
// system Emitter
const {systemEmitter} = require('./cortex.emitter');

//****************************************************************************\\
// for testing memory issues
//****************************************************************************\\
// uncomment bellow to get memory usage

// var fs = require('fs') // access file system
// var csvWriter = require('csv-write-stream') // file srteam writer for memoryUsage
// var memoryUsage = require('memory-usage') // get memoery usage package

// var sampleRate = 2000 // sample rate in milliseonds
// memoryUsage(sampleRate)
//   .pipe(csvWriter())
//   .pipe(fs.createWriteStream('./logs/memory-log.csv'))

//****************************************************************************\\
//   devine and lauch J5
//****************************************************************************\\


  exports.startCortexHardware = function () {

        // const { Board, Thermometer, five } = require("johnny-five");
        // console.log(boardBank);
        var boards = new Boards(boardBank);

        // Create all board instances with IDs
        boards.on("ready", () => {

              // all boards are initialized
              // (connected and available for communication)
              // you can call to an sensor directly but it has to befully defined
              // i.e. you have to define the board

              // |this| is an array-like object containing references
              // to each initialized board.
              boards.each(board => {
                 // console.log(hardwareBank);
                 // get current boards devices
                 hardwareBank.forEach((targetBoard,index,arr)=>{



                  switch (board.id) {
                    case targetBoard.id:
                        // assign target
                        var target = targetBoard.devices
                        // for each device check its type an define it.
                        target.forEach((device,index,arr)=>{

                          //check for curren target device and assign corrent device settings
                          switch (device.deviceTYPE) {
                            case "thermometer":
                                      console.log(device.freq);
                                      // assign dynamic variable name
                                      var varname = device.deviceID
                                      //define the shape of the device
                                      var shape = {controller: device.controller, pin: device.devicePIN, board: board, freq: device.freq};
                                      // console.log(shape);
                                      //assign dynamic functions value
                                      var value = new Thermometer(shape);

                                      // combine dynamic variables
                                      this[varname] = value;
                                      //trigger actions on the dynamic variable
                                      this[varname].on("data", function() {
                                          // var {address, celsius, fahrenheit, kelvin} = thermometer;
                                          // console.log(this.celsius);

                                          //filter for anomoly
                                          switch (this.celsius) {
                                            case 185:
                                                // console.error('there has been an error cause for unknown reasons but is normal and occurs generally only at start up');
                                                systemEmitter.emit('newEvent',  device.deviceID , '185', localTime(systemSettings.utcOffSet), 'known-partial-error', `error cause for unknown reasons but is normal and occurs generally only at start up`)
                                              break;
                                            default:
                                            // if there has been no known issues pass data to systemEmitter
                                            systemEmitter.emit('newEvent',  device.deviceID , this.celsius , localTime(systemSettings.utcOffSet), 'normal', `sensor reading for ${device.deviceID} sensor`)
                                            // console.log(thermometer)
                                          }

                                    })
                                break; // end of thermometer
                              case "relay":
                                  //configure relays
                                  var varname = device.deviceID
                                  //assign dynamic functions value
                                  var value = new Relay({pin: device.devicePIN, type: device.relayType, board: board});
                                  // combine dynamic variables
                                  this[varname] = value;
                                  //trigger actions on the dynamic variable

                                  // create a target variable for said this[varnam]
                                  let target = this[varname];

                                  // get cronList
                                  var cronList = device.cron
                                  var cronListLength = cronList.length

                                  if (cronListLength > 1) {
                                    // console.log(cronList);
                                    // for each cron in said device
                                    cronList.forEach((cron,index,arr)=>{

                                      // { cronID: "morning fans", deviceID: "test-relay" , cronTYPE:"burst", cronOBJ: ' */15 * * * * * ', cronEventLength: 5000, color: "rgba(65, 124, 211, .5)"},

                                      switch (cron.cronTYPE) {
                                        case "burst":
                                              // how long is the event
                                              let masterCronEventLength = cron.cronEventLength
                                              // cron event definition
                                              let masterCronEventTime = cron.cronOBJ
                                              // CRON TOOLING

                                              // console.log(targetName);
                                              let cronName = `cron-${cron.deviceID}`;
                                              // console.log(cronName);
                                              this[cronName] = new CronJob(masterCronEventTime, function() {
                                                // AT START RUN TOGGLE // RUN ON
                                                target.on()
                                                systemEmitter.emit('newEvent',  cron.deviceID , 'ON', localTime(systemSettings.utcOffSet), 'normal', `event trigger by cron ${cron.cronID}`)
                                                // console.log('burst: turned on');
                                                setTimeout(function () {
                                                  target.off()
                                                  systemEmitter.emit('newEvent',  cron.deviceID , 'OFF', localTime(systemSettings.utcOffSet), 'normal', `event trigger by cron ${cron.cronID}`)
                                                }, masterCronEventLength);
                                              });

                                              this[cronName].start();
                                          break;
                                        default:

                                      }


                                    })
                                  }
                                  //else do nothing
                                break; // end of relay
                            default:
                            // should only fire if device type has not been define
                            // but has been included in the systemConfig
                            return  console.log('case not found');
                          }
                        })
                      break;
                    default:
                      // do nothing
                  }


              }); // end of each board

        });

        });// end of boards on.


  };
