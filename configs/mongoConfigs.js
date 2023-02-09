'use strict'

const mongoose = require('mongoose');

exports.init = ()=>{

    const uriMongo = 'mongodb+srv://23002455:zWUcMDJkYXMkgMzi@invento.jwucml5.mongodb.net/?retryWrites=true&w=majority';
    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', ()=>{
        console.log('MongoDB | could not connect to mongodb');
        mongoose.disconnect();
    });
    mongoose.connection.on('connecting', ()=>{
        console.log('MongoDB | trying to connect');
    });
    mongoose.connection.on('connected', ()=>{
        console.log('MongoDB | connected to mongodb');
    });
    mongoose.connection.once('open', ()=>{
        console.log('MongoDB | connected to the database');
    });
    mongoose.connection.on('reconnected', ()=>{
        console.log('MongoDB | reconnected to mongodb');
    });
    mongoose.connection.on('disconnected', ()=>{
        console.log('MongoDb | disonnected');
    });
    mongoose.connect(uriMongo, {
        maxPoolSize: 15,
        connectTimeoutMS: 2500,
        useNewUrlParser: true
    }).catch(err=>console.log(err));
};