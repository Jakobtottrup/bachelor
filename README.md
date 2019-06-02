# Learning and Experience Technology Bachelor project 2019

## by Jakob Tøttrup

<br>
<br>

## Installation instructions

#### prerequisites:
Working node.js + npm installation.

<br><br>

Step 1: In the project directory, run:

### `npm install`

Installs required libraries and node_modules. 

<br>

Step 2: In the /src directory, run:
### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


Step 3: In the /src/server directory, run:
### `node server.js`

<br>
Note the real-time data visualization is based on data sent by the Wemos microcontroller.
To simulate this, it is possible to use the MQTTLens chrome app:<br> 
https://chrome.google.com/webstore/detail/mqttlens/hemojaaeigabkbcookmlgmdigohjobjm?hl=da
<br> <br>
Once installed, add a new connection with the following details:

Connection name: any name works here <br>
Hostname: tcp://	m24.cloudmqtt.com <br>
port: 16711 <br>
Clean session and Automatic connection should both be enabled.<br>
Keep Alive: 120 seconds

Username/Password: See the README.txt supplied in the folder uploaded on blackboard.


Data can take up to a minute to appear in the real-time graph. A suggestion would be to keep the terminal window running the node server open to confirm the webserver received the data.

Demonstration video: https://www.youtube.com/watch?v=bDondeydFxA <br>
Profile comparison recording video: https://www.youtube.com/watch?v=r-Q_5xuyQak
