const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Wemos = new Schema({/*
    wemos_description: "",
    wemos_owner: "",
    wemos_id: "",
    wemos_active: false*/
    wemos_description: {
        type: String
    },
    wemos_owner: {
        type: String
    },
    wemos_id: {
        type: String
    },
    wemos_active: {
        type: Boolean
    }

});


module.exports = mongoose.model('Wemos', Wemos);
