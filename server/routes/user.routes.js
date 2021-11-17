import { Router } from 'express';
import userCtrl from '../controller/user.controller';
import connectMultiparty from 'connect-multiparty';
import path from 'path';

const CURRENT_WORKING_DIR = process.cwd();

const md_upload = connectMultiparty({ uploadDir: path.join(CURRENT_WORKING_DIR, '/server/upload/images') });
const userRouter = Router();


userRouter.post('/user/createexpense', userCtrl.createExpense);
userRouter.post('/user/create', userCtrl.createUser);
userRouter.get('/user',userCtrl.getUser);
userRouter.delete('/user/deleteexpense/', userCtrl.removeExpense);
userRouter.post('/user/uploadimage/:id', md_upload, userCtrl.uploadImg);
userRouter.get('/user/getimg/:img', userCtrl.getImg);

export default userRouter;
