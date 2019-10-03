# Cortex.iot
a node.js/Javascript based iot infustructure

## Why?
Cortex.iot was build due to the frustration of building custom systems for iot infrastructure and UI.  

The goal was to build an system which could operate regardless of OS, Network, hardware configuration and has be accessible for entry level users but powerful enough to support any idea.

### Why does it have to be accessible to entry-level users, and what does that entail?
The main reason this system was built was to serve the agricultural industry.
An industry with an aging workforce and often located in remote areas, with limited access to a repairman. In short, systems build for this industry must be serviceable by the user on location. It must be able to work as an isolated system ie, offline.

It must not **require**  upkeep cost such as cloud storage etc. ( you can integrate that yourself ).  We also found a large % of users did have mobile devices (laptop/phone/ tablet) that can access/use a web browser.

For these reasons, cortex.iot is as a progressive web app (PWA) built on high-level languages, ie HTML , CSS and JS.  We use open-source protocols for as much of our underlying system as possible. We believe in access to documentation and communities that have the knowledge to help you even if it is not our own.

### Platform

Cortex.iot community is the underlying opensource system that makes up cortex.iot.


**Cortex.iot community**

1. This is the version of the cortex.iot system which ships with free with any hardware you buy from Odax Systems
2. It provides the basic functionality to config and run a multi nodes system + allows for timer based triggers + event based triggers
3. It does not include any integration for cloud based services.
4. Our standard basic analytics and system hub


**Cortex.iot**

1. Not officially released
2. Coming soon....we promise!
3. Check [Odaxsystems.com](odaxsystems.com) for updates
4. Follow us socials @odaxsystems


## How?
Two vs One.  It is worth noting that cortex.iot is one discrete stand alone system (web server + embedded hardware logic controller + frontend renderer + data base ).  Data flows directly to the sever via the Firmata Protocol from the hardware. All logic happens on the local server and is stored locally. The system can be interacted with via any web browser ( on your phone , computer, etc ) as long as you are on the local network.

This is in contrast to a system which has logic program each element of the system discretely ( embedded hardware, server, client, database ) in a different language.


## Parts
* [Johnny-five](johnny-five.io)
Johnny-five provides a robust API for working with Firmata and provides a wide range of devices/hardware
* [Socket.io](www.Socket.io)
Socket.io provides a flexible system for moving data between the client and server will they are connected.
* [Marko.js](www.markojs.com)
Marko.js built by EBay.com was our choice for front-end system due to ease of integration with Johnny—five.
* [Pouchdb](www.pouchdb.com)
Pouchdb has become an unexpected choice for use in cortex.iot but due to its ability to work anywhere node.js can without the need for another supporting system. Which has made it invaluable.
* [Bulma](bulma.io)
Bulma is the base for the css system with some new extra goodies. We use node-sass to build the css files. You can style your system any way you like.
* [Express.js](express.com) **check this correct url**
Express provides extra systems on to of the node http module which provide useful utility.

## Installation
All of cortex.iot systems can be installed via the same method on all os’s

1.  Install node.js
2. Check your installation worked
`$ node -v`
`$ npm -v`
3. Go to directory / folder you would like to place your cortex.iot system
4. Clone github directory **add github url**
5. Cd into new directory
6. `$ npm install`
7. `$ npm run start-cortex`
8. Go to IP address outputted in the terminal
(each cortex.iot system will self assign a unique ip upon connecting to a new network)

### Windows
No known complications

### Unix
No known complications but we do recommend using snap to install node.js

### OS X
No known complications



[⚗️](odax-ethan) [Ethan Drory](www.drorydesign.com) 

minor updates = 🔨
major update = 🔧
new feature = 🛠
