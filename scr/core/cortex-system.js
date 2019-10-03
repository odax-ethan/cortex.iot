
class System {
  constructor(systemConfig) {
    this.systemConfig = systemConfig;
    this.nodes = this.systemConfig.nodes

    const nodeConfig = this.systemConfig.nodes

    this.ports = []; // ports array that will be used to fill the j5 board
    this.nodeIDs = [] // create array of just node/port ids
    // fill ports[]
    for (var i = 0; i < nodeConfig.length; i++) {
      this.nodeIDs.push(this.nodes[i].id) // fill nodeIDs[]
      this.ports.push(this.nodes[i]) // fill ports[]
    }

    console.log("done building System Constructor");
  } // end of the constructor

  hello() {
    console.log("get out");
  }

  portConfig() {
    return this.ports
  }

  nodeIDs() {
    return this.nodeIDs
  }



} // end of Syetem Class



module.exports = { System };
