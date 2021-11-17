import requiredParamError from "../helpers/requiredParamError"
import { InvalidPropertyError } from "../helpers/errors"

export const makeLogin = function(loginInfo = requiredParamError('Login info')){
    const validatedLoginInfo = Validate(loginInfo);
    return Object.freeze(validatedLoginInfo);
}


function Validate({
    email = requiredParamError('Email'),
    password = requiredParamError('Password')
}){
    ValidateEmail(email);
    ValidatePassword(password);
    return {
        email, password
    }
}

function ValidateEmail(email){
    const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    if(!valid.test(email)){
        throw new InvalidPropertyError('Insert a valid email (example@example.com)');
    }
}

function ValidatePassword(password){
    const valid = new RegExp(/^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[A-Z]){1})(?=(?:.*[@!#$%^&*-]){1})\S{8,16}$/);
    if(!valid.test(password)){
        throw new InvalidPropertyError('Password must contain at leas: 1 uppercase, 1 especial character and a length minimum of 8 up to 16');
    }
}