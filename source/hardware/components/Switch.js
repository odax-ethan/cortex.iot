var five = require("johnny-five");
const { systemEmitter } = require('../../util/emitter/systemEmitter')
const { TIMESTAMP } = require('../../util/timestamp')

class SWITCH {
    constructor(device, target_board) {
        this.device = device; //devices shape
        this.uid = this.device.uid // pull id out 
        this.target_board = target_board; //the devices board
        this.device_container
        // console.log(this.device.triggers);
        this.triggers = this.device.triggers
    }

    build () {
        this.device_container = new five.Switch({id:this.uid, pin: this.device.pin, type: this.device.type})
        let uid = this.uid

        //share state change in  the client
    //    this.device_container.on("open", function() {
    //         console.log('open');
    //         systemEmitter.emit('event', uid, 'trigger', 'OK', 'open', TIMESTAMP.local)

    //         // systemEmitter.emit(`switch-trigger-${this.uid}-open`)

    //     })

        //share state change in  the client
    //    this.device_container.on("close", function() {
    //         console.log('closed');
    //         systemEmitter.emit('event', uid, 'trigger', 'OK', 'close', TIMESTAMP.local)
    //     });


        this.triggers.forEach(trigger => {


            // trigger.target 

            this.device_container.on("open", function() {
                console.log('open');
                systemEmitter.emit('event', uid, 'trigger', 'OK', 'open', TIMESTAMP.local)

                systemEmitter.emit(`relay-trigger-${trigger.target }-off`, () => {});// end of system emitter

                // systemEmitter.emit(`switch-trigger-${this.uid}-open`)

            })

            // share state change in  the client
            this.device_container.on("close", function() {
                console.log('closed');
                systemEmitter.emit('event', uid, 'trigger', 'OK', 'close', TIMESTAMP.local)

                systemEmitter.emit(`relay-trigger-${trigger.target }-on`, () => {});// end of system emitter
            });

            
        });

    }
}


module.exports = { SWITCH }