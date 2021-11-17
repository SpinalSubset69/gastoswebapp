import { InvalidData, RequiredParameterError } from "./errors";
import { NotFound } from "./errors";

/**
 * If theres any throw error we catch it withthis funtction
 * it response to the client with the error messahe and a valid status code
 * 
 * @param  {Object} res to make the response
 * @param {Exception} e to egt the errror message
 * @public
 */
export const makeHttpError = function(res, e){
    const status = e instanceof RequiredParameterError ? 404 : 
                   e instanceof NotFound ? 404 : 
                   e instanceof InvalidData ? 409 : 500;
                   
    res.json({
        statusCode: status,
        errorMessage: e.message
    })
}