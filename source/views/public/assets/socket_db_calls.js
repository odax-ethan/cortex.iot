
    //log event on client when connected to server
    socket.emit('req GET_ALL_HISTORY');
    socket.on('res GET_ALL_HISTORY', (history) => {
        console.log('Got all device history');
        console.log(history);
    });

  
    socket.emit('req GET_SETTINGS');
    socket.on('res GET_SETTINGS', (settings) => {
        console.log('Got Cortex.iot setting');
        console.log(settings);
    });