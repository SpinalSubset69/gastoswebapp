import requiredParamError from "../helpers/requiredParamError";
import  { InvalidPropertyError } from '../helpers/errors';

export const makeUser = function(userInfo = requiredParamError('User info')){
    const validatedUser = Validate(userInfo);
    return Object.freeze(validatedUser);
}

function Validate({
    username = requiredParamError('Username'),
    email = requiredParamError('Email'),
    password = requiredParamError('Password'),
    initialAmount = requiredParamError('Initial Amount')
}){
    ValidateUsername(username);
    ValidateEmail(email);
    ValidatePassword(password);
    ValidateInitalAmount(initialAmount);
    return {
        username, email, password, initialAmount
    }
}

function ValidateUsername(username){
    if(username.length <= 3){
        throw new InvalidPropertyError('Username must be at least 4 characters');
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

function ValidateInitalAmount(initialAmount){
    if(initialAmount <= 0){
        throw new InvalidPropertyError('Initial amount cannot be 0 or less than 0');
    }
}
