 // connect to socket at url 
      const socket = io();

      //log event on client when connect to server
      socket.on('connect', () => {
        console.log('connected');
      });

      //stream events and update DOM with data
      socket.on('stream', (eventBundle) => {
        console.log(eventBundle);
        let target_data_placeholder = document.querySelector(`#${eventBundle.deviceID}_listViewData`);
        target_data_placeholder.innerHTML = eventBundle.dataBundle
      }); 
