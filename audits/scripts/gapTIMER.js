var isSameMinute = require('date-fns/is_same_minute');
var isSameHour = require('date-fns/is_same_hour');
var differenceInHours = require('date-fns/difference_in_hours');

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
            }else if ( isSameHour(startDATE,currentDATE) === true  && startDATE.getMinutes() < currentDATE.getMinutes()  ) {
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


    var starth = 14, startm = 50,
        stoph = 14, stopm = 50;

  if (isSameHour(new Date,new Date)) {
    console.log("hi");
  }

timerEVENT(starth,startm,stoph,stopm);
