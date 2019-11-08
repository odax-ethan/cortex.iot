var five = require("johnny-five");
var isSameMinute = require('date-fns/is_same_minute');
var isSameHour = require('date-fns/is_same_hour');
var differenceInHours = require('date-fns/difference_in_hours');

var ports = [
  { id: "A", port: "COM3"}
];

///////////////////////////////////////////////////////////////////////////////
function oNoFFtimer(startH,startM,stopH,stopM) {

var stopDATE = new Date,
    startDATE = new Date
    currentDATE = new Date;
//
  // TODO:  conditional variable assignemnet test if hourstart > hourStop
  //  var name = person ? person.name : "stranger";

    if (startH <= stopH) {
          startDATE.setHours(startH - 4,startM);
          // startDATE.setMinutes(startM);
          console.log(startDATE);

          stopDATE.setHours(stopH - 4 ,stopM);
          // stopDATE.setMinutes(stopM);
          console.log(stopDATE);

          if (isSameMinute(startDATE,currentDATE) === true && isSameHour(startDATE,currentDATE) === true) {
              // console.log("they are the same minute and hour -> emit event");
              return 1
            }else if (startDATE.getHours() < currentDATE.getHours()  && stopDATE.getHours() > currentDATE.getHours() ) {
              // if current hours are between end date start hour and end hour then system should be on
              // console.log("system should be on");
              return 1
            }else if ( isSameHour(startDATE,currentDATE) === true && startDATE.getMinutes() < currentDATE.getMinutes()  ) {
              // if the hour is the same but the minute is equal to or greater then the start minute the system should be running.
              console.log("system should be on");
              return 1
            }else if ( isSameMinute(stopDATE,currentDATE) === true && isSameHour(stopDATE,currentDATE) === true) {
              // if
              // console.log("system should be off");
              return 0
            }else {
              // console.log("system should be off");
              return 0
          };

    } else  {
      startDATE.setHours(startH - 4,startM);
      // startDATE.setMinutes(startM);
      console.log(startDATE);

      stopDATE.setHours(stopH - 4 ,stopM);
      // stopDATE.setMinutes(stopM);
      console.log(stopDATE);

      if (isSameMinute(startDATE,currentDATE) === true && isSameHour(startDATE,currentDATE) === true) {
          // console.log("they are the same minute and hour -> emit event");
          return 1
        }else if ( isSameHour(startDATE,currentDATE) === true && startDATE.getMinutes() < currentDATE.getMinutes()  ) {
          // if the hour is the same but the minute is equal to or greater then the start minute the system should be running.
          // console.log("system should be on");
          return 1
        }else if (startDATE.getHours() <= 23 || stopDATE.getHours() > currentDATE.getHours() ) {
          // if current date is between the startDate and 23 (midnight) or between midnight and the stopDate ie. is the current hour less than the stopDAte
          console.log("system should be on");
          return 1
        }else if (startDATE.getHours() < currentDATE.getHours()  && stopDATE.getHours() > currentDATE.getHours() ) {
          // if current hours are between end date start hour and end hour then system should be off
          // console.log("system should be off");
          return 0
        }else if ( isSameMinute(stopDATE,currentDATE) === true && isSameHour(stopDATE,currentDATE) === true) {
          // if
          // console.log("system should be off");
          return 0
        }else {
          // console.log("system should be off");
          return 0
        };
    }

}
//////////////////////////////////////////////////////////////////////////////
function burstTIMER(startH,startM, timerH, timerM) {

  var stopDATE = new Date,
      startDATE = new Date,
      currentDATE = new Date;

// TODO: local time offset from timezone variable chart
 var setDATE = currentDATE.getHours() - 4;

 currentDATE.setHours(setDATE);
 // console.log(currentDATE);

  startDATE.setHours(startH - 4,startM);
  // startDATE.setMinutes(startM);
  // console.log(startDATE);
  // console.log(startDATE);

  stopDATE.setHours(startH + timerH  - 4 , startM + timerM);
// console.log(stopDATE);
  // console.log(stopDATE);

  if (isSameMinute(startDATE,currentDATE) === true && isSameHour(startDATE,currentDATE) === true) {
      // console.log("they are the same minute and hour -> emit event");
      // console.log("first");
      return 1
    } else if ( isSameHour(startDATE,stopDATE) === true && startDATE.getMinutes() < currentDATE.getMinutes()  <  stopDATE.getMinutes() ) {
      // console.log("second");
      return 1
    }else if( stopDATE.getHours() >= currentDATE.getHours() && currentDATE.getHours() > startDATE.getHours() ) {
      // console.log("system should be on");
      return 1
    } else if ( isSameMinute(stopDATE,currentDATE) === true && isSameHour(stopDATE,currentDATE) === true) {
        console.log("third");
      return 0
    }else {
      console.log("hi");
      return 0
    }

}
///////////////////////////////////////////////////////////////////////////////
function burstTimerEVENT(burststartH,burststartM,bursttimerH,bursttimerM,relayName) {
  //light timers
   if ( burstTIMER(burststartH,burststartM, bursttimerH, bursttimerM) === 1) {
     console.log("turn light on");
     relayName.on()
     return
   }else if (burstTIMER(burststartH,burststartM, bursttimerH, bursttimerM)  === 0) {
     console.log("turn lights off");
     relayName.off()
     return
   } else {
    console.error("problem with fan time 1");
    return
   }
}
//////////////////////////////////////////////////////////////////////////////////
function timerEVENT(timerONh1,timerONm1,timerOFFh1,timerOFFm1) {
  //light timers
   if (oNoFFtimer(timerONh1,timerONm1,timerOFFh1,timerOFFm1) === 1) {
     console.log("turn light on");
   }else if (oNoFFtimer(timerONh1,timerONm1,timerOFFh1,timerOFFm1) === 0) {
     console.log("turn lights off");
   } else {
     console.error("prblem with light");
   }
}
