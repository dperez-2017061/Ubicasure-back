'use strict'

const express = require('express');
const api = express.Router();
const directionController = require('../controllers/direction.controller');
const mdAuth = require('../services/authenticated');

//RUTAS ADMIN

api.post('/createDirection', directionController.createDirection);
api.put('/updateDirection/:idD', directionController.updateDirection);

api.delete('/deleteDirection/:idD', directionController.deleteDirection);

//RUTAS CLIENT
api.get('/getDirections', directionController.getDirections);

module.exports = api;
