const { loginService, changePassService } = require("../services/login");
const { emailAndPassValidation } = require("../utils/index");

//controller for login //
const loginController = async (emailId, password) => {
  //pass values from validate function
  try {
    const result = await loginService(emailId, password);
    return result;
  } catch (error) {
    console.log("controller Error", error);
  }
};

const changePassController = async (emailId, password, confirmPassword) => {
  if (password !== confirmPassword) {
    console.log("password not match");
    return 0;
  } else {
    try {
      const result = await changePassService(emailId, password);
      return result;
    } catch (error) {
      console.log("error...");
    }
  }
};

module.exports = { loginController, changePassController };
