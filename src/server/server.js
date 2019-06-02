const moment = require('moment');
moment.locale('da');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');
const wemosRoutes = express.Router();
const graphRoutes = express.Router();
const mqtt = require('mqtt');
let reset_counter = 0;
let test;

const client = mqtt.connect('http://m24.cloudmqtt.com', {
    username: 'gkgwyttl', password: 'ibrG41LP45I3', port: 16711, keepalive: 15, will: {
        topic: 'esp/test2',
        payload: new Buffer('RESTART') // Payloads are buffers
    }
});


let Wemos = require('./wemos.model');
let Graph = require('./graph.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://jvt:jvt123@ds361085.mlab.com:61085/optek_bachelor', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log('MongoDB database connection established successfully');
});

wemosRoutes.route('/').get(function (req, res) {
    Wemos.find(function (err, wemos) {
        if (err) {
            console.log(err);
        } else {
            res.json(wemos);
        }
    });
});
wemosRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Wemos.findById(id, function (err, wemos) {
        res.json(wemos);
    });
});
wemosRoutes.route('/update/:id').post(function (req, res) {
    Wemos.findById(req.params.id, function (err, wemos) {
        if (!wemos)
            res.status(404).send('data not found');
        else
            wemos.wemos_description = req.body.wemos_description;
        wemos.wemos_owner = req.body.wemos_owner;
        wemos.wemos_id = req.body.wemos_id;
        wemos.wemos_active = req.body.wemos_active;

        wemos.save().then(wemos => {
            res.json('Wemos updated');
        })
            .catch(err => {
                res.status(400).send('Update failed');
            });


    });
});
wemosRoutes.route('/add').post(function (req, res) {
    let wemos = new Wemos(req.body);
    wemos.save()
        .then(wemos => {
            res.status(200).json({'wemos': 'wemos added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new wemos failed');
        });
});

graphRoutes.route('/').get(function (req, res) {
    Graph.find(function (err, graph) {
        if (err) {
            console.log(err);
        } else {
            res.json(graph);
        }
    })
});
graphRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Graph.findById(id, function (err, graph) {
        res.json(graph);
    });
});
graphRoutes.route('display_profile/:id').get(function (req, res) {
    let id = req.params.id;
    Graph.findById(id, function (err, graph) {
        res.json(graph);
    });
});
graphRoutes.route('/record').post(function (req, res) {
    let graph = new Graph(req.body);
    graph.save()
        .then(graph => {
            res.status(200).json({'graph': 'graph recording successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new graph failed');
        });
});
graphRoutes.route('/update/:id').post(function (req, res) {
    Graph.findById(req.params.id, function (err, graph) {
        if (!graph)
            res.status(404).send('graph data not found');
        else
            graph.graph_desc = req.body.graph_desc;
        graph.graph_time = req.body.graph_time;
        graph.graph_temp = req.body.graph_temp;

        graph.save().then(graph => {
            res.json('Graph updated');
        })
            .catch(err => {
                res.status(400).send('Graph update failed');
            });
    })
});
graphRoutes.route('/display_profile/:id').post(function (req, res) {
    let temp = req.body.temp;
    let time = req.body.time;
    sendProfile(temp);
});

client.on('connect', function () {
    client.subscribe('esp/test1', function (err) {
        if (!err) {
            client.publish('esp/test1', 'NodeServer connected to mqtt broker!');
            client.publish('esp/test2', 'test2 connected');

            console.log("Connection status: " + client.connected);

        }
    })
});
client.on('offline', function () {
    if (!client.connected) {
        console.log("reconnecting.");
        reset_counter++;
        client.publish('esp/test2', 'RESTART');
        client.reconnect();
    }

});

let temp;
let frequency = 100;

let temp_data = [];
let temp_arr = [];

let newMsg = new moment();
let oldMsg = newMsg;
let duration = 0;

client.on('message', function (topic, message) {
    oldMsg = newMsg;
    newMsg = new moment();

    duration = moment.duration(newMsg.diff(oldMsg)).as("seconds");
    console.log("Duration since last message: " + duration + " seconds.");

    if (message.toString() !== "") {
        if (message.toString() === "RS_1") {
            reset_counter++;
        }
        if (message.toString() === "RELAY OFF") {
            console.log("relay off");
        } else {
            temp = parseFloat(message);
            if (topic === 'esp/test1') {
                if (temp > 0) {
                    temp_arr.push(temp);
                    temp_data.push({"Time": moment().format("LT"), "Temp": temp});
                }
                if (temp_data.length % frequency === 0) {
                    console.log("Data points: " + temp_data.length);
                    console.log(temp_data);
                }
                if (reset_counter > 0) {
                    console.log("Reset counter: " + reset_counter);
                }
                console.log("Temperature: " + parseFloat(message.toString()));


            }
        }
    }
});

app.get('/graphdata', (req, res) => res.json(temp_arr));


app.use('/wemos', wemosRoutes);
app.use('/graph', graphRoutes);


app.listen(PORT, function () {
    console.log('Server started on port: ' + PORT);
});

async function sendProfile(temp){
    for (let i = 0; i < temp.length; i++) {
        let val = temp[i].toString();
        await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](60000); // 60 sec
        client.publish('esp/test3', val, {qos: 2});
    }
}
