const App = function _App() {
    return App.state.view_handler()
};

App.state = {
      _to_render: 'landing',
      _to_render_stream: false,
      _target_uid: null,
      _target_shape: null,
      settings: null,
      deviceBank: null,
      stream_listener: null,
      device_history: null,
      get_device_bank: () =>{
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("/get/deviceBank", requestOptions)
          .then(response => response.text())
          .then((result) => {
            // console.log(result)
            App.state.deviceBank = JSON.parse(result)
          })
          .catch(error => console.log('error', error));
      },
      get_system_settings: () =>{

        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("/get/settings", requestOptions)
          .then(response => response.text())
          .then((result) => {
            // console.log(result)
            App.state.settings = JSON.parse(result)
          })
          .catch(error => console.log('error', error));

      },
      get_device_history: () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("/get/history", requestOptions)
          .then(response => response.text())
          .then(result => {
            // console.log(result)
            App.state.device_history = JSON.parse(result)
          })
          .catch(error => console.log('error', error));
      },
      render_stream: () =>{
        //this places the ui for render_stream() to place ui in

      var ui=`
        <section class="data_stream_container">
          <fieldset>
              <legend><a href="#data_stream">#</a> Cortex Data Stream</legend>
              <div class='data_stream_feed'>
              
              </div>
          </fieldset>
        </section>
        `


        return ui;
      },
      stream_feed: () =>{
      //this will render new stream data to the ui

          socket.on('stream', (streamBundle) => {
            // console.log(streamBundle);

            if (App.state._to_render === 'dashboard') {
               // place ui elements in data stream container
              data = `<div class='data_stream_feed_element'></div>`
              let _new = document.createElement('div')
              _new.setAttribute('class','data_stream_feed_element') 
              _new.innerHTML = `${streamBundle.timestamp}[${streamBundle.deviceID}]: ${streamBundle.data}`
              let target = document.querySelector('.data_stream_feed')
              target.prepend(_new)
              
              var output = streamBundle.data

              var test = parseInt(streamBundle.data)
              if (test) {
                output =  output
                // console.log(test);
              }

              //find the correct device and place data in data_stream_block
              var targetID = `data_stream_ui_block_${streamBundle.deviceID}`
              document.querySelector(`#${targetID}`).innerHTML = output
            }

        
        });
  
      },
      render_landing: () =>{
          return `
            <div class='landing'>
                <img style='width:35%'src="./public/images/cortex.iot-brand-logo-mark-black.png" alt="">
                <h1>Cortex.iot</h1>
                <a onclick="App.state.change_view('dashboard')">Enter<a>
            </div>
          `
      },
      render_dashboard: ()=>{
        return `
            ${App.state.render_nav_bar()}
            <div class='boards_content'>
            ${App.state.render_board_devices()}
            ${App.state.render_stream()}

            <!-- The Modal -->
            <div id="myModal" class="modal">

              <!-- Modal content -->
              <div class="modal-content">
                <span class="close">&times;</span>
                <p>Some text in the Modal..</p>
              </div>

            </div>


            </div>
        `
      },
      render_board_devices: () => {
  
        var output =''

        App.state.deviceBank.forEach(board => {
          console.log(board);
          var board_container
          var board_details = `
            <div class="board_details">
              <div><span>${board.uid}</span></div>
              <div>
                <ion-icon style="color:${board.color}" onclick='App.state.change_view("hardware_viewer","${board.uid}")' name="hardware-chip-outline"> </ion-icon>
              </div>
            </div>
          `

          var devices = ''
         

          board.devices.forEach(device => {

            var data_stream_block = " "
            var device_class_icon = " "

            switch (device.class) {
              case 'hygrometer':
                  console.log('hyrgo');
                  data_stream_block = ` <div class='data_stream_block ${device.class}'><span id="data_stream_ui_block_${device.uid}">00</span>%</div>`
                  device_class_icon = `<ion-icon style="color:${device.color}"  onclick='App.state.change_view("hardware_viewer","${device.uid}")' name="water-outline"></ion-icon> `
                break;
              case 'thermometer':
                console.log('temp');
                data_stream_block = ` <div class='data_stream_block ${device.class}'><span id="data_stream_ui_block_${device.uid}">0.0</span>*C</div>`
                device_class_icon = ` <ion-icon style="color:${device.color}" onclick='App.state.change_view("hardware_viewer","${device.uid}")' name="thermometer-outline"></ion-icon> `
              break;
              default:
                break;
            }

            console.log(device);

            var device_html = `
              <div class="device_container humidity">
                  ${data_stream_block}
                  <div>${device.nid}</div>
                  <div>
                    ${device_class_icon}
                  </div>
              </div>
            `

            devices += device_html

          });

          var board_container = `
          <div class='board_container'>
            ${board_details}
            ${devices}
          </div>
          `

          output += board_container
          
        });

        return output
        


      },
      render_target_hardware_viewer: () =>{



        return `
        ${App.state.render_nav_bar()}
        <p>rendering ${App.state._target_uid} viewer panel</p>
        <a onclick="App.state.change_view('hardware_raw_data_viewer','${App.state._target_uid}')"> RAW DATA </a>
        `
      },
      render_target_hardware_raw_data_viewer:()=>{
        return `
        ${App.state.render_nav_bar()}
        rendering ${App.state._target_uid} RAw panel
        `
      },
      render_settings: ()=>{

        var scale_options =''
        switch (App.state.settings.SAMPLE_TEMP_SCALE) {
          case 'C':
            scale_options =`
            
            <option>- Pick a Scale -</option>
            <option selected >C (celcius)</option>
            <option>F (fahrenheit)</option>
            <option>K (kelvin)</option>
            
            `
            break;
          case 'F':
            scale_options =`
            
            <option>- Pick a Scale -</option>
            <option >C (celcius)</option>
            <option selected>F (fahrenheit)</option>
            <option>K (kelvin)</option>
            
            `
            break;
          case 'K':
            scale_options =`
            
            <option>- Pick a Scale -</option>
            <option >C (celcius)</option>
            <option >F (fahrenheit)</option>
            <option selected>K (kelvin)</option>
            
            `
            break;  
          default:
            break;
        }


        return `
            ${App.state.render_nav_bar()}
            
            <section id="general_setting">
              <fieldset>
                <legend><a href="#general_setting">#</a> General Settings</legend>
                <div>
                    <label for="example-input-text">System Name:</label>
                    <input type="text" id="example-input-text" value='${App.state.settings.SYSTEM_NAME}'>
                </div>

              </fieldset>

            </section>

            <section id="software_settings">
                <fieldset>
                    <legend><a href="#software_settings">#</a> Software Settings</legend>

                    <div>
                        <label for="example-input-text">Database:</label>
                        <input type="text" id="example-input-text" value='${App.state.settings.DATABASE}'>
                    </div>

                    <div>
                        <label for="example-input-text">Database URL:</label>
                        <input type="text" id="example-input-text" value='${App.state.settings.DATABASE_URL}'>
                    </div>

                </fieldset>

            </section>

            <section id="hardware_settings">
                <fieldset>
                    <legend><a href="#hardware_settings">#</a> Hardware Settings</legend>

                    <div>
                        <label for="example-input-text">Hardware Sample Rate: Every</label>
                        <input type="number" id="example-input-text" value='${App.state.settings.HARDWARE_SAMPLE_RATE}'>
                        milliseconds
                    </div>

                    <div>
                        <label for="example-select1">Sample Tempurature Scale:</label>
                        <select id="example-select1">
                            ${scale_options}
                        </select>
                    </div>

                </fieldset>
            </section>


        `
      },
      render_settings_device_bank: ()=>{


        var output =`${App.state.render_nav_bar()}`

        App.state.deviceBank.forEach(board => {
          var board_container
          var board_details = `
            <div class="board_details">
              <div> <ion-icon style="color:${board.color}" name="hardware-chip-outline"> </ion-icon> <span>${board.uid}</span></div>
              <div>
                <ion-icon name="close-circle-outline" onclick='App.state.delete_hardware_from_deviceBank()'></ion-icon>
                <ion-icon name="settings-outline" onclick='App.state.change_view("settings_target_hardware","${board.uid}")'></ion-icon>
              </div>
            </div>
          `

          var devices = ''
         

          board.devices.forEach(device => {

            var data_stream_block = " "
            var device_class_icon = " "

            switch (device.class) {
              case 'hygrometer':
                  console.log('hyrgo');
                  data_stream_block =''
                  device_class_icon =  `<ion-icon style="color:${device.color}" name="water-outline"></ion-icon>  `
                break;
              case 'thermometer':
                console.log('temp');
                data_stream_block =''
                device_class_icon = `<ion-icon style="color:${device.color}" name="thermometer-outline"></ion-icon>  `
              break;
              default:
                break;
            }


            var device_html = `
              <div class="device_container">
                  <div>${device_class_icon}</div>
                  <div>${device.nid}</div>
                  <div>
                    <ion-icon name="close-circle-outline" onclick='App.state.delete_hardware_from_deviceBank()'></ion-icon>
                    <ion-icon name="settings-outline" onclick='App.state.change_view("settings_target_hardware","${device.uid}")'></ion-icon>
                  </div>
              </div>
            `

            devices += device_html

          });

          var board_container = `
          <div class='board_container'>
            ${board_details}
            ${devices}
          </div>
          `

          output += board_container
          
        });

        return output



      },
      delete_hardware_from_deviceBank: ()=>{
        alert('wow watch what your doing')
      },
      render_target_hardware_settings:() =>{

        //get and set current target shape.
        App.state.find_hardware_by_uid(App.state._target_uid);
        //grab and place in viewer

        var settings_html = ``
        var target_shape = App.state._target_shape;

        switch (target_shape.class) {
          case 'thermometer':
            console.log('rendering a thermometer');
            settings_html = `
            <section id="thermometer_settings">
                <fieldset>
                    <legend><a href="#thermometer_settings">#</a> Thermometer Settings</legend>

                    <div>
                        <label for="example-input-text">Thermometer Name:</label>
                        <input type="text" id="example-input-text" value="${target_shape.nid}">
                    </div>
                    <div>
                        <label for="example-input-text">Thermometer ID:</label>
                        <input type="text" id="example-input-text" value="${target_shape.uid}">
                    </div>
                    <div>
                        <label for="example-input-text">Thermometer Color:</label>
                        <input type="color" id="example-input-text" value="${target_shape.color}">
                    </div>

                    <div>
                        <label for="example-select1">Target Board:</label>
                        <select id="example-select1">
                            <option>- Pick a Board -</option>
                            <option>My Test Board 1</option>
                            <option>My Test Board 2</option>
                        </select>
                    </div>

                    <div>
                        <label for="example-select1">Controller:</label>
                        <select id="example-select1">
                            <option>- Pick a Controller -</option>
                            <option value="BME280">BME280</option>
                            <option value="LM35">LM35</option>
                            <option value="TMP36">TMP36</option>
                            <option value="TMP102">TMP102</option>
                            <option value="DS18B20">DS18B20 </option>
                            <option value="MPU6050">MPU6050</option>
                            <option value="BMP180">BMP180</option>
                            <option value="BMP280">BMP280</option>
                            <option value="BME280">BME280</option>
                            <option value="MPL115A2">MPL115A2</option>
                            <option value="MPL3115A2">MPL3115A2</option>
                            <option value="HTU21D">HTU21D</option>
                            <option value="HIH6130">HIH6130</option>
                            <option value="MCP9808">MCP9808</option>
                            <option value="SI7020">SI7020</option>
                            <option value="SI7021">SI7021</option>
                            <option value="MS5611">MS5611</option>
                            <option value="DHT11">DHT11</option>
                            <option value="DHT21">DHT21</option>
                            <option value="DHT22">DHT22</option>
                            <option value="SHT31D">SHT31D</option>
                            <option value="LSM303C">LSM303C</option>
                        </select>
                    </div>
                </fieldset>
            </section>
            `
            break;
          case 'hygrometer':
              console.log('rendering a hygrometer');
              settings_html = `
              <section id="hygrometer_settings">
                  <fieldset>
                      <legend><a href="#hygrometer_setting">#</a> Hygrometer Settings</legend>

                      <div>
                          <label for="example-input-text">Hygrometer Name:</label>
                          <input type="text" id="example-input-text" value="${target_shape.nid}">
                      </div>
                      <div>
                          <label for="example-input-text">Hygrometer ID:</label>
                          <input type="text" id="example-input-text" value="${target_shape.uid}">
                      </div>
                      <div>
                          <label for="example-input-text">Hygrometer Color:</label>
                          <input type="color" id="example-input-text"  value="${target_shape.color}">
                      </div>

                      <div>
                          <label for="example-select1">Target Board:</label>
                          <select id="example-select1">
                              <option>- Pick a Board -</option>
                              <option>My Test Board 1</option>
                              <option>My Test Board 2</option>
                          </select>
                      </div>

                      <div>
                          <label for="example-select1">Controller:</label>
                          <select id="example-select1">
                              <option>- Pick a Controller -</option>
                              <option value="BME280">BME280</option>
                              <option value="HTU21D">HTU21D</option>
                              <option value="HIH6130">HIH6130</option>
                              <option value="TH02 ">TH02</option>
                              <option value="SI7020">SI7020</option>
                              <option value="SI7021">SI7021</option>
                              <option value="SHT31D">SHT31D</option>
                          </select>
                      </div>
                  </fieldset>
              </section>
              `
            break;
            case 'relay':
              console.log('rendering a relay');
              settings_html = `
              <section id="relay_settings">


                    <fieldset>
                        <legend><a href="#relay_settings">#</a> Relay Settings</legend>
        
                        <div>
                            <label for="example-input-text">Relay Name:</label>
                            <input type="text" id="example-input-text">
                        </div>
                        <div>
                            <label for="example-input-text">Relay ID:</label>
                            <input type="text" id="example-input-text">
                        </div>
                        <div>
                            <label for="example-input-text">Relay Color:</label>
                            <input type="color" id="example-input-text">
                        </div>
        
                        <div>
                            <label for="example-select1">Target Board:</label>
                            <select id="example-select1">
                                <option>- Pick a Board -</option>
                                <option>My Test Board 1</option>
                                <option>My Test Board 2</option>
                            </select>
                        </div>
        
                        <div>
                            <label for="example-select1">Relay Type:</label>
                            <select id="example-select1">
                                <option>- Pick Type -</option>
                                <option>NO (Normally Open)</option>
                                <option>NC (Normally Closed)</option>
                            </select>
                        </div>
        
                        <div>
                            <label for="example-input-text">Relay Pin:</label>
                            <input type="color" id="example-input-text">
                        </div>
        
                    </fieldset>
        
                </section>
              `
            break;
            case 'switch':
              console.log('rendering a switch');
              settings_html = `
              
              <section id="switch_settings">


                      <fieldset>
                          <legend><a href="#switch_settings">#</a> Switch Settings</legend>
          
                          <div>
                              <label for="example-input-text">Switch Name:</label>
                              <input type="text" id="example-input-text">
                          </div>
                          <div>
                              <label for="example-input-text">Switch ID:</label>
                              <input type="text" id="example-input-text">
                          </div>
                          <div>
                              <label for="example-input-text">Switch Color:</label>
                              <input type="color" id="example-input-text">
                          </div>
          
                          <div>
                              <label for="example-select1">Target Board:</label>
                              <select id="example-select1">
                                  <option>- Pick a Board -</option>
                                  <option>My Test Board 1</option>
                                  <option>My Test Board 2</option>
                              </select>
                          </div>
          
                          <div>
                              <label for="example-input-text">Switch Pin:</label>
                              <input type="text" id="example-input-text">
                          </div>
          
                      </fieldset>
          
                  </section>
              
              `
            break;
          default:
            console.log('probably a board');
            settings_html = `
            
            <section id="board_settings">


                <fieldset>
                    <legend><a href="#board_settings">#</a> Board Settings</legend>

                    <div>
                        <label for="example-input-text">Board Name</label>
                        <input type="text" id="example-input-text" value="${target_shape.nid}">
                    </div>

                    <div>
                        <label for="example-input-text">Board Unique ID</label>
                        <input type="text" id="example-input-text" value="${target_shape.uid}">
                    </div>

                    <div>
                        <label for="example-input-text">Board Color:</label>
                        <input type="color" id="example-input-text" value="${target_shape.color}">
                    </div>

                    <div>
                        <label for="example-input-text">Board Port</label>
                        <input type="text" id="example-input-text" value="${target_shape.port}">
                    </div>

                </fieldset>

            </section>

            
            `
            break;
        }



        return `
        ${App.state.render_nav_bar()}  
        ${settings_html}
        `

      },
      render_nav_bar: () =>{
        return `
        <header role="banner">
          <div>
            <img style='width:32px'src="./public/images/cortex.iot-brand-logo-mark-black.png" alt="">
          </div>
          <div>
            ${App.state._to_render}</div>
          <div class='nav_right_links'> 
            <small>            
              <a onclick="App.state.change_view('dashboard')">Dashboard</a> |
              <a onclick="App.state.change_view('settings')">Settings</a>  |
              <a onclick="App.state.change_view('device_bank')">Hardware</a>
            </small> 
          </div>
        <hr>
        </header>
        `
      },
      render_modal: () =>{

        // Get the modal
        var modal = document.getElementById("myModal");
        modal.style.display = "block"

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
          modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }

      },
      find_hardware_by_uid: (target_uid) =>{
         App.state.deviceBank.forEach(board => {
            if (target_uid === board.uid) {
              return App.state._target_shape = board
            }
            board.devices.forEach(device => {
              if (target_uid === device.uid) {
                console.log(device);
                return App.state._target_shape = device
              }
            });
          });
      },
      find_hardware_history: (target_uid)=>{

      },
      change_view: (e, target_uid) => {
        App.state._to_render = e;
        App.state._target_uid = target_uid
        console.log('rendering: ' + App.state._to_render);
        return   updateTree();
      },
      report: () => {
        console.log(App.state);
      },
      view_handler: () =>{
        console.log(App.state._to_render);
        if (App.state._to_render === 'landing') {
           return App.state.render_landing()
        }
        if (App.state._to_render === 'dashboard') {
            App.state.stream_feed()
            return App.state.render_dashboard()
         }
        if (App.state._to_render === 'settings') {
        return App.state.render_settings()
        }
        if (App.state._to_render === 'hardware_viewer') {
          return App.state.render_target_hardware_viewer()
        }
        if (App.state._to_render === 'hardware_raw_data_viewer') {
          return App.state.render_target_hardware_raw_data_viewer()
        }
        if (App.state._to_render === 'device_bank') {
          return App.state.render_settings_device_bank()
        }
        if (App.state._to_render === 'settings_target_hardware') {
          return App.state.render_target_hardware_settings()
        }

      }

}

  const updateTree = () => {
    document.querySelector(`body`).innerHTML = App();
  };

  App.state.get_system_settings();
  App.state.get_device_bank();
  App.state.get_device_history();

  updateTree();
