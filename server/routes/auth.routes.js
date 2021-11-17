import { Router } from "express";
import authCtrl from "../controller/auth.controller";

const authRouter = Router();

authRouter.post('/auth/signin', authCtrl.signin);
authRouter.post('/auth/verifytoken', authCtrl.verifyToken);

export default authRouter;