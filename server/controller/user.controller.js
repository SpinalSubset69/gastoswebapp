import { makeHttpError } from "../helpers/makeHttpError";
import { makeExpense } from "../factory/expense.factory";
import { makeUser } from "../factory/user.factory";
import { UserRepo } from "../repositories/user.repository";
import { makeJWT, verifyJWT } from "../helpers/jwtHandle";
import { getImage } from "../helpers/handleUploadedFiles";

const _userRepo = new UserRepo();

const userCtrl = {
  createExpense: async (req, res) => {
    try {
      //Get token from request
      const token = req.headers["x-access-token"];
      const decoded = await verifyJWT(token);

      //Get id from params and expense info from boyd
      const expenseInfo = req.body;

      //Validate expense data
      const expenseValidated = makeExpense(expenseInfo);

      //Add Data to the user
      const updatedUser = await _userRepo.AddExpenseToUser(
        decoded.id,
        expenseValidated
      );

      res.status(200).json({
        statusCode: 200,
        message: "Expense Added",
        data: updatedUser,
      });
    } catch (e) {
      makeHttpError(res, e);
    }
  },
  removeExpense: async (req, res) => {
    try {
      //get token and verify it
      //Get token from request
      const token = req.headers["x-access-token"];
      const decoded = await verifyJWT(token);

      //gets expense id from body
      const expenseId = req.body.expenseId;      

      const user = await _userRepo.RemoveExpense(decoded.id, expenseId);

      res.status(200).json({
        statusCode: 200,
        message: "Expense removed",
        data: user,
      });
    } catch (e) {
      makeHttpError(res, e);
    }
  },
  createUser: async (req, res) => {
    try {
      //Get Data from body an then validate it
      const userFromBody = req.body;
      const validatedUser = makeUser(userFromBody);

      //Save user on db
      const user = await _userRepo.CreateUser(validatedUser);

      //Generate token
      const token = await makeJWT(user);

      res.status(200).json({
        statusCode: 200,
        message: "User saved on db",
        data: user,
        token: token,
      });
    } catch (e) {
      makeHttpError(res, e);
    }
  },
  getUser: async (req, res) => {
    try {
      const token = req.headers['x-access-token']
      const decoded = await verifyJWT(token);

      const user = await _userRepo.GetUserById(decoded.id);

      res.status(200).json({
        statusCode: 200,
        message: "User Found",
        data: user,
      });
    } catch (e) {
      makeHttpError(res, e);
    }
  },
  uploadImg: async (req, res) => {
    try {      
      const userId = req.params.id;
      const file = req.files.file;

      const user = await _userRepo.SaveImageName(userId, file);

      res.status(200).json({
        statusCode: 200,
        message: 'Image uploaded',
        data: user
      });
    } catch (e) {
      makeHttpError(res, e);
    }
  },
  getImg: (req, res)=> {
    try{
      const imgName = req.params.img;
      const img = getImage(imgName);
      res.status(200).sendFile(img);
    }catch(e){
      makeHttpError(res, e);
    }
  }
};

export default userCtrl;
