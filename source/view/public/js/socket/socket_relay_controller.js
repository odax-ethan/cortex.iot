relay_on = (id) => {
    socket.emit('systemEmitter-emit', `relay-trigger-${id}-on`); 
    console.log('event sent');
}


relay_off = (id) => {
    socket.emit('systemEmitter-emit', `relay-trigger-${id}-off`); 
    console.log('event sent');
}

relay_toggle = (id) => {
    socket.emit('systemEmitter-emit', `relay-trigger-${id}-toggle`); 
    console.log('event sent');
}