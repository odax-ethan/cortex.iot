const App = function _App() {
    return App.state.view_handler()
};

App.state = {
      _to_render: 'landing',
      _to_render_stream: false,
      settings: null,
      deviceBank: null,
      stream_listener: null,
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
                output =  test.toPrecision(4)
                console.log(test);
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
        var ui =  `
        
        <div class='board_container'>
          <div class='board_details'>
            <div><span>BOARD NAME</span></div>
            <div>
              <ion-icon name="hardware-chip-outline"> </ion-icon>
              <ion-icon name="options-outline"></ion-icon>
            </div>
          </div>
    
          <div class="device_container humidity">
            <div><span>00</span>%</div>
            <div>HYGROMETER</div>
            <div>
              <ion-icon name="water-outline"></ion-icon>
              <ion-icon name="receipt-outline"></ion-icon>
              <ion-icon name="options-outline"></ion-icon>
            </div>
          </div>
    
          <div class="device_container tempurature">
            <div><span>0.0</span>*C</div>
            <div>THERMOMETER</div>
            <div>
              <ion-icon name="thermometer-outline"></ion-icon>
              <ion-icon name="receipt-outline"></ion-icon>
              <ion-icon name="options-outline"></ion-icon>
            </div>
          </div>
    
          <div class="device_container relay">
            <div><span>OFF</span></div>
            <div>RELAY</div>
            <div>
              <ion-icon name="flash-outline"></ion-icon>
              <ion-icon name="receipt-outline"></ion-icon>
              <ion-icon name="options-outline"></ion-icon>
            </div>
          </div>
    
          <div class="device_container state">
            <div><span>ON</span></div>
            <div>SWITCH</div>
            <div>
              <ion-icon name="toggle-outline"></ion-icon>
              <ion-icon name="receipt-outline"></ion-icon>
              <ion-icon name="options-outline"></ion-icon>
            </div>
          </div>
    
    
    
        </div>
       
  
        `
        var output =''

        App.state.deviceBank.forEach(board => {
          console.log(board);
          var board_container
          var board_details = `
            <div class="board_details">
              <div><span>${board.uid}</span></div>
              <div>
                <ion-icon style="color:${board.color}" name="hardware-chip-outline"> </ion-icon>
                <a><ion-icon name="options-outline" onclick='App.state.render_modal()'></ion-icon></a>
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
                  device_class_icon = `<ion-icon style="color:${device.color}" name="water-outline"></ion-icon> `
                break;
              case 'thermometer':
                console.log('temp');
                data_stream_block = ` <div class='data_stream_block ${device.class}'><span id="data_stream_ui_block_${device.uid}">0.0</span>*C</div>`
                device_class_icon = ` <ion-icon style="color:${device.color}" name="thermometer-outline"></ion-icon> `
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
                    <ion-icon name="receipt-outline"></ion-icon>
                    <a><ion-icon name="options-outline" onclick='App.state.render_modal()'></ion-icon></a>
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
              <a onclick="App.state.change_view('settings')">Settings</a>
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
      change_view: (e) => {
        App.state._to_render = e;
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
      }

}

  const updateTree = () => {
    document.querySelector(`body`).innerHTML = App();
  };

  App.state.get_system_settings();
  App.state.get_device_bank();
  updateTree();
