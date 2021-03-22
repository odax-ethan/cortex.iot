
    window.socket = io( 
      {secure:true,
      reconnect: true});
    
    //log event on client when connected to server
    socket.on('connect', () => {
      console.log('Connected to Cortex.iot server');
    });

