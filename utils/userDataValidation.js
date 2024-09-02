function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
  return passwordRegex.test(password);
}

const userDataValidation = ({
  name,
  email,
  password,
  contactNumber,
  address,
  role,
}) => {
  return new Promise((resolve, reject) => {
    if (!name || !email || !password || !contactNumber || !address) {
      return reject("Please fill all required Fields");
    }
    if (typeof name !== "string") {
      return reject("Name is not a text");
    }
    if (typeof email !== "string") {
      return reject("Email is not a string");
    }
    if (typeof password !== "string") {
      return reject("Password is not a string");
    }
    if (typeof contactNumber !== "string") {
      return reject("Contact Number is not a string");
    }
    if (typeof address !== "string") {
      return reject("Address is not a string");
    }
    if (!validateEmail(email)) {
      return reject("Please enter a valid email");
    }

    if (contactNumber.length !== 10) {
      return reject("Contact Number should be a 10 digit number");
    }

    // off password validation for development period

    // if(!validatePassword(password)){
    //     return reject("Please use a special character, capital letter and a number for password");
    // }

    resolve("All good");
  });
};

module.exports = {
  userDataValidation,
};
