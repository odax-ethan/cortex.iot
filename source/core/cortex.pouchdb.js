var PouchDB = require('pouchdb');
var eventHistoryDB = new PouchDB('eventHistory');


addToEventStreamDB = (data) => {

    eventHistoryDB.get('eventHistory').catch(function (err) {
    if (err.name === 'not_found') {
      return eventHistoryDB.put({
        _id: 'eventHistory',
        data: ['data']
      });
    } else { // hm, some other error
      throw err;
    }
  }).then(function (eventHistoryDoc) {
    // sweet, here is our eventHistoryDoc
    dataTarget = eventHistoryDoc.data;
    dataTarget.push(data);
    console.log(eventHistoryDoc);
    eventHistoryDB.put(eventHistoryDoc);
    return console.log('worked');
  }).catch(function (err) {
    // handle any errors
    console.log(err);
  });

  return console.log('done');

}

addToEventStreamDB('data')
