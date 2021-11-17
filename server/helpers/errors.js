export class InvalidPropertyError extends Error{
    constructor(msg){
        super(msg);

        if(Error.captureStackTrace){
            Error.captureStackTrace(InvalidPropertyError);
        }
    }
}

export class RequiredParameterError extends Error{
    constructor(param){
        super(`${param} cannot be null or undefined`);

        if(Error.captureStackTrace){
            Error.captureStackTrace(RequiredParameterError);
        }
    }
}

export class InvalidData extends Error{
    constructor(msg){
        super(msg);

        if(Error.captureStackTrace){
            Error.captureStackTrace(InvalidData);
        }
    }    
}

export class NotFound extends Error{
    constructor(msg){
        super(`${msg} Not Found`);

        if(Error.captureStackTrace){
            Error.captureStackTrace(InvalidData);
        }
    }    
}