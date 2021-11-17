import { RequiredParameterError } from "./errors";

export default function(param){
    throw new RequiredParameterError(param);
}