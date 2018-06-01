import config from '../config/index';
import jwt from 'jsonwebtoken';

let Jwt = {};

Jwt.getToken = (payload) => {
    const token = jwt.sign(payload, config.secret ,{
        expiresIn: 20000
    });
    return token;
};

export default Jwt;

