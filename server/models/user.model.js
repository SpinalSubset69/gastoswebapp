import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    }
}, { timestamps: true })

const UserSchema = new mongoose.Schema({
    username: {
        type:String        
    },
    email: {
        type:String,
        unique: true
    },
    password: {
        type: String
    },
    expenses:{
        type: [ExpenseSchema]
    },
    initialAmount: {
        type: Number
    },
    currentSpentAmount: {
        type: Number
    },
    currentTotalAmount: {
        type: Number
    },
    salt: {
        type: String
    },
    img : {
        type: String
    }
}, { timestamps: true });


/**
 * Push an Expense to the users expenses array
 *
 * @param {ExpenseSchema} Expense
 * @public
 */
UserSchema.methods.AddExpense = function(expense){
    this.expenses.push(expense);
}

/**
 * Filters the expenses array based on the Id provided through the body
 *
 * @param {String} Id of the expense to remove 
 * @public
 */
 UserSchema.methods.RemoveExpense = function(idExpenseFromBody){
    //Just filter the array to remove the expense
    this.expenses = this.expenses.filter(e => e._id != idExpenseFromBody);
}

/**
 * Generates a hashed password based on the salt
 *
 * @param {String} Plain password from body 
 * @public
 */
UserSchema.methods.EncryptPassword = async function(plain_password){
    this.salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(plain_password, this.salt);
    return hashed_password;
}

/**
 * Compares password from the body with hashed password on the database
 *
 * @param {String} Password from body 
 * @return {Boolean} True if passwords matches
 * @public
 */
UserSchema.methods.ComparePassword = async function(passwordFromBody){
    return await bcrypt.compare(passwordFromBody, this.password);
}

/**
 * Generates a salt based on the actual date
 *
 * @return {String} A generated salt
 * @public
 */
//UserSchema.methods.makeSalt = function(){
//    return Math.round(new Date().valueOf() * Math.random());
//}

/**
 * Calculates total spent amount and then set CurrentTotalAmount
 * 
 * @public
 */
UserSchema.methods.CalculateCurrentSpentAmount = function(){
    let totalSpentAmount = 0;
    //Iterates array and sum each amount
    this.expenses.forEach(e =>  totalSpentAmount += e.amount);
    this.currentSpentAmount = totalSpentAmount;
    this.currentTotalAmount = this.initialAmount - this.currentSpentAmount;
}

/**
 * Add amount to the initial amount
 * 
 * @public
 */
UserSchema.methods.AddAmountToInitialAmount = function(amountFromBody){
    this.initialAmount = parseFloat(amountFromBody);
}

UserSchema.methods.SaveImageName = function(imageName){
    this.img = imageName;
}

export default mongoose.model('User', UserSchema);