render_hardware = (hardware_config, data) => {
          //get render container
          var system_list_container = document.querySelector('.systemContainer')


          //sort by board
          hardware_config.forEach(board => {
            
            console.log(board.devices);

            //current board display container
            // basic template
            let board_dom_elements = `
              <span>${board.nid}</span>
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

              // console.log(device);

              let device_dom_elements = `
              <span class='deviceData' id='${device.id}_listViewData'>data</span> - <span class='deviceName'>${device.nid}</span>
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
