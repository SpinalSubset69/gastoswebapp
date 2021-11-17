import context from "./../models/user.model";
import requiredParamError from "../helpers/requiredParamError";
import notFoundDataError from "../helpers/notFoundDataError";
import mongoose from "mongoose";
import { InvalidData } from "../helpers/errors";
import { handleFile, getFileName } from "../helpers/handleUploadedFiles";

export class UserRepo {
  constructor() {}

  /**
   * Creates a new User on db
   *
   * @param {UserInfo} UserInfo
   * @returns {user} returns the saved user
   * @public
   */
  CreateUser = async (userInfo = requiredParamError("User info")) => {
    const user = new context(userInfo);
    user.password = await user.EncryptPassword(user.password);
    return await user.save({ new: true });
  };

  /**
   * Looks for an user based on the email given
   * if theres no user with the email
   * throws a NotFoundDataError
   *
   * @param {email} email A valid Email
   * @returns {user} returns a user from the db
   * @public
   */
  GetUserByEmail = async (email = requiredParamError("Email ")) => {
    const user = await context.findOne({ email: email });
    if (!user) {
      throw new notFoundDataError("User");
    }
    return user;
  };

  GetUserById = async (id = requiredParamError("Id")) => {
    const _id = mongoose.Types.ObjectId(id);
    const user = await context.findById(_id, { password: 0, salt: 0 });
    if (!user) {
      throw new notFoundDataError("User");
    }
    return user;
  };


   /**
   * Compare both password from body and password on db
   * @param {user} user to compare password
   * @param {string} password id of the user
   * @returns {boolean} returns true if passwords are the same
   * @public
   */
  ValidateUserPassword = async (user, password) => {
    const isValidPasword = await user.ComparePassword(password);

    if(!isValidPasword){
      throw new InvalidData('Password dont match');
    }

    return isValidPasword;
  }

  /**
   * Looks for an user based on the email given
   * if theres no user with the email
   * throws a NotFoundDataError
   *
   * @param {string} id id of the user
   * @param {expense} expense A valid expense
   * @returns {user} returns the updated user with the new expense
   * @public
   */
  AddExpenseToUser = async (
    id = requiredParamError("Id"),
    expense = requiredParamError("Expense")
  ) => {
    //Fetch user from Db
    const userFromDb = await this.GetUserById(id);

    //Add expense then calculate current spent amount
    userFromDb.AddExpense(expense);
    userFromDb.CalculateCurrentSpentAmount();

    //Save Changes
    await userFromDb.save({ new: true });

    return userFromDb;
  };

    /**
   * Looks for an user based on the id given in the params
   * if theres no user with the id
   * throws a NotFoundDataError, if theres a user
   * remove the expens if theres not expense with that id
   * dont make changes
   *
   * @param {string} userId id of the user
   * @param {string} expenseId id of the expense to remove
   * @returns {user} returns the updated user with the new expense
   * @public
   */
  RemoveExpense = async (userId, expenseId) => {    
    const userFromDb = await this.GetUserById(userId);
    userFromDb.RemoveExpense(expenseId);
    userFromDb.CalculateCurrentSpentAmount();
    return await userFromDb.save({ new: true });
  }

  SaveImageName = async (userId = requiredParamError('User Id'), file) => {
    //Validate file its an image
    handleFile(file);

    //Get image name as saved on the backend
    const imageName = getFileName(file.path);

    const user = await this.GetUserById(userId);

    user.SaveImageName(imageName);

    return await user.save({ new : true});
  }
}
