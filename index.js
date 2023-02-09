'use strict'

const mongoConfigs = require('./configs/mongoConfigs');
const app = require('./configs/app');
const adminController = require('./src/controllers/admin.controller');

mongoConfigs.init();
app.initServer();
adminController.createAdmin();