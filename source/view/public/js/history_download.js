function download_system_history() {


    // graphql call for complete dataset
    var query = `query { complete_hardware_history}`;

    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query
      })
    })
    .then(r => r.json())
    .then(data => {
    
      var filename = 'system_device_history.txt'
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data.data.complete_hardware_history));
      element.setAttribute('download', filename);
    
      element.style.display = 'none';
      document.body.appendChild(element);
    
      element.click();
    
      document.body.removeChild(element);
      
       return console.log('history downloaded');

    });






  









  }
  
  // Start file download.
  // download("hello.txt","This is the content of my file :)");