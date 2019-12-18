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
