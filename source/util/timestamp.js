var dateFormat = require('dateformat');
//fuction for standardized time - let people set the clock to there needs
// assumes you are calling class 
class timestamp {
    constructor(UTC_offset) {
        this.UTC_offset = UTC_offset;
    }

    getTime(){
       return new Date();  
    }

    get UTC_Offset_Milli (){
        let d = this.getTime()
        return d.getTimezoneOffset() * 60000
    }

    // local offset
    get local(){
        let minuteToMilli = 60000
        let hourToMilli = 3600000
        let d = this.getTime()+ this.UTC_Offset_Milli
        let offset = this.UTC_offset
        // let utc =  d.getTime() + (d.getTimezoneOffset() * minuteToMilli);
        var nd = new Date(d);
        return dateFormat(nd, "dd-mm-yyyy HH:MM:ss");
    }

  }

TIMESTAMP = new timestamp(-5)

console.log(TIMESTAMP.local);

module.exports = { TIMESTAMP };