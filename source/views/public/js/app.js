const App = function _App() {
  return App.state.view_handler()
};

App.state = {
  _to_render: 'landing',
  _to_render_stream: false,
  _target_uid: null,
  _target_shape: null,
  _target_history: null,
  _page_title: "Cortex.iot",
  settings: null,
  deviceBank: null,
  stream_listener: null,
  device_history: null,
  get_device_bank: () => {
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
  get_system_settings: () => {

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
        console.log('got device history')
        App.state.device_history = JSON.parse(result)
      })
      .catch(error => console.log('error', error));
  },
  render_stream: () => {
    //this places the ui for render_stream() to place ui in

    var ui = `
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
  stream_feed: () => {
    //this will render new stream data to the ui

    socket.on('stream', (streamBundle) => {
      // console.log(streamBundle);

      if (App.state._to_render === 'dashboard') {
        // place ui elements in data stream container
        data = `<div class='data_stream_feed_element'></div>`
        let _new = document.createElement('div')
        _new.setAttribute('class', 'data_stream_feed_element')
        _new.innerHTML = `${streamBundle.timestamp}[${streamBundle.deviceID}]: ${streamBundle.data}`
        let target = document.querySelector('.data_stream_feed')
        target.prepend(_new)

        var output = streamBundle.data

        var test = parseInt(streamBundle.data)
        if (test) {
          output = output
          // console.log(test);
        }

        //find the correct device and place data in data_stream_block
        var targetID = `data_stream_ui_block_${streamBundle.deviceID}`
        document.querySelector(`#${targetID}`).innerHTML = output
      }


    });

  },
  render_landing: () => {
    return `
            <div class='landing'>
                <img style='width:35%'src="./public/images/cortex.iot.brand-full-mark.png" alt=""><br>
                <button class='button' onclick="App.state.change_view('dashboard')">Enter</button> <br>
            </div>
          `
  },
  render_dashboard: () => {
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

    var output = ''

    App.state.deviceBank.forEach(board => {
      console.log(board);
      var board_container
      var board_details = `
            <div class="board_details">
              <div><span>${board.uid}</span></div>
              <div style="margin: auto 0 auto auto; color:${board.color};">
                  <div class="icon microchip" onclick='App.state.change_view("hardware_viewer","${board.uid}")' ></div>
              </div>
            </div>
          `
      // <ion-icon style="color:${board.color}" onclick='App.state.change_view("hardware_viewer","${board.uid}")' name="hardware-chip-outline"> </ion-icon>

      var devices = ''


      board.devices.forEach(device => {

        var data_stream_block = " "
        var device_class_icon = " "

        switch (device.class) {
          case 'hygrometer':
            console.log('hyrgo');
            data_stream_block = ` <div class='data_stream_block ${device.class}'><span id="data_stream_ui_block_${device.uid}">00</span>%</div>`
            // <ion-icon style="color:${device.color}"  onclick='App.state.change_view("hardware_viewer","${device.uid}")' name="water-outline"></ion-icon>
            device_class_icon = ` <div class="icon water" style="color:${device.color}"  onclick='App.state.change_view("hardware_viewer","${device.uid}")'> </div> `
            break;
          case 'thermometer':
            console.log('temp');
            data_stream_block = ` <div class='data_stream_block ${device.class}'><span id="data_stream_ui_block_${device.uid}">0.0</span>*C</div>`
            // <ion-icon style="color:${device.color}" onclick='App.state.change_view("hardware_viewer","${device.uid}")' name="thermometer-outline"></ion-icon> 
            device_class_icon = `<div class="icon thermometer" style="color:${device.color}"   onclick='App.state.change_view("hardware_viewer","${device.uid}")'> </div>  `
            break;
          case 'relay':
            console.log('relay');
            data_stream_block = ` <div class='data_stream_block ${device.class}'><span id="data_stream_ui_block_${device.uid}">state</div>`
            device_class_icon = ` <div class="icon power" style="color:${device.color}"  onclick='App.state.change_view("hardware_viewer","${device.uid}")'> </div> `
            break;
          case 'switch':
            console.log('switch');
            data_stream_block = ` <div class='data_stream_block ${device.class}'><span id="data_stream_ui_block_${device.uid}">state</div>`
            device_class_icon = ` <div class="icon toggle" style="color:${device.color}"  onclick='App.state.change_view("hardware_viewer","${device.uid}")'> </div> `
            break;
          default:
            break;
        }

        console.log(device);

        var button_inline_style = `
                height: 30px;
                width: 30px;
                margin: auto 0 auto auto;
                color:${device.color};
            `

        var device_html = `
              <div class="device_container hud">
                  ${data_stream_block}
                  <div>${device.nid}</div>
                  <div style="${button_inline_style}">
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

    //set time out to get last readings from each
    setTimeout(() => {
      console.log('starting');
      App.state.get_device_bank_last_readings()
    }, 300);

    return output

  },
  get_device_bank_last_readings: () => {
    return App.state.device_history.forEach(data => {
      console.log(data);
      //    
      if (data.deviceID) {

        console.log(data);
        var target_device = `data_stream_ui_block_${data.deviceID}`
        var last_reading = data.eventHistory[data.eventHistory.length - 1]
        document.querySelector(`#${target_device}`).innerHTML = last_reading[1]
      }

    });
  },
  render_target_hardware_viewer: () => {

    //get and set current target shape.
    App.state.find_hardware_by_uid(App.state._target_uid);
    // build html of history in table
    App.state.find_hardware_history(App.state._target_uid)
    //grab and place in viewer

    var viewer_html = ``
    var target_shape = App.state._target_shape;

    var master_data_bundle_array = []
    //remove data from date

    App.state._target_history.forEach(data_bundle => {
      master_data_bundle_array.push(data_bundle[1])
    });

    // calculate avrge
    // var total_avrg_data_bundle_array_length = master_data_bundle_array.length
    // var total_avrg_data_bundle_array_sum = total_avrg_data_bundle_array.reduce((a, b) => a + b)
    // var total_avrg = total_avrg_data_bundle_array_sum / total_avrg_data_bundle_array_length


    // calculate avrge of all readings
    var total_average = App.state.calc_total_average(master_data_bundle_array)
    // var calculate_avrg_all_array = master_data_bundle_array

    // var all_average_length = calculate_avrg_all_array.length
    // var all_average_sum = calculate_avrg_all_array.reduce((a, b) => a + b)
    // var total_avrg = all_average_sum / all_average_length

    // calculate the current delta
    var moving_delta = App.state.calc_moving_delta(master_data_bundle_array)
    // var calculate_Delta_array = master_data_bundle_array
    // var calculate_Delta_array_length = calculate_Delta_array.length
    // var calculate_Delta = calculate_Delta_array[calculate_Delta_array_length - 1] - calculate_Delta_array[calculate_Delta_array_length]

    //calculate 24 avrg
    var average_24H = App.state.calc_time_period_average( 86400000 , master_data_bundle_array)
    var average_1H  = App.state.calc_time_period_average( 3600000 , master_data_bundle_array)
    var average_6H  = App.state.calc_time_period_average( 21600000 , master_data_bundle_array)
    // var sample_rate_for_24h = 86400000 / App.state.settings.HARDWARE_SAMPLE_RATE
    // var calculate_24_avrg_array = master_data_bundle_array
    // var calculate_24_avrg_array_length = master_data_bundle_array.length
    // var calculate_24_avrg_sum = 0
    // for (let index = 0; index < sample_rate_for_24h; index++) {
    //   calculate_24_avrg_sum += calculate_24_avrg_array[calculate_24_avrg_array_length - index]
    // }
    // var calculate_24_avrg = calculate_24_avrg_sum / sample_rate_for_24h

    // test if its a sensor type
    if (App.state._target_shape.class === 'thermometer' || App.state._target_shape.class === 'hygrometer' ) {
        viewer_html = `
        <small>
          <a>Current Delta: ${calculate_Delta}</a> |          
          <a>1H Average: ${average_1H}</a> |
          <a>6H Average: ${average_6H}</a> |
          <a>24H Average: ${average_24H}</a> |
          <a>Average Total Reading: ${total_average}</a> |
          
        </small> 
        <div id="target_device_history_chart" style="height:350px;"></div>
      `
    }

    // test if its an event type
    if (App.state._target_shape.class === 'relay' || App.state._target_shape.class === 'swicth' ) {
        viewer_html = `
        Work in progress...
        to see history view raw data
      `
    }

    //render after the fact with a timetout
    // var data = App.state._target_history
    setTimeout(() => {
      App.state.build_current_target_history_chart()
    }, 300)

    return `
        ${App.state.render_nav_bar()}
        <a onclick="App.state.change_view('hardware_raw_data_viewer','${App.state._target_uid}')"> View Device Raw Data </a>
        <section id="hardware_settings">
            <fieldset>
                <legend><a href="#hardware_settings">#</a> Device Details: ${target_shape.nid} </legend>
                <div>${viewer_html}</div>
            </fieldset>
        </section>
        `
  },
  calc_moving_delta: (data_array)=>{
    var length = data_array.length - 1
    var length_less = data_array.length - 2
    return data_array[length_less] - data_array[length]
  },
  calc_total_average: (data_array)=>{

    // reduce array add at each steap
    var data_sum = data_array.reduce((a, b) => a + b)
    // divide sume by length of array
    return data_sum / data_array.length

  },
  calc_time_period_average: (Period_in_milliseconds,data_array)=>{

    var sample_rate_for_24h = Period_in_milliseconds / App.state.settings.HARDWARE_SAMPLE_RATE
    var calculate_24_avrg_sum = 0
    for (let index = 0; index < sample_rate_for_24h; index++) {
      calculate_24_avrg_sum += data_array[data_array.length - index  - 1]
    }

    return calculate_24_avrg_sum / sample_rate_for_24h


  },
  render_target_hardware_raw_data_viewer: () => {

    // build html of history in table
    App.state.find_hardware_history(App.state._target_uid)
    var raw_data_html_rows = ''
    App.state._target_history.forEach(data_bundle => {
      var html = `         
          <tr>
            <td>${data_bundle[0]}</td>
            <td>${data_bundle[1]}</td>
          </tr> 
          `
      raw_data_html_rows += html
    });



    return `
        ${App.state.render_nav_bar()}
        ${App.state._target_uid} Raw Data
        <table>
            
            <tbody>

              <tr>
                <th>Time Stamp</th>
                <th>Device Reading</th>
              </tr>
             
              ${raw_data_html_rows}
            
              </tbody>
          </table>

        `
  },
  render_settings: () => {

    var scale_options = ''
    switch (App.state.settings.SAMPLE_TEMP_SCALE) {
      case 'C':
        scale_options = `
            
            <option>- Pick a Scale -</option>
            <option selected >C (celcius)</option>
            <option>F (fahrenheit)</option>
            <option>K (kelvin)</option>
            
            `
        break;
      case 'F':
        scale_options = `
            
            <option>- Pick a Scale -</option>
            <option >C (celcius)</option>
            <option selected>F (fahrenheit)</option>
            <option>K (kelvin)</option>
            
            `
        break;
      case 'K':
        scale_options = `
            
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
            <a onclick="App.state.change_view('settings')">System Settings</a>  |
            <a onclick="App.state.change_view('device_bank')">Hardware Settings</a>
            <section id="general_setting">
              <fieldset>
                <legend><a href="#general_setting">#</a> General Settings</legend>
                <div>
                    <label for="system_settings_SYSTEM_NAME">System Name:</label>
                    <input type="text" id="system_settings_SYSTEM_NAME" value='${App.state.settings.SYSTEM_NAME}'>
                </div>

              </fieldset>

            </section>

            <section id="software_settings">
                <fieldset>
                    <legend><a href="#software_settings">#</a> Software Settings</legend>

                    <div>
                        <label for="system_settings_DATABASE">Database:</label>
                        <input type="text" id="system_settings_DATABASE" value='${App.state.settings.DATABASE}'>
                    </div>

                    <div>
                        <label for="system_settings_DATABASE_URL">Database URL:</label>
                        <input type="text" id="system_settings_DATABASE_URL" value='${App.state.settings.DATABASE_URL}'>
                    </div>

                </fieldset>

            </section>

            <section id="hardware_settings">
                <fieldset>
                    <legend><a href="#hardware_settings">#</a> Hardware Settings</legend>

                    <div>
                        <label for="system_settings_HARDWARE_SAMPLE_RATE">Hardware Sample Rate: Every</label>
                        <input type="number" id="system_settings_HARDWARE_SAMPLE_RATE" value='${App.state.settings.HARDWARE_SAMPLE_RATE}'>
                        milliseconds
                    </div>

                    <div>
                        <label for="system_settings_SAMPLE_TEMP_SCALE">Sample Tempurature Scale:</label>
                        <select id="system_settings_SAMPLE_TEMP_SCALE">
                            ${scale_options}
                        </select>
                    </div>

                </fieldset>
            </section>


            <div class="button_group right">
                <button class='danger'>Cancel</button>
                <button class='info'>Update</button>
            </div>


        `
  },
  render_settings_device_bank: () => {


    var output = `
              ${App.state.render_nav_bar()}
              <a onclick="App.state.change_view('settings')">System Settings</a>  |
              <a onclick="App.state.change_view('device_bank')">Hardware Settings</a>
              <div class='boards_content'>
             
            `

    var front_elemet_styles_boards = `
          display: flex;
          justify-content: left;
          align-items: center;
        `

    App.state.deviceBank.forEach(board => {
      var board_container
      var board_details = `
            <div class="board_details">
              <div style="${front_elemet_styles_boards}"> 
                <div class="icon microchip"  style="color:${board.color}" onclick='App.state.delete_hardware_from_deviceBank()'> </div>
                <span >${board.uid}</span>
              </div>
              <div style="margin: auto 0 auto auto;">
                <div class="icon delete" onclick='App.state.delete_hardware_from_deviceBank()'> </div>
                <div class="icon settings"  style="color:${board.color}" onclick='App.state.change_view("settings_target_hardware","${board.uid}")'> </div>
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
            data_stream_block = ''
            device_class_icon = `<div class="icon water" style="color:${device.color}"> </div>  `
            break;
          case 'thermometer':
            console.log('temp');
            data_stream_block = ''
            device_class_icon = `<div class="icon tempurature" style="color:${device.color}"> </div>   `
            break;
          case 'relay':
            console.log('temp');
            data_stream_block = ''
            device_class_icon = `<div class="icon power" style="color:${device.color}"> </div>   `
            break;
          case 'switch':
            console.log('temp');
            data_stream_block = ''
            // device_class_icon = `<ion-icon style="color:${device.color}" name="toggle-outline"></ion-icon>  `
            device_class_icon = `<div class="icon toggle" style="color:${device.color}"> </div> `
            break;
          default:
            break;
        }


        var button_inline_style = `
                color:${device.color};
            `

        var front_elemet_styles_devices = `
              display: flex;
              justify-content: center;
              align-items: left;
              margin: auto auto auto 0;
              paddding-left: .3rem;
            `

        var device_html = `
            <div class="device_container setting">
              <div style=" ${front_elemet_styles_devices}"> 
                <div class="icon toggle" style="color:${device.color};  padding-left: 13px;"> </div>
                <div style="color:${device.color};  margin: 4px;  ">${board.nid}</div>
              </div>
              <div style="margin: auto 0 auto auto;">
                <div class="icon delete"   style="${button_inline_style}" onclick='App.state.delete_hardware_from_deviceBank()'> </div>
                <div class="icon settings" style="${button_inline_style}" onclick='App.state.change_view("settings_target_hardware","${device.uid}")'> </div>
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

    return output + `</div>`



  },
  delete_hardware_from_deviceBank: () => {
    alert('wow watch what your doing')
  },
  render_target_hardware_settings: () => {

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
            <div class="button_group right">
                <button class='danger'>Cancel</button>
                <button class='info'>Update</button>
            </div>
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
              <div class="button_group right">
                  <button class='danger'>Cancel</button>
                  <button class='info'>Update</button>
              </div>
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
                            <input type="text" id="example-input-text" value="${target_shape.nid}">
                        </div>
                        <div>
                            <label for="example-input-text">Relay ID:</label>
                            <input type="text" id="example-input-text" value="${target_shape.uid}">
                        </div>
                        <div>
                            <label for="example-input-text">Relay Color:</label>
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
                            <label for="example-select1">Relay Type:</label>
                            <select id="example-select1">
                                <option>- Pick Type -</option>
                                <option>NO (Normally Open)</option>
                                <option>NC (Normally Closed)</option>
                            </select>
                        </div>
        
                        <div>
                            <label for="example-input-text">Relay Pin:</label>
                            <input type="text" id="example-input-text" value="${target_shape.pin}">
                        </div>
        
                    </fieldset>
        
                </section>
                <div class="button_group right">
                    <button class='danger'>Cancel</button>
                    <button class='info'>Update</button>
                </div>
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
                              <input type="text" id="example-input-text" value="${target_shape.nid}">
                          </div>
                          <div>
                              <label for="example-input-text">Switch ID:</label>
                              <input type="text" id="example-input-text" value="${target_shape.uid}">
                          </div>
                          <div>
                              <label for="example-input-text">Switch Color:</label>
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
                              <label for="example-input-text">Switch Pin:</label>
                              <input type="text" id="example-input-text" value="${target_shape.pin}">
                          </div>
          
                      </fieldset>
          
                  </section>
                  <div class="button_group right">
                      <button class='danger'>Cancel</button>
                      <button class='info'>Update</button>
                  </div>
              
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
            <div class="button_group right">
                <button class='danger'>Cancel</button>
                <button class='info'>Update</button>
            </div>
            
            `
        break;
    }



    return `
        ${App.state.render_nav_bar()}  
        ${settings_html}
        `

  },
  render_nav_bar: () => {
    return `
        <header role="banner">
          <div>
            <img style='width:32px'src="./public/images/cortex.iot-brand-logo-mark-black.png" alt="">
          </div>
          <div>
            ${App.state._page_title}</div>
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
  render_modal: () => {

    // Get the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "block"

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

  },
  find_hardware_by_uid: (target_uid) => {
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
  find_hardware_history: (target_uid) => {

    return new Promise(resolve => {
      App.state.device_history.forEach(device => {
        if (device.deviceID === target_uid) {
          App.state._target_history = device.eventHistory
          resolve(App.state._target_history)
        }
      });
    });


  },
  build_device_history_chart: (data_bundle) => {
    // an array of objects used to defile the plylines
    let polyline_data_bundle = []
    let max_bundle_length = 0 // used to define the max width need for the chart

    let check_bundle_length = (data) => {

      if (data > max_bundle_length) {
        max_bundle_length = data
      }

    }


    let poly_line_bundle = {
      id: App.state._target_uid,
      data: '',
      color: 'rgb(68, 41 ,41)',
    }

    console.log(poly_line_bundle);

    // let device_data = device_bundle.data
    let data_bundle_string = ''
    //   let bundle_length = device_data.length
    data_bundle.forEach((data, i) => {
      let val = i + 1
      data_bundle_string = data_bundle_string + `${val},${data[1]} `
    });
    // console.log(data_bundle);
    poly_line_bundle.data = data_bundle_string //data_bundle to current poly_bundle
    polyline_data_bundle.push(poly_line_bundle)


    //for each item in the table array
    // data_bundle.forEach((device_bundle, i) => {

    //     // console.log(device_bundle.id);

    //     let device_poly_bundle = {
    //       id: device_bundle.id,
    //       data: [],
    //       color: getRandomRgb(),
    //     }


    //     //check if this is the longest data charset
    //     check_bundle_length(bundle_length)

    //     //push finished device_poly_bundle to master array
    //     polyline_data_bundle.push(device_poly_bundle)
    // });

    console.log("polylines: " + polyline_data_bundle);
    //POLYLINES BUNDLE BUILT AND READY TO USE


    //GRAB TARGET DOM TO RENDER INTO
    var instance_name = App.state.generateUID(8) //create a random id
    //   var target = document.querySelector(targetDOM) // get target div
    var target_height = '100%'
    var target_width = '100%'



    //traget target svg instance
    //   var target_svg_instance = document.querySelector(`#${instance_name}`)

    var svg_html_polylines = ''

    // for forEach array item place a polyline from data set
    polyline_data_bundle.forEach((set, i) => {
      var color = set.color
      var lineStyle = `fill:none;stroke:black;stroke-width:3"`
      var line_points = set.data
      var polyLine_shape = `
            <polyline id="${set.id}_graph_polyline" points="${line_points}" style="${lineStyle}"  />
          `
      svg_html_polylines += polyLine_shape
    });





    // //ADD TO DOM A SVG CONTAINER FOR CHART
    return `
            <svg
                height="${target_height}"
                width="${target_width}"
                id="${instance_name}"
                version="1.1"
                baseProfile="full"
                xmlns="http://www.w3.org/2000/svg"
                >
                ${svg_html_polylines}
            </svg>
        `



  },
  build_current_target_history_chart: () => {

    var target_shape = App.state._target_history;
    var new_data = []

    target_shape.forEach(bundle => {
      var object = {
        'date': new Date(bundle[0]),
        'value': bundle[1]
      }
      new_data.push(object)
    });

    am4core.useTheme(am4themes_animated);
    am4core.options.minPolylineStep = 5;

    var chart = am4core.create("target_device_history_chart", am4charts.XYChart);

    // var data = [];
    // var visits = 10;
    // for (var i = 1; i < 366; i++) {
    //   visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    //   data.push({ date: new Date(2018, 0, i), value: visits });
    // }

    chart.data = new_data;

    // var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.renderer.grid.template.location = 0;

    // var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.tooltip.disabled = false;
    // // valueAxis.renderer.minWidth = 35;

    // var series = chart.series.push(new am4charts.LineSeries());
    // series.dataFields.dateX = "date";
    // series.dataFields.valueY = "value";
    // series.tooltipText = "{valueY}";
    // series.tooltip.pointerOrientation = "vertical";
    // series.tooltip.background.fillOpacity = 0.5;

    // chart.cursor = new am4charts.XYCursor();
    // chart.cursor.snapToSeries = series;
    // chart.cursor.xAxis = dateAxis;

    // var scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"

    series.tooltip.pointerOrientation = "vertical";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

    //chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();

    new_data = null
    target_shape = null


  },
  save_general_settings: () => {


    var settings_bundle = {

      SYSTEM_NAME: document.querySelector(`#system_settings_SYSTEM_NAME`).value,
      DATABASE: document.querySelector(`#system_settings_DATABASE`).value,
      DATABASE_URL: document.querySelector(`#system_settings_DATABASE_URL`).value,
      HARDWARE_SAMPLE_RATE: document.querySelector(`#system_settings_HARDWARE_SAMPLE_RATE`).value,
      SAMPLE_TEMP_SCALE: document.querySelector(`#system_settings_SAMPLE_TEMP_SCALE`).value

    }


    console.log(settings_bundle);


    fetch('/update/settings/general', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings_bundle)
    }).then(res => console.log(res));


  },
  save_hardware_settings_hygrometer: () => {},
  save_hardware_settings_thermometer: () => {},
  save_hardware_settings_switch: () => {},
  save_hardware_settings_relay: () => {},
  generateUID: (length) => {
    return window.btoa("a" + Array.from(window.crypto.getRandomValues(new Uint8Array(length * 2))).map((b) => String.fromCharCode(b)).join("")).replace(/[+/]/g, "").substring(0, length);
  },
  change_view: (e, target_uid) => {
    App.state._to_render = e;
    App.state._target_uid = target_uid
    console.log('rendering: ' + App.state._to_render);
    return updateTree();
  },
  report: () => {
    console.log(App.state);
  },
  view_handler: () => {
    console.log(App.state._to_render);
    if (App.state._to_render === 'landing') {
      return App.state.render_landing()
    }
    if (App.state._to_render === 'dashboard') {
      App.state._page_title = 'Dashboard'
      App.state.stream_feed()
      return App.state.render_dashboard()
    }
    if (App.state._to_render === 'settings') {
      App.state._page_title = 'Setting'
      return App.state.render_settings()
    }
    if (App.state._to_render === 'hardware_viewer') {
      App.state._page_title = `${App.state._target_uid} Dash`
      return App.state.render_target_hardware_viewer()
    }
    if (App.state._to_render === 'hardware_raw_data_viewer') {
      App.state._page_title = `${App.state._target_uid} Raw`
      return App.state.render_target_hardware_raw_data_viewer()
    }
    if (App.state._to_render === 'device_bank') {
      App.state._page_title = `Device Bank`
      return App.state.render_settings_device_bank()
    }
    if (App.state._to_render === 'settings_target_hardware') {
      App.state._page_title = `${App.state._target_uid} Setting`
      return App.state.render_target_hardware_settings()
    }

  }

}

const updateTree = () => {
  document.querySelector(`body`).innerHTML = App();

  // a memory handler is need to keed data in ram lower
  // on data set larger than 25mb
  // setTimeout(() => {
  //   App.state._target_shape = null
  //   App.state._target_history = null
  // }, 10000);

};

App.state.get_system_settings();
App.state.get_device_bank();
App.state.get_device_history();

updateTree();