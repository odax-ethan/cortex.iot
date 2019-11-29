
function timerLogicTester(time, callback){
    var handler = function() {
        callback(function() {
          clearInterval(interval);
        });
      };
      var interval = setInterval(handler, time);
      return this
  }

function relayerTimerTest() {
  var now = Date.now();
  return now
}


function looper(time, callback){
  var handler = function() {
      callback(function() {
        clearInterval(interval);
      });
    };
    var interval = setInterval(handler, time);
    return this
}


module.exports = { relayerTimerTest, timerLogicTester, looper };
