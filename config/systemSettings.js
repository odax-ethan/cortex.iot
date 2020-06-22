
// different between systemPreSetting and systemConfig
// configure is underlying settings to get system started
// systemPreSetting are supporting settings used to get a system up and running faster


const systemSettings  = {

  ////////////////////////////////////////////////////////////////////////////////
  // General Settings
  ////////////////////////////////////////////////////////////////////////////////


  environmentName  :  'GROW338',
  adminName  :  'Ethan',

  ////////////////////////////////////////////////////////////////////////////////
  // coordinates
  ////////////////////////////////////////////////////////////////////////////////

  // change to your local coordinates

  // this info is stored locally and not shared with anyone.
  // except when requesting data about your location from a service at YOUR request

  coordinates : {
        lat: 42.3601,
        long: -71.0589,
  },

  ////////////////////////////////////////////////////////////////////////////////
  // first start
  ////////////////////////////////////////////////////////////////////////////////

  // if TRUE first_start will promt set up from code templeted in this file
  // other wise system will fetch save config from local database

  first_start : true,

  // OPTIONS:
  // 'always' =  regardless of first_start's state act as if its first_start
  // 'production' = next start from first first_start being set to true will be a frest install.

  first_start_option : 'always',

  // UTC OFSET
  // This will set time in your data set to your local timeout

   utcOffSet : -5


}



module.exports = {systemSettings};
