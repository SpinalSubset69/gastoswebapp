import app from './app';
import colors from 'colors';
import config from './../config/config';
import database from './database/database';


//Connect to database
database();

app.listen(config.port,() => {
    console.log('Server started'.green);
})