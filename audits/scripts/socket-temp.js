
//sensor base event
sensorEmitter.on('new', (data) => {
  // console.log(data);
  sensorEmitter.emit('socket-update', data)
  sensorEmitter.emit('sensor-db-update', data)
})

sensorEmitter.on('sensor-db-update', (data) => {

    let searchName = data.deviceID
    // console.log(searchName);
    masterDB.get(searchName).catch(function (err) {
        if (err.name === 'not_found') {
          console.log("no record found");
          let newData = {
            _id: searchName,
            deviceID : searchName,
            data : [data.value]
          };
          return masterDB.put(newData)
        } else { // hm, some other error
          throw err;
        }
      }).then(function (doc) {
        let newData = doc
        let newDataSet = doc.data
        newDataSet.push(data.value)
        newData.data = newDataSet
        masterDB.put(newData)
      }).catch(function (err) {
        // handle any errors
      });

})



socket.on('last-sensor-readings-request',() => {
  //console.log("new request");
  masterDB.allDocs({
    include_docs: true,
    attachments: false
  }).then(function (result) {
    // handle result
    let dataRows = result.rows
    let dataCarrier = []
    let masterDataHistoryArray = []

    for (var i = 0; i < dataRows.length; i++) {
      let dataContainer = dataRows[i].doc
      let dataName = dataRows[i].id
      let result = { dataName: dataName, data : dataContainer.data }
      masterDataHistoryArray.push(result)
    }
    // console.log(masterDataHistoryArray);
    socket.emit('last-sensor-readings', masterDataHistoryArray)
})
})


sensorEmitter.on('socket-update', (x) => {
  // console.log(`sensor state is ${x}`);
  socket.emit('sensor-stateUpdate',  x );
  // console.log('data to sockets: ' + x);
})
