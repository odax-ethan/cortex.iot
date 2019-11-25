// return soc
socket.on("target-device-history", (target,option,detail) => {

  // target defines deviceID
  // option is the the data selection definition
  // all - all data goof ball
  // timeFrame - assumes start and stop Date
  // steps - assumes a # for the # numbers of rows to select

  switch (option) {
    case "all":
        //get all hisory
        // getSensorDataFor(deviceID)

          // masterDB.get(target).catch(function (err) {
          //       if (err.name === 'not_found') {
          //         console.log("no record found");
          //       } else { // hm, some other error
          //         throw err;
          //       }
          //     }).then(function (doc) {
          //       console.log(doc);
          //       return doc
          //     }).catch(function (err) {
          //       // handle any errors
          //     });;



      break;
    case "timeFrame":
        //for set time frame
      break;
    case "steps":
        //for set time frame
      break;
    default:

  }
});
