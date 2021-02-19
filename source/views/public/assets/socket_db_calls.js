    //log event on client when connected to server
    socket.emit('req GET_ALL_HISTORY');
    socket.on('res GET_ALL_HISTORY', (history) => {
        console.log('Got all device history');
        window.history = history

        document.querySelector(`#history`).innerHTML = JSON.stringify(history);

        console.log(history);
    });

    socket.emit('req GET_SETTINGS');
    socket.on('res GET_SETTINGS', (settings) => {
        console.log('Got Cortex.iot setting');
        window.settings = settings
        
        document.querySelector(`#settings`).innerHTML = JSON.stringify(settings);

        console.log(settings);
    });

    socket.emit('req GET_DEVICEBANK');
    socket.on('res GET_DEVICEBANK', (deviceBank) => {
        console.log('Got deviceBank');
        window.deviceBank = deviceBank

        document.querySelector(`#deviceBank`).innerHTML = JSON.stringify(deviceBank);

        console.log(deviceBank);
    });

    socket.on('stream', (streamBundle) => {
        console.log('Got streamBundle');
        window.streamBundle = streamBundle

        document.querySelector(`#streamBundle`).innerHTML = JSON.stringify(streamBundle);

        console.log(streamBundle);
    });


    socket.emit('req GET_EVENTS');
    socket.on('res GET_EVENTS', (events) => {
        console.log('Got events');
        window.events = events
        document.querySelector(`#events`).innerHTML = JSON.stringify(events);
    });

    


        
    

    socket.emit('req GET_TARGET_HISTORY','cool devices');
    socket.on('res GET_TARGET_HISTORY', (target_history) => {
        console.log('Got target history');
        window.target_history = target_history
        document.querySelector(`#target_history`).innerHTML = JSON.stringify(target_history);
    });






setTimeout(() => {
    
    // console.log(window.deviceBank);
    // console.log(window.settings);

    // socket.emit('req SET_SETTINGS', window.settings);
    // socket.on('res SET_SETTINGS', (settings) => {
    //     console.log('Got Cortex.iot setting');
    //     window.settings = settings
    //     console.log(settings);
    // });

    // socket.emit('req SET_DEVICEBANK',  window.deviceBank);
    // socket.on('res SET_DEVICEBANK', (deviceBank) => {
    //     console.log('Got Cortex.iot setting');
    //     window.deviceBank = deviceBank
    //     console.log(deviceBank);
    // });


}, 5000);