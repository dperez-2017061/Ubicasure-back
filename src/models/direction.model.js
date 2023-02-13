'use strict'

const mongoose = require('mongoose');

const directionSchema = mongoose.Schema({
    latitude: Number,
    longitude: Number,
    message: String,
    time: String
});

module.exports = mongoose.model('Direction', directionSchema);