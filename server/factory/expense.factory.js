import requiredParamError from "../helpers/requiredParamError";
import  { InvalidPropertyError } from '../helpers/errors';

export const makeExpense = function(expenseInfo = requiredParamError('Expense info')){
    const validatedExpense = Validate(expenseInfo);
    return Object.freeze(validatedExpense);
}

function Validate({
    title = requiredParamError('Title'),
    amount = requiredParamError('Amount'),
    description = requiredParamError('Description')
}){
    ValidateTitle(title);
    ValidateAmount(amount);
    ValidateDescription(description);

    return {
        title, amount, description
    }
}

function ValidateTitle(title){
    if(title.length <= 2){
        throw new InvalidPropertyError('Title must be at least 3 characters');
    }
}

function ValidateAmount(amount){
    if(isNaN(amount)){
        throw new InvalidPropertyError('Must provide a number!!');
    }

    if(amount <= 0){
        throw new InvalidPropertyError('Amount cannot be 0 or less than 0');
    }
}

function ValidateDescription(description){
    if(description.length <= 2){
        throw new InvalidPropertyError('Description must be at least 3 characters');
    }
}