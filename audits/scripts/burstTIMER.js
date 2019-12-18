var isSameMinute = require('date-fns/is_same_minute');
var isSameHour = require('date-fns/is_same_hour');
var differenceInHours = require('date-fns/difference_in_hours');

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

setInterval( function(){
  //light timers
   if ( burstTIMER(14,0, 1, 3) === 1) {
     console.log("turn light on");
   }else if (burstTIMER(14,0, 1, 3)  === 0) {
     console.log("turn lights off");
   } else {
  console.error("problem");
   }
}
,500)
