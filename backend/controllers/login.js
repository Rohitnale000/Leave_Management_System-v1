const {
  empLoginService,
  storeNewPasswordService,
} = require("../services/login");

const { emailAndPassValidation } = require("../utils/validations.js");

const empLoginData = async (req, res) => {
  const validationResult =  emailAndPassValidation(
    req.body.email_id,
    req.body.emp_password
  );

  if (validationResult) {
    try {
      const result = await empLoginService(req.body);
      // console.log(result.data);
      if (result.status) {
        res.send({
          success: true,
          statusCode: 200,
          data: result.data,
          message:
            req.body.email_id +
            " login successfully and open new password form",
        });
      } else {
        res.send({
          success: false,
          statusCode: 400,
          payload: {
            data: null,
          },
          error: {
            message: "email or password does not match",
          },
        });
      }
    } catch (error) {
      res.send({
        success: false,
        statusCode: 500,
        payload: {
          data: error,
        },
        error: {
          message: "An error occurred!",
        },
      });
    }
  } else {
    res.send("Enter Valid Email or Password");
    return;
  }
};

const newPasswordData = async (req, res) => {
  try {
    const result = await storeNewPasswordService(req.params.email, req.body);
    if (result === 1) {
      res.send({
        success: true,
        statusCode: 200,
        data: result.data,
        message: "new password updated successfully",
      });
    } else if (result === 0) {
      res.send({
        success: false,
        statusCode: 400,
        data: null,
        message: "new password not updated",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      statusCode: 500,
      payload: {
        data: error,
      },
      error: {
        message: "An error occurred!",
      },
    });
  }
};

module.exports = {
  empLoginData,
  newPasswordData,
};
