const fs = require("fs")
const path = require("path")

//copy all folder recursively
function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) fs.mkdirSync(to)
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}


//copy all files in cortex.iot node_module into project folder...
copyFolderSync('../cortex.iot', '../../')
// know issues this will pass a crazy looking package.json thats from npm