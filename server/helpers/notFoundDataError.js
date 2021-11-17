import { NotFound } from "./errors";

export default function(param){
    throw new NotFound(param);
}