var dateFormat = require('dateformat');

class timestamp {
    constructor (time_zone){
        this.time_zone = time_zone
    }

    // stupid and simple
    getTime(){
        var date = new Date(); 
        var current_location_local_time =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return  new Date(current_location_local_time).toISOString(); 
    }

    get local() {
        return this.getTime().toString()
    }
}


TIMESTAMP = new timestamp(process.env.TIMEZONE)

console.log(TIMESTAMP.local);

module.exports = { TIMESTAMP };