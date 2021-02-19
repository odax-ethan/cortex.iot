const DATABASE_POUCH = require('./pouchdb/pouchdb')

class DATABASE {
    constructor(defined_DB) {
        //your db id type
        this.defined_DB = defined_DB;

        //predefined bd tooling 
        // History Tooling
        this.ADD_DEVICE_HISTORY 
        this.GET_ALL_HISTORY
        this.GET_TARGET_HISTORY 
        // Settings Tooling
        this.GET_SETTINGS 
        this.SET_SETTINGS
        // Device Bank
        this.GET_DEVICEBANK
        this.SET_DEVICEBANK
        // EVENTS
        this.GET_EVENTS
        this.ADD_EVENT

        this.NUKE
        


        //define the db tooling based on definedb
        switch (this.defined_DB) {
            case 'POUCHDB':
                
                //if pouchdb has been selected define bd tooling here
                this.ADD_DEVICE_HISTORY = DATABASE_POUCH.Device_history_add
                this.GET_ALL_HISTORY = DATABASE_POUCH.bulk_device_history
                this.GET_TARGET_HISTORY = DATABASE_POUCH.GET_TARGET_HISTORY
                // Settings Tooling
                this.GET_SETTINGS  = DATABASE_POUCH.Get_Setting_OBJ
                this.SET_SETTINGS = DATABASE_POUCH.Set_Settings
                // Device Bank
                this.GET_DEVICEBANK = DATABASE_POUCH.Get_Device_Bank_Array
                this.SET_DEVICEBANK = DATABASE_POUCH.Set_Device_Bank

                this.GET_EVENTS = DATABASE_POUCH.GET_EVENTS
                this.ADD_EVENT = DATABASE_POUCH.ADD_EVENT

                this.NUKE = DATABASE_POUCH.NUKE

                break;
            default:
                    console.log(`A database type has not been defined or there is some issues connection a custom db interface... These are fatal errors`); 
                break;
        }

    }

    // report what the db has be defined as
    def() {
        return console.log(`your db has been defined as ${this.defined_DB}`);
    }

    ADD_DEVICE_HISTORY (device_id, save_data){
        return this.ADD_DEVICE_HISTORY(device_id, save_data).catch((err)=>{throw err})
    }

    GET_ALL_HISTORY(){
        return this.GET_ALL_HISTORY().catch((err)=>{throw err})
    }

    GET_TARGET_HISTORY(targetID){
          return this.GET_TARGET_HISTORY(targetID).catch((err)=>{throw err})
    }

    GET_SETTINGS(){
        return this.GET_SETTINGS().catch((err)=>{throw err})
    }

    GET_DEVICEBANK(){
        return this.GET_DEVICEBANK().catch((err)=>{throw err})
    }

    SET_DEVICEBANK(deviceBank){
        return this.SET_SETTINGS(deviceBank).catch((err)=>{throw err})
    }

    SET_SETTINGS( settingOBJ ){
        return this.SET_SETTINGS(settingOBJ).catch((err)=>{throw err})
    }

    ADD_EVENT (eventBundle){
        return this.ADD_EVENT(eventBundle).catch((err)=>{throw err})
    }

    GET_EVENTS (){
        return this.GET_EVENTS(evenBundle).catch((err)=>{throw err})
    }

    NUKE(){
        return this.NUKE().catch((err)=>{throw err})
    }

}

exports.DATABASE = DATABASE