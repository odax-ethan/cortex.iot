        //master variables
        var complete_hardware_history, System_config, Hardware_config;
       
        //step 1
        //get data for init render

        //graphql query to set up view
        var query = `query { System_config, Hardware_config}`;


        //get data and create init View
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
        
          // data.Hardware_config
          Hardware_config = JSON.parse(data.data.Hardware_config)
          System_config = JSON.parse(data.data.System_config)
          // complete_hardware_history = JSON.parse(data.complete_hardware_history)
          // console.log(Hardware_config);
          // console.log(System_config);
          // data.complete_hardware_history
          // console.log('data returned:', data)


          // run renderer
           return render_hardware(Hardware_config, data)



        });


  