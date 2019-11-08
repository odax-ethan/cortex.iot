var isSameMinute = require('date-fns/is_same_minute');
var isSameHour = require('date-fns/is_same_hour');
var differenceInHours = require('date-fns/difference_in_hours');

var timerSTATE = 0

var minSTOP = 19 + 1
var minSTART = 9 +1
var hourSTART = 3 +1
var hourSTOP = 11 +1

var normalizedDATE1 = new Date()
var normalizedDATE2 = new Date()
var currentDATE = new Date()
var stopDATE
var startDATE

function normalize1(){
normalizedDATE1.setFullYear(0,0,0)
normalizedDATE1.setMinutes(0)
normalizedDATE1.setHours(0)
normalizedDATE1.setMilliseconds(0)
normalizedDATE1.setSeconds(0)
startDATE = normalizedDATE1
}

normalize1()

function normalize2(){
normalizedDATE2.setFullYear(0,0,0)
normalizedDATE2.setMinutes(0)
normalizedDATE2.setHours(0)
normalizedDATE2.setMilliseconds(0)
stopDATE = normalizedDATE2
}

normalize2()

function setSTOP(){
stopDATE.setMinutes(minSTOP)
stopDATE.setHours(hourSTOP)
}

 setSTOP()

function setSTART(){
startDATE.setMinutes(minSTART)
startDATE.setHours(hourSTART)
}

setSTART()

//
// console.log( startDATE.getMinutes() < currentDATE.getMinutes());
// console.log(isSameHour(startDATE,currentDATE) === true);
/*
document.getElementById("demo").innerHTML = startDATE

document.getElementById("demo1").innerHTML = startDATE.getHours() + ":"+ startDATE.getMinutes() */

//
// var result = isSameMinute(startDATE,currentDATE)
// function timerNORMAL() {
//   // test where stop time > start time
//   if (isSameMinute(startDATE,currentDATE) === true && isSameHour(startDATE,currentDATE) === true) {
//     console.log("they are the same minute and hour -> emit event");
//   }else if (startDATE.getHours() < currentDATE.getHours()  && stopDATE.getHours() > currentDATE.getHours() ) {
//     // if current hours are between end date start hour and end hour then system should be on
//     console.log("system should be on");
//     timerSTATE = 1;
//   }else if ( isSameHour(startDATE,currentDATE) === true && startDATE.getMinutes() < currentDATE.getMinutes()  ) {
//     // if the hour is the same but the minute is equal to or greater then the start minute the system should be running.
//     console.log("system should be on");
//     timerSTATE = 1;
//   }else if ( isSameMinute(stopDATE,currentDATE) === true && isSameHour(stopDATE,currentDATE) === true) {
//     // if
//     console.log("system should be off");
//   }else {
//     console.log("system should be off");
//   }
// }


console.log(result);

var isSameMinute = require('date-fns/is_same_minute');
var isSameHour = require('date-fns/is_same_hour');
var differenceInHours = require('date-fns/difference_in_hours');



var minSTOP = 19 + 1
var minSTART = 9 +1
var hourSTART = 3 +1
var hourSTOP = 11 +1

var normalizedDATE1 = new Date()
var normalizedDATE2 = new Date()
var currentDATE = new Date()
var stopDATE
var startDATE

function normalize1(){
normalizedDATE1.setFullYear(0,0,0)
normalizedDATE1.setMinutes(0)
normalizedDATE1.setHours(0)
normalizedDATE1.setMilliseconds(0)
normalizedDATE1.setSeconds(0)
startDATE = normalizedDATE1
}

normalize1()

function normalize2(){
normalizedDATE2.setFullYear(0,0,0)
normalizedDATE2.setMinutes(0)
normalizedDATE2.setHours(0)
normalizedDATE2.setMilliseconds(0)
stopDATE = normalizedDATE2
}

normalize2()

function setSTOP(){
stopDATE.setMinutes(minSTOP)
stopDATE.setHours(hourSTOP)
}

 setSTOP()

function setSTART(){
startDATE.setMinutes(minSTART)
startDATE.setHours(hourSTART)
}

setSTART()

//
// console.log( startDATE.getMinutes() < currentDATE.getMinutes());
// console.log(isSameHour(startDATE,currentDATE) === true);
/*
document.getElementById("demo").innerHTML = startDATE

document.getElementById("demo1").innerHTML = startDATE.getHours() + ":"+ startDATE.getMinutes() */


var result = isSameMinute(startDATE,currentDATE)
function timerNORMAL() {
  // test where stop time > start time
  if (isSameMinute(startDATE,currentDATE) === true && isSameHour(startDATE,currentDATE) === true) {
    console.log("they are the same minute and hour -> emit event");
  }else if (startDATE.getHours() < currentDATE.getHours()  && stopDATE.getHours() > currentDATE.getHours() ) {
    // if current hours are between end date start hour and end hour then system should be on
    console.log("system should be on");
    timerSTATE = 1;
  }else if ( isSameHour(startDATE,currentDATE) === true && startDATE.getMinutes() < currentDATE.getMinutes()  ) {
    // if the hour is the same but the minute is equal to or greater then the start minute the system should be running.
    console.log("system should be on");
    timerSTATE = 1;
  }else if ( isSameMinute(stopDATE,currentDATE) === true && isSameHour(stopDATE,currentDATE) === true) {
    // if
    console.log("system should be off");
  }else {
    console.log("system should be off");
  }
}








console.log(result);

// test where stop  < start time
// if (true) {
//
// }else if (true) {
//
// }


// if time is between start and end.
