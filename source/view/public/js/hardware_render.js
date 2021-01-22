render_hardware = (hardware_config) => {
          //get render container
          var system_list_container = document.querySelector('.systemContainer')

          //sort by board
          hardware_config.forEach(board => {
            
            // console.log(board.devices);

            //current board display container
            // basic template
            let board_dom_elements = `
            <div class='board_panel' style='color:${board.color};'>
              <span class='board_title'>${board.nid}</span> <br/>
              <span>${board.port}</span>
            </div>
              
              
              
              
            `
            //place board container
            var board_dom_container = document.createElement("div");
            board_dom_container.setAttribute("id", `${board.id}`);
            board_dom_container.setAttribute("class", 'systemBoardContainer');
            board_dom_container.innerHTML = board_dom_elements
            system_list_container.appendChild(board_dom_container)

            //render top container 
            //board info
            board.devices.forEach(device => {

              console.log(device);

              // place buttons for override if its a relay device.class
              var relayButtons
              if (device.class === 'relay') {
                  relayButtons = `<button onclick='relay_on('${device.id}')'>on</button> <button onclick='relay_on('${device.id}')' >off</button> `
              } else {
                relayButtons = ' '
              }

              let device_dom_elements = `
              <div style="background-color:${device.color};">
              </div>
              <div>
                <span" class='deviceData' id='${device.id}_listViewData'>data</span>
              </div>
              <div>
                <span class='deviceName'>${device.nid}</span>
                ${relayButtons}
              </div>
              `
              
            
              //current device display container

              var device_dom_container = document.createElement("div");
              device_dom_container.setAttribute("id", `${device.id}`);
              device_dom_container.setAttribute("class", 'systemDeviceContainer');
              device_dom_container.innerHTML = device_dom_elements
              board_dom_container.appendChild(device_dom_container)
              
              

            });

          });


        }
