'use strict'

const adminRoutes = require('../src/routes/admin.routes');
const directionRoutes = require('../src/routes/direction.routes');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3200;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/admin', adminRoutes);
app.use('/direction', directionRoutes);

exports.initServer = ()=> app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});