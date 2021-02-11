const DATABASE_POUCH = require('./pouchdb/pouchdb')

class DATABASE {
    constructor(defined_DB) {
        //your db id type
        this.defined_DB = defined_DB;

        //predefined bd tooling 
        this.ADD_DEVICE_HISTORY 
        this.GET_ALL_HISTORY
        this.GET_TARGET_HISTORY 
        this.GET_SETTINGS 
        this.SET_SETTINGS
        this.GET_DEVICEBANK
        this.SET_DEVICEBANK


        //define the db tooling based on definedb
        switch (this.defined_DB) {
            case 'POUCHDB':
                
                //if pouchdb has been selected define bd tooling here
                this.ADD_DEVICE_HISTORY = DATABASE_POUCH.Device_history_add
                this.GET_ALL_HISTORY = DATABASE_POUCH.bulk_device_history

                break;
            default:
                    console.log(`A database type has not been defined... This is a fatal error`); 
                break;
        }



    }

    // repory what the db has be defined as
    def() {
        console.log(this.ADD_DEVICE_HISTORY);
        return console.log(`your db has been defined as ${this.defined_DB}`);
    }

    ADD_DEVICE_HISTORY (device_id, save_data){
        console.log(1);
        return this.ADD_DEVICE_HISTORY(device_id, save_data).catch((err)=>{throw err})

    }

    GET_ALL_HISTORY(){
        console.log(2);
        return this.GET_ALL_HISTORY().catch((err)=>{throw err})

    }

}

exports.DATABASE = DATABASE