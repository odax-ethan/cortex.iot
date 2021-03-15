const App = function _App() {
    return App.state.view_handler()
};



App.state = {
      _to_render: 'landing',
      _to_render_stream: false,
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
        var val = 0
        setInterval(() => {
        
            // data = `<div class='data_stream_feed_element'></div>`
            let _new = document.createElement('div')
            _new.setAttribute('class','data_stream_feed_element') 
            _new.innerHTML = `[${val}][datastream][id][state][data]`
            let target = document.querySelector('.data_stream_feed')
            // console.log(target);
            target.prepend(_new)
            val += 1
        }, 500);
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
            ${App.state.render_stream()}
        `
      },
      render_settings: ()=>{
        return `
            ${App.state.render_nav_bar()}           
        `
      },
      render_nav_bar: () =>{
        return `
        <header role="banner">
            <h1>${App.state._to_render}</h1>
            <small>
            <a onclick="App.state.change_view('dashboard')">Dashboard</a> |
            <a onclick="App.state.change_view('settings')">Settings</a>
            </small> 
            <br><br>
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

  updateTree();
