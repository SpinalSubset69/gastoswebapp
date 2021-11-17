import dotenv from 'dotenv';

//Gets .env Variables
dotenv.config();

const config = {
    port: process.env.PORT || 4000,
    mongoDbUri: process.env.MONGODB_URI || 'mongodb://localhost/plansdb',
    jwtSecret: process.env.JWT_SECRET  || '7a90cc2e956b89069dc681cbcdb46fcbd22f38a668530bb1c090bef95bc381a0'
}

export default config;