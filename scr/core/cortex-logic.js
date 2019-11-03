
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



module.exports = { relayerTimerTest, timerLogicTester };
