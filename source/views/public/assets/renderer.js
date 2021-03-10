// render a list of boards and their devices

function render_environment(params) {
    

    socket.emit('req GET_DEVICEBANK');
    socket.on('res GET_DEVICEBANK', (data) => {
        console.log('Got deviceBank');
        window.deviceBank = data.deviceBank
        // console.log(deviceBank);

        //place board and devices into ui
        deviceBank.forEach(board => {

            // console.log(board); 

            // create div to contain this board
            //give it an iv of board_${board.uid}
            
            var new_board = document.createElement('div')
            new_board.setAttribute('id', `board_${board.uid}`)
            new_board.setAttribute('class', 'cortex_board')
            
            var new_board_elements = document.createElement('div')
            //device the board ui shape
            new_board_elements.innerHTML = `board_${board.uid}`
            new_board_elements.setAttribute('class', 'cortex_board_elements')
            new_board.style.color = board.color;
            new_board.appendChild(new_board_elements)
        
            //for each board check if it has a device and build it out
            board.devices.forEach(device => {
                var new_device = document.createElement('div')
                new_device.setAttribute('id',`device_${board.uid}`)

                var data_style
                var data_inner_ele_text =''
                switch (device.class) {
                    case 'relay' || 'button':

                    data_style = `switch`

                        break;
                case 'hygrometer':
                   
                    data_style = `percent`
                    data_inner_ele_text = '%'

                break;

                case 'thermometer':
                   
                    data_style = `percent`
                    SAMPLE_TEMP_SCALE = settings.SAMPLE_TEMP_SCALE
                    data_inner_ele_text = ' *' + SAMPLE_TEMP_SCALE

                break;
                
                    default:
                        break;
                }

                // 


                //device the device ui shape
                new_device.innerHTML = `
                <a onclick='device_details()'>
                <div class="device_grid-container">
                <div class="device_data_block ${data_style}"><span id="data_stream_block_${device.uid}">null</span><span>${data_inner_ele_text}</span></div>
                <div class="device_details">device_${device.uid}</div>
                <div class="device_actions">
                <ion-icon name="beaker-outline"></ion-icon>
                </a>
                
                </div>
                </div>
                `
                
                
                new_device.setAttribute('class', 'cortex_device')
                new_device.style.color = device.color;
                new_board.appendChild(new_device)
            });
            
            //onces everything is built append it to devicebank container
            document.querySelector(`#deviceBank`).appendChild(new_board)
        });
        
        //when done place last data from db in place holders
        //place data into window so render device can access it for stats

    });


    socket.emit('req GET_ALL_HISTORY');
    socket.on('res GET_ALL_HISTORY', (history) => {
        console.log('Got all device history');
        window.history = history

        // document.querySelector(`#history`).innerHTML = JSON.stringify(history);
        // console.log(history);



        //place the last data recorded to connected devices
        history.forEach(data => {
            // console.log(data);
        //    
            if (data.deviceID) {
                
                // console.log(data);
                var target_device = `data_stream_block_${data.deviceID}`
                var least_reading = data.eventHistory[data.eventHistory.length - 1]
                document.querySelector(`#${target_device}`).innerHTML = least_reading[1]
            }

        });


        // console.log(history);
    });


}

render_environment()

