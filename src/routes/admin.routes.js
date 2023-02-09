'use strict'

const express = require('express');
const api = express.Router();
const adminController = require('../controllers/admin.controller');

//RUTAS PÚBLICAS

api.post('/login', adminController.login);

module.exports = api;
