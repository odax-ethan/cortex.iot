
////////////////////////////////////////////////////////////////////////////////
// tasks
////////////////////////////////////////////////////////////////////////////////
// TODO: intergrate cron
// TODO: intergate database
// TODO: breack everything up and standardize structure


//****************************************************************************\\
// Imports and settings
//****************************************************************************\\
'use strict'
// var five = require("johnny-five");
const { Boards, Relay, Thermometer } = require("johnny-five");
const {deviceBank, boardBank , systemSettings} = require('./source/config/systemConfig.js');
const {systemEmitter} = require('./source/core/utility/systemConfig.js');
// var fs = require('fs') // access file system
// var csvWriter = require('csv-write-stream') // file srteam writer for memoryUsage
// var memoryUsage = require('memory-usage') // get memoery usage package
var CronJob = require('cron').CronJob; // event schedular


//****************************************************************************\\
// for testing memory issues
//****************************************************************************\\

// uncomment bellow to get memory usage

// var sampleRate = 2000 // sample rate in milliseonds
// memoryUsage(sampleRate)
//   .pipe(csvWriter())
//   .pipe(fs.createWriteStream('./logs/memory-log.csv'))





  //****************************************************************************\\
  //   devine and lauch J5
  //****************************************************************************\\

  // create a function to exprot and use in  the main cortex file

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

               // get current boards devices
               deviceBank.forEach((node,index,arr)=>{

                switch (board.id) {
                  case node.id:
                      // assign target
                      var target = node.devices
                      // for each device check its type an define it.
                      target.forEach((device,index,arr)=>{
                        //check for curren target device and assign corrent device settings
                        switch (device.deviceTYPE) {
                          case "thermometer":
                                    // assign dynamic variable name
                                    var varname = device.deviceID
                                    //assign dynamic functions value
                                    var value = new Thermometer({controller: device.controller, pin: device.pin, freq: 3000, board: board});
                                    // combine dynamic variables
                                    this[varname] = value;
                                    //trigger actions on the dynamic variable
                                    this[varname].on("data", function() {
                                      // var {address, celsius, fahrenheit, kelvin} = thermometer;
                                      // console.log(this.celsius);

                                      //filter for anomoly
                                      switch (this.celsius) {
                                        case 185:
                                            console.error('there has been an error cause for unknown reasons but is normally and occurs generally only at start up');
                                          break;
                                        default:
                                        // if there has been no known issues pass data to systemEmitter
                                        systemEmitter.emit('newEvent', (varname ,  this.celsius ))
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

                                // asign system listener for overRide for each relay
                                // each device over ride can call via system emiter from their unique deviceID
                                // event are called as a string
                                // "overRide" option will trigger OFF (maybe toggle?)
                                systemEmitter.on( targetName, function(eventType) {
                                    switch ( eventType ) {
                                     case "overRide":
                                              target.off()
                                              systemEmitter.emit('newEvent', `${targetName} relay over riden turning it off`)
                                        break;
                                      default:
                                      console.error('something happened causing the device to call an action unnessarially');
                                    }
                                })

                                // check cron list
                                // create cronEvent + function

                                var cronList = device.cron

                                cronList.forEach((cron,index,arr)=>{

                                  // { cronID: "morning fans", deviceID: "test-relay" , cronTYPE:"burst", cronOBJ: ' */15 * * * * * ', cronEventLength: 5000, color: "rgba(65, 124, 211, .5)"},

                                  switch (cronTYPE) {
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
                                            systemEmitter.emit('newEvent', `${targetName} relay turned on`)
                                            setTimeout(function () {
                                              target.off()
                                              systemEmitter.emit('newEvent', `${targetName} relay turned off`)
                                            }, masterCronEventLength);
                                          });

                                          this[cronName].start();
                                      break;
                                    default:

                                  }


                                })

                                          // // how long is the event
                                          // let masterCronEventLength = 5000
                                          // // cron event definition
                                          // let masterCronEventTime = ' */10 * * * * * '
                                          // // CRON TOOLING
                                          //
                                          // // console.log(targetName);
                                          // let cronName = `cron-${varname}`;
                                          // // console.log(cronName);
                                          // this[cronName] = new CronJob(masterCronEventTime, function(cronID) {
                                          //   // AT START RUN TOGGLE // RUN ON
                                          //   target.on()
                                          //   systemEmitter.emit('newEvent', `${targetName} relay turned on`)
                                          //   setTimeout(function () {
                                          //     target.off()
                                          //     systemEmitter.emit('newEvent', `${targetName} relay turned off`)
                                          //   }, masterCronEventLength);
                                          // });
                                          //
                                          // this[cronName].start();


                              break; // end of relay
                          default:
                          // should only fire if device type has not been define
                          // but has been included in the systemConfig
                          return  console.log('case not found');
                        }
                      })
                    break;
                  default:

                }


            }); // end of each board

      });

    });
