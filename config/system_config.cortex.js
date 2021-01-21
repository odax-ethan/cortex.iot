

// location nick name for data management 
// not required

const system_nick_name = 'HIGH338CityCaps';


// network options
// for local network access able set as -> '0.0.0.0'
// for only localhost access set as - 'localhost'
// host port - any open port on your device

const system_network = '0.0.0.0';
const system_port = 9090; //http services

// connect you to your goverments local weather services 
// check weather service for applicable api
// based on ISO ALPHA-3 Code 
// contries that are supported can be found here: 
// please help use expand our auto country weather services 

const system_location = {
    'alpha-3': 'USA',
    'options': {
        'long': 42.3601,
        'lat': 71.0589, 
    }
};



// database option
// system is primarily for pounchdb/couchdb
// set your db network location
// if local set as -> localhost

const system_db = 'POUCHDB';
const system_db_URL = 'localhost';


// embeded hardware master frequency
const system_master_freq = 30000;

// sensor reading temp standard 
// 'C' : celsius 
// 'F' : fahrenheit
// 'K' : kelvin
const system_reading_temp_standard = 'C';



// bundle config into object
const system_config = {
    system_nick_name, 
    system_port, 
    system_network, 
    system_location, 
    system_db, 
    system_db_URL,
    system_master_freq,
    system_reading_temp_standard
}

module.exports = { system_config };