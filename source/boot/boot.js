var figlet = require('figlet');


var introSplash = figlet.text('Cortex.iot', {
        font: 'Slant',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }, function(err, data) {
        if (err) {
            console.log();
            console.dir(err);
            return;
        }
        console.log(data);
        var subtitle = 'An Open-Source Hardware Network Framework \nCreated by Ethan Drory @ Odax Systems, LLC \nYour systems is now loading... Please hold.'
        console.log(subtitle);
    });
    

module.exports = { introSplash };