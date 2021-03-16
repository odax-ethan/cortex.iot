const App = function _App() {
    return App.state.view_handler()
};



App.state = {
      _to_render: 'landing',
      _to_render_stream: false,
      settings: null,
      deviceBank: null,
      get_device_bank: () =>{
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("/get/deviceBank", requestOptions)
          .then(response => response.text())
          .then((result) => {
            console.log(result)
            App.state.deviceBank = JSON.parse(result)
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

            // place ui elements in data stream container
            data = `<div class='data_stream_feed_element'></div>`
            let _new = document.createElement('div')
            _new.setAttribute('class','data_stream_feed_element') 
            _new.innerHTML = `${streamBundle.timestamp}[${streamBundle.deviceID}]: ${streamBundle.data}`
            let target = document.querySelector('.data_stream_feed')
            target.prepend(_new)
            

            //find the correct device and place data in data_stream_block
            var targetID = `data_stream_ui_block_${streamBundle.deviceID}`
            document.querySelector(`#${targetID}`).innerHTML = streamBundle.data


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
                <ion-icon name="options-outline"></ion-icon>
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
                    <ion-icon name="options-outline"></ion-icon>
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
        return `
            ${App.state.render_nav_bar()}           
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

  App.state.get_device_bank(); 
  updateTree();
