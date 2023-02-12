'use strict'

const Direction = require('../models/direction.model');

exports.createDirection = async (req, res) => {
    try {
        let params = req.body;
        let data = {
            latitude: params.latitude,
            longitude: params.longitude,
            message: params.message,
            type: params.type
        };

        let directions = await Direction.find()

        for(let direction of directions){
            if(direction.latitude == data.latitude && direction.longitude == data.longitude){
                return res.status(400).send({message: 'Ya existe un marcador en esta coordenada'})
            }
        }

        let direction = new Direction(data);
        await direction.save();

        setTimeout(async() => {
            await Direction.findOneAndDelete({ _id: direction._id });
        }, 7200000)

        return res.send({ message: 'Ubicación enviada satisfactoriamente', _id: direction._id});
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error creando ubicación' });
    }
}

exports.updateDirection = async (req, res) => {
    try {
        console.log('asdfasdfasdf')
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
        return res.send({message: 'Ubicación eliminada'})
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error eliminando estación' });
    }
}

exports.getDirections = async (req, res) => {
    try {
        let directions = await Direction.find()
            .lean()

        return res.send({ directions });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo estaciones' });
    }
}

