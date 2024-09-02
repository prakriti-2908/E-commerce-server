const sessionSchema = require("../schemas/sessionSchema");
const userSchema = require("../schemas/userSchema");
const { hashPassword, comparePassword } = require("../utils/HashPassword");

const registerModel = ({
  name,
  email,
  password,
  contactNumber,
  address,
  isAdmin,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check if email already exists
      const isExist = await userSchema.findOne({ email: email });

      if (isExist) {
        // console.log(`email already exist : ${isExist}`);
        return reject("Email already exists");
      }

      const hashedPassword = await hashPassword(password);
      const userObj = new userSchema({
        name,
        email,
        password: hashedPassword,
        contactNumber,
        address,
        isAdmin,
      });
      const userDb = await userObj.save();
      return resolve(userDb);
    } catch (error) {
      return reject(error);
    }
  });
};

const loginModel = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDb = await userSchema.findOne({ email: email });
      if (!userDb || userDb.length == 0) {
        return reject("No user found with given email");
      }
      const isCorrectPassword = await comparePassword(
        password,
        userDb.password
      );
      // console.log(isCorrectPassword, password, )
      if (isCorrectPassword) {
        return resolve(userDb);
      } else {
        return reject("Password is incorrect");
      }
      // const isCorrect = comparePassword(password)
    } catch (error) {
      return reject(error);
    }
  });
};

const deleteAccountModel = ({userId}) => {
    return new Promise(async(resolve,reject)=>{
        try {
            const userDb = await userSchema.deleteOne({_id:userId});
            if(!userDb){
                return reject("User not found");
            }
            await sessionSchema.deleteMany({"session.user.userId":userId});
            resolve(userDb);
        } catch (error) {
            return reject(error);
        }
    })
}

module.exports = {
  registerModel,
  loginModel,
  deleteAccountModel
};
