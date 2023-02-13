'use strict'

const Direction = require('../models/direction.model');
const moment = require('moment');

exports.createDirection = async (req, res) => {
    try {
        let params = req.body;
        let data = {
            latitude: params.latitude,
            longitude: params.longitude,
            message: params.message,
            time: moment().format()
        };

        let directions = await Direction.find()

        for (let direction of directions) {
            if (direction.latitude == data.latitude && direction.longitude == data.longitude) {
                return res.status(400).send({ message: 'Ya existe un marcador en esta coordenada' })
            }
        }

        let direction = new Direction(data);
        await direction.save();

        return res.send({ message: 'Ubicación enviada satisfactoriamente', direction: direction });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error creando ubicación' });
    }
}

exports.updateDirection = async (req, res) => {
    try {
        let idD = req.params.idD
        let params = req.body;
        let data = {
            latitude: params.latitude,
            longitude: params.longitude
        };

        let directionExist = await Direction.findOne({ _id: idD });
        if (!directionExist) return res.status(400).send({ message: 'Error actualizando ubicación' });

        let directionUpdate = await Direction.findOneAndUpdate({ _id: idD }, data);

        return res.send({ directionUpdate });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error creando ubicación' });
    }
}

exports.deleteDirection = async (req, res) => {
    try {
        let directionId = req.params.idD;

        let directionExist = await Direction.findOne({ _id: directionId });
        if (!directionExist) return res.status(400).send({ message: 'Dirección no encontrada' });

        await Direction.findOneAndDelete({ _id: directionId });
        return res.send({ message: 'Ubicación eliminada' })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error eliminando estación' });
    }
}

exports.getDirections = async (req, res) => {
    try {
        let directions = await Direction.find()
            .lean()
        var cond = false;
        for (let direction of directions) {
            if (moment(direction.time).diff(moment(), 'hours') >= 2) {
                await Direction.findOneAndDelete({ _id: direction._id })
                cond = true
            }
        }

        return res.send({ directions });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo estaciones' });
    }
}

exports.getDirection = async (req, res) => {
    try {
        let directionId = req.params.idD
        let direction = await Direction.findOne({_id: directionId}).lean()

        return res.send({ direction });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo estaciones' });
    }
}

