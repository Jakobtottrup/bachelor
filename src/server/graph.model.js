const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Graph = new Schema({
    graph_desc: {
        type: String
    },
    graph_time: {
        type: Array
    },
    graph_temp: {
        type: Array
    }

});


module.exports = mongoose.model('Graph', Graph);
