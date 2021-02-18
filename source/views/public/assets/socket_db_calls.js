
    //log event on client when connected to server
    socket.emit('req GET_ALL_HISTORY');
    socket.on('res GET_ALL_HISTORY', (history) => {
        console.log('Got all device history');
        window.history = history
        console.log(history);
    });

    socket.emit('req GET_SETTINGS');
    socket.on('res GET_SETTINGS', (settings) => {
        console.log('Got Cortex.iot setting');
        window.settings = settings
        
        document.querySelector(#)

        console.log(settings);
    });

    socket.emit('req GET_DEVICEBANK');
    socket.on('res GET_DEVICEBANK', (deviceBank) => {
        console.log('Got deviceBank');
        window.deviceBank = deviceBank
        console.log(deviceBank);
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