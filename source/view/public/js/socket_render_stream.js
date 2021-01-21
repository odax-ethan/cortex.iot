 // connect to socket at url 


//stream events and update DOM with data
socket.on('stream', (eventBundle) => {
  console.log(eventBundle);
  let target_data_placeholder = document.querySelector(`#${eventBundle.deviceID}_listViewData`);
  target_data_placeholder.innerHTML = eventBundle.dataBundle
}); 
