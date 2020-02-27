// load in coretx express app
const {startCortexApp} = require('./source/core/cortex.express');
//load in cortex j5.js tooling
const {startCortexHardware} = require('./source/core/cortex.j5');

startCortexApp() // start full cortex
startCortexHardware() // start full cortex hardware
