

const download_all_history = () => {


    socket.emit('req GET_ALL_HISTORY');
    socket.on('res GET_ALL_HISTORY', (history) => {
        console.log('Got all device history');
       //  window.history = history
   
        var filename = 'history.js'
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`var table = ${JSON.stringify(history)}; module.exports = { table };`));
        element.setAttribute('download', filename);
        
        element.style.display = 'none';
        document.body.appendChild(element);
        
        element.click();
        
        document.body.removeChild(element);
        
        return console.log('history downloaded');
   
    });


}

