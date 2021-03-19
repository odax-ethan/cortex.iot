// const build_device_history_chart = (data_bundle ) => {


//     //PARSE DATA INTO COMPLETE POLYLINE BUNDLE

//     // an array of objects used to defile the plylines
//     let polyline_data_bundle = [ ]
//     let max_bundle_length = 0 // used to define the max width need for the chart

//     let check_bundle_length = (data) => {

//       if (data >  max_bundle_length) {
//           max_bundle_length = data
//       }

//     }


//     let polyline_data_bundle = {
//         id: device_bundle.id,
//         data: [],
//         color: getRandomRgb(),
//       }

//     // console.log(device_bundle.data);

//     // let device_data = device_bundle.data
//     let data_bundle = ''
//     //   let bundle_length = device_data.length
//     data_bundle.forEach((dat, i) => {
//             let val = i + 1
//             data_bundle = data_bundle + `${val},${data[1]} `
//       });
//       // console.log(data_bundle);
//       device_poly_bundle.data.push(data_bundle) //data_bundle to current poly_bundle
//       polyline_data_bundle.push(device_poly_bundle)


//     //for each item in the table array
//     // data_bundle.forEach((device_bundle, i) => {

//     //     // console.log(device_bundle.id);

//     //     let device_poly_bundle = {
//     //       id: device_bundle.id,
//     //       data: [],
//     //       color: getRandomRgb(),
//     //     }

       
//     //     //check if this is the longest data charset
//     //     check_bundle_length(bundle_length)

//     //     //push finished device_poly_bundle to master array
//     //     polyline_data_bundle.push(device_poly_bundle)
//     // });

//       console.log("polylines: " + polyline_data_bundle);
//       //POLYLINES BUNDLE BUILT AND READY TO USE


//       //GRAB TARGET DOM TO RENDER INTO
//       var instance_name = generateUID(8) //create a random id
//     //   var target = document.querySelector(targetDOM) // get target div
//       var target_height = '100%'
//       var target_width = '100%'



//       //traget target svg instance
//     //   var target_svg_instance = document.querySelector(`#${instance_name}`)

//       var svg_html_polylines =''
      
//       // for forEach array item place a polyline from data set
//       polyline_data_bundle.forEach((set, i) => {
//         var color = set.color
//         var lineStyle = `fill:none; stroke:${color}; stroke-width:.5; stroke-linecap:"round"; `
//         var line_points = set.data
//         var polyLine_shape =`
//             <polyline id="${set.id}_graph_polyline" points="${line_points}" style="${lineStyle} "  />
//           `
//           svg_html_polylines += polyLine_shape
//       });





//         //ADD TO DOM A SVG CONTAINER FOR CHART
//         return `
//             <svg
//                 height="${target_height}"
//                 width="${target_width}"
//                 id="${instance_name}"
//                 version="1.1"
//                 baseProfile="full"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 200 ${max_bundle_length} "
//             >
//                 ${svg_html_polylines}
//             </svg>
//         `


// }
