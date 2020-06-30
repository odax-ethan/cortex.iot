var dateFormat = require('dateformat');


function localTime(offset) {

    // create Date object for current location
    var   d = new Date();

    // '2013-10-04 22:23:00'


    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for any location
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));
    return dateFormat(nd, "yyyy-mm-dd HH:MM:ss");


    // return time as a string
    // return nd.toLocaleString();

}


module.exports = {localTime};
