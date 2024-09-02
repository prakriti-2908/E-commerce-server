const bcrypt = require('bcryptjs');
const clc = require('cli-color');

const hashPassword = async (password) => {
    try {
        const SALT = process.env.SALT;
        const hashedPassword = await bcrypt.hash(password,Number(SALT));
        return hashedPassword;
    } catch (error) {
        console.log(clc.redBright("error in hashing password : ",error));
    }
}

const comparePassword = async (password,hashedPassword) => {
    try {
        const isSame = await bcrypt.compare(password,hashedPassword);
        return isSame;
    } catch (error) {
        console.log(clc.redBright("Error in comparing password : ",error))
    }
}

module.exports = {
    hashPassword,
    comparePassword
}
