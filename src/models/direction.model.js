'use strict'

const mongoose = require('mongoose');

const directionSchema = mongoose.Schema({
    latitude: Number,
    longitude: Number,
    message: String,
    type: String
});

module.exports = mongoose.model('Direction', directionSchema);