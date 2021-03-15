const App = function _App() {
    return App.state.view_handler()
  };



  App.state = {
      _to_render: 'landing',
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
            <h1>Dashboard</h1>
            
            <a onclick="App.state.change_view('settings')">Settings<a>
        `
      },
      render_settings: ()=>{
        return `
            <h1>Setting</h1>
           
            <a onclick="App.state.change_view('dashboard')">Dashboard<a>
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
