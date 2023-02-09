'use strict'

const jwt = require('../services/jwt');
const Admin = require('../models/admin.model');
const { validateData, encrypt, checkPassword } = require('../utils/validate');

exports.createAdmin = async(req,res)=>{
    try{
        let data ={
            name: 'Daniel Pérez',
            username: 'SuperAdmin',
            password: await encrypt('123456'),
            role: 'ADMIN'
        }

        let adminExist = await Admin.findOne({username: data.username});
        if(adminExist){}else{
            let admin = new Admin(data);
            await admin.save();
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error creando admin'}) ;
    }
};

exports.login = async(req,res)=>{
    try{
        let params = req.body;
        let data = {
            username: params.username,
            password: params.password
        };
        
        let msg = validateData(data);
        if(msg) return res.status(400).send(msg);
        let adminExist = await Admin.findOne({username: params.username});

        if(adminExist && await checkPassword(params.password, adminExist.password)){
            let token = await jwt.createToken(adminExist);
            delete adminExist.password;

            return res.send({token, user:adminExist, message: 'Sesión iniciada satisfactoriamente'});
        }else return res.status(401).send({message: 'Credenciales inválidas'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error iniciando sesión'});
    }
};