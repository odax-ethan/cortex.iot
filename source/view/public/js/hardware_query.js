        //master variables
        var System_config, Hardware_config;
       
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
           return render_hardware(Hardware_config)



        });


        // // test examples hardware config
        // Hardware_config = 
        // [ 
        //   {
        //     id: "fruiting_tent", 
        //     nid: "Fruiting Tent", 
        //     port: "/dev/ttyACM0", 
        //     color: "#0078ff", 
        //     devices: [
        //       {id: "tent_light_relay", nid: "Tent Grow Light", class: "relay", pin: "2", type: "NC", color: "#ff8e51"} ,  
        //       {id: "input_air_relay", nid: "Fan + Humidifier", class: "relay", pin: "3", type: "NC", color: "#ff8e51"},
        //       {id: "temp_main_space", nid: "Main Space Temp", class: "thermometer", controller: "DS18B20", pin: "8", color: "#ff8e51"},
        //       {id: "temp_fruiting_tent", nid: "Fruiting Tent Temp", class: "thermometer", controller: "DS18B20", pin: "7" , color: "#ff8e51"},
        //       {id: "hygro_main_room", nid: "Main Room Humidity", class: "hygrometer", controller: "SHT31D", board: "fruiting_tent", color: "#ff8e51"},
        //       {id: "hygro_fruiting_tent", nid: "Fruiting Tent Humidity", class: "hygrometer", controller: "SHT31D", board: "fruiting_tent", color: "#ff8e51"}
        //     ]
        //   },
        //   {
        //     id: "fruiting_tent_1", 
        //     nid: "Fruiting Tent 1", 
        //     port: "/dev/ttyACM1", 
        //     color: "#0078ff", 
        //     devices: [
        //       {id: "tent_light_relay", nid: "Tent Grow Light", class: "relay", pin: "2", type: "NC", color: "#ff8e51"} ,  
        //       {id: "input_air_relay", nid: "Fan + Humidifier", class: "relay", pin: "3", type: "NC", color: "#ff8e51"},
        //       {id: "temp_main_space", nid: "Main Space Temp", class: "thermometer", controller: "DS18B20", pin: "8", color: "#ff8e51"},
        //       {id: "temp_fruiting_tent", nid: "Fruiting Tent Temp", class: "thermometer", controller: "DS18B20", pin: "7" , color: "#ff8e51"},
        //       {id: "hygro_main_room", nid: "Main Room Humidity", class: "hygrometer", controller: "SHT31D", board: "fruiting_tent", color: "#ff8e51"},
        //       {id: "hygro_fruiting_tent", nid: "Fruiting Tent Humidity", class: "hygrometer", controller: "SHT31D", board: "fruiting_tent", color: "#ff8e51"}
        //     ]
        //   }
        // ]

        // //render hardware ui test
        // render_hardware(Hardware_config)


