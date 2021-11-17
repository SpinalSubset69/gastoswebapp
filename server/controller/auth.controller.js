import { makeHttpError } from "../helpers/makeHttpError"
import { makeLogin } from "../factory/login.factory";
import { UserRepo } from "../repositories/user.repository";
import { makeJWT, verifyJWT } from "../helpers/jwtHandle";

const _userRepo = new UserRepo();


const authCtrl = {    
    signin: async (req, res) => {
        try{
            //Getand validate login info
            const loginInfoFromBody = req.body;
            //const validatedLoginInfo = makeLogin(loginInfoFromBody);

            //Verify if exists a user with the validatedLoginInfo emal
            const user = await _userRepo.GetUserByEmail(loginInfoFromBody.email);

            //Otherwise,validate password
            await _userRepo.ValidateUserPassword(user, loginInfoFromBody.password);

            //Generate token
            const token = await makeJWT(user);

            res.status(200).json({
                statusCode: 200,
                message: 'Signed In',
                token: token
            })

        }catch(e){
            makeHttpError(res, e);
        }
    },
    verifyToken: async (req, res)=> {
        try{
            const token = req.headers['x-access-token'];
            await verifyJWT(token);
            
            res.status(200).json({
                statusCode: 200,
                message:'JWT verified',
                access: true
            })
        }catch(e){
            makeHttpError(res, e);
        }
    }
}

export default authCtrl;