

function render_cycacle_viewer(target_uid,data_set) {
    //benchmark start

    let benchmark_start = new Date()

    // set up viewer
    let svg = document.querySelector(`#cycacle_visual_${target_uid}`)
    let view_container = document.querySelector(`#view_container_${target_uid}`)
    let view_controller = document.querySelector(`#view_container_controller_${target_uid}`)
    let html = '' //svg html output 
    
    // get number of cycles
    let cycles_count = parseInt(document.querySelector(`#view_container_controller_${target_uid} #number_of_cycles_input`).value)
    //get number of readings
    let readings_count = parseInt(document.querySelector(`#view_container_controller_${target_uid} #readings_an_hour_input`).value)
    
    console.log(view_container);
    let current_view_width =  view_container.style.width 
    let current_view_height = view_container.style.height 
    
    svg.setAttribute('height', current_view_height); //set view height
    svg.setAttribute('width', '100%');  //set view width
    svg.setAttribute('viewBox',"0 -55 1445 150") // set points in svg viewer
    svg.offsetWidth = current_view_width;
    svg.offsetHeight = current_view_height;

    
    // generatalize each step position
    let reading_steps = min_in_day / readings_count
    let current_x_position = 0

    // manage oppacity
    let current_oppacity = 0
    // console.log(current_oppacity);

    let mean_array = []
 
    // for each cycle in the data set 
    data_set.forEach((bundle, data_set_key) => {
        // handle date and time timestamp
        //  console.log(data_set_key);
        
         
         let current_data = bundle[1]; // complete time stamp
         let current_day //track the current day being handled
         let current_poliline = '' // contain the current line for the current day as its being built
         let output_html = '' // output 



         //for the current day 
         current_data.forEach((data, key) => {

            let data_reading = data[1]
            let full_date = data[0]
            let date_time_sections = full_date.split("T"); // split date and time
            let date = date_time_sections[0] //current reading date
            let time_n_zone = date_time_sections[1] // crrent reading full time
            let  time_n_zone_sections = time_n_zone.split("."); // split date and time
            let time = time_n_zone_sections[0] //current time 
            let time_zone = time_n_zone_sections[1] //current times time zone iso offset
            


            // handle time sections
            let time_sections = time.split(":") //split time sections at the ":"
            let hour =  time_sections[0] // the hour for this current reading
            let minute =  time_sections[1] // the minute for this current reading

            // handle date sections

            // // check if its the first number
            // if (!current_day) {
            //     console.log('im first');
            //     current_day  = date
            // }

            // // check if its the same day
            // if (current_day) {
            //     console.log('next');
            // }

            // // check if its not the same days 
            // if (current_day != date ) {
            //     console.log('new day!');
            // }

            // handle device reading  ie the y postion
            reading = data_reading
            // console.log(reading);

            //next setp the x position
            current_x_position += reading_steps
                

            // bundle poliline export 
            let bundle_output = ` ${current_x_position},${reading}`  
            current_poliline += bundle_output

            // console.log(current_x_position);
            // console.log(data[1]);
        
            // reset current x position at the end of the cycle 
            if (key === readings_a_cycle - 1 ) {
                current_x_position = 0

                //net step current opacity
                current_oppacity = Math.pow( data_set.length -  data_set_key, -2)
                // console.log(current_oppacity);
                
                // second last number in series
                if (current_oppacity === 1) {
                    console.log('last value');
                }
               
                              
            }


            //create the average line
            if (!mean_array[key]) {
                mean_array.push(reading)
                // console.log(mean_array);
            }

            if (mean_array[key]) {
                mean_array[key] += reading
                // console.log(mean_array);
            }
        
        
        });



        output_html = `
                <polyline 
                    points="${current_poliline}"
                    style="fill:none;stroke:black;stroke-width:2;"
                    stroke-opacity="${current_oppacity}"
                    />
                    `
                
        html += output_html //place current finished poliline into the viewer



        
    });


    console.log(mean_array);
    mean_array.forEach((value,key) => {
        let new_value = value / readings_count
        mean_array[key] = new_value
        // value = new_value
    });

    let mean_array_poliline = ``
    let position_x = reading_steps
    console.log(position_x+4);
    for (let index = 0; index < readings_count; index++) {
        let bundle_output = ` ${position_x},${mean_array[index]}` 
        mean_array_poliline += bundle_output
        position_x += reading_steps
    }
    console.log(mean_array_poliline);
    // html += output_html
    // console.log(mean_array);

    svg.innerHTML = html;

    // console.log('done');
    let benchmark_stop = new Date()
    let benchmark_result = Math.abs(benchmark_start - benchmark_stop)
    console.log(benchmark_result);
    // end of render_cycacle_viewer
}