'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'Ubicasure';

exports.createToken = async(user)=>{
    try{
        let payload = {
            sub: user._id,
            username: user.username,
            password: user.password,
            name: user.name,
            role: user.role,
            iat: moment().unix(),
            exp: moment().add(2, 'hour').unix()
        }
        return jwt.encode(payload, secretKey);
    }catch(err){
        console.log(err);
        return err;
    }
}