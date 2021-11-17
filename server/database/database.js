import mongoose from 'mongoose';
import config from '../../config/config';
import colors from 'colors';

export default function(){
    mongoose.connect(config.mongoDbUri, (err) => {
        if(err){
            console.log(`There was an error on database!!, Error: ${err}`.red);
        }

        console.log(`Database connected`.green);
    })
}