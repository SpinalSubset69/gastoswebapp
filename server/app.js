import express from 'express';
import devBundle from './devBundle';
import template from './../template';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import cors from 'cors';

const app = express();


//Webpack config for development stage
//comment thse lines in production mode
devBundle.compile(app);

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use('/api', authRouter);
app.use('/api', userRouter);

//Serve html content or React content
app.get('*', (req, res)=>{
    res.status(200).send(template());
})

export default app;