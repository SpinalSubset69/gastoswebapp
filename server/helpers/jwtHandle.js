import requiredParamError from "./requiredParamError"
import jwt from 'jsonwebtoken';
import config from "../../config/config";

export const makeJWT = async ( userinfo = requiredParamError('User Info')  )=>{
    return await jwt.sign({id: userinfo._id }, config.jwtSecret, {
        expiresIn: 60 * 15
    })
}

export const verifyJWT = async (token)  => {
    return await jwt.verify(token, config.jwtSecret);
}