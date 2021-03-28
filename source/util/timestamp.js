var dateFormat = require('dateformat');
//fuction for standardized time - let people set the clock to there needs
// assumes you are calling class 
// class timestamp {
//     constructor(UTC_offset) {
//         this.UTC_offset = UTC_offset;
//     }

//     getTime(){
//        return new Date();  
//     }

//     get UTC_Offset_Milli (){
//         let d = this.getTime()
//         return d.getTimezoneOffset() * 60000
//     }

//     // local offset
//     get local(){
//         let minuteToMilli = 60000
//         let hourToMilli = 3600000
//         let d = this.getTime()+ this.UTC_Offset_Milli
//         let offset = this.UTC_offset
//         // let utc =  d.getTime() + (d.getTimezoneOffset() * minuteToMilli);
//         var nd = new Date(d);
//         return dateFormat(nd, "dd-mm-yyyy HH:MM:ss");
//     }

//   }


class timestamp {
    constructor (time_zone){
        this.time_zone = time_zone
    }

    // stupid and simple
    getTime(){
        var date = new Date(); 
        var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
         date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

        return new Date(now_utc);
    }

    get local() {
        return this.getTime().toString()
    }
}



TIMESTAMP = new timestamp(process.env.TIMEZONE)

console.log(TIMESTAMP.local);

module.exports = { TIMESTAMP };