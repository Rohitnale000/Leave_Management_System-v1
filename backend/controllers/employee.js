const {
  createNewEmployeeService,
  updateEmployeeService,
  searchEmployeeService,
  employeePaginationService,
  updateEmployeeInfoService,
  deleteEmployeeService,
  changePasswordService,
  getSingleEmployeeService,
} = require("../services/employee");
const {
  emailAndPassValidation,
  emailValidation,
  reasonForDelete,
  validationForMyprofile,
  isValidDateOfBirth,
  phoneNumber,
  passwordValidation,
  isStringValidation,
  isEmptyValidation,
} = require("../utils/validations");

const createNewEmployeeData = async (req, res) => {
  if (
    isStringValidation(req.body.first_name) &&
    isStringValidation(req.body.last_name) &&
    isStringValidation(req.body.gender) &&
    isStringValidation(req.body.department) &&
    isStringValidation(req.body.designation) &&
    isStringValidation(req.body.emp_role) &&
    emailValidation(req.body.email_id) &&
    isValidDateOfBirth(req.body.date_of_birth) &&
    phoneNumber(req.body.contact_no) &&
    emailValidation(req.body.reporting_manager_email)
  ) {
    try {
      const result = await createNewEmployeeService(req.body);
      if (result) {
        res.send({
          success: true,
          statusCode: 201,
          message:
            req.body.first_name +
            " " +
            req.body.last_name +
            " account has been created successfully",
        });
      } else {
        res.send({
          success: false,
          statusCode: 404,
          message: "account not created",
        });
      }
    } catch (error) {
      res.send({
        success: false,
        statusCode: 500,
        message: error,
      });
    }
  } else {
    res.send({
      success: false,
      statusCode: 501,
      message: "Enter Valid data",
    });
  }
};

const updateEmployeeData = async (req, res) => {
  const validationResult = validationForMyprofile(req.body);
  const validationResult1 = isValidDateOfBirth(req.body.date_of_birth);
  const validationResult2 = phoneNumber(req.body.contact_no);
  console.log(validationResult);

  if (validationResult) {
    if (validationResult1) {
      if (validationResult2) {
        try {
          const result = await updateEmployeeService(req.params.id, req.body);
          if (result === 1) {
            res.send({
              success: true,
              statusCode: 200,
              message: "Employee detail updated successfully",
            });
          } else if (result === 0) {
            res.send({
              success: false,
              statusCode: 400,
              message: "Employee Data not updated",
            });
          }
        } catch (error) {
          res.send({
            success: false,
            statusCode: 500,
            message: error,
          });
        }
      } else {
        res.send({
          success: false,
          statusCode: 400,
          message: "Enter valid phone number",
        });
      }
    } else {
      res.send({
        success: false,
        statusCode: 400,
        message: "Enter valid birth date age should be 18 or above",
      });
    }
  } else {
    res.send({
      success: false,
      statusCode: 400,
      message: "Enter valid data",
    });
  }
};

const searchEmployeeData = async (req, res) => {
  // const validationResult = isEmptyValidation(req.params.email);
  // if (validationResult === true) {
  const result = await searchEmployeeService(
    req.query.empEmail,
    req.query.manEmail
  );
  try {
    if (result.length >= 1) {
      res.send({
        success: true,
        statusCode: 302,
        data: result,
        message: "Employee data found successfully",
      });
    } else {
      res.send({
        success: false,
        statusCode: 404,
        message: "no data available",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      statusCode: 500,
      message: error,
    });
  }
  // } else {
  //   res.send({
  //     success: false,
  //     statusCode: 404,
  //     message: "no data available",
  //   });
  // }
};

const employeePaginationData = async (req, res) => {
  const result = await employeePaginationService(
    req.query.page,
    req.query.limit,
    req.params.email
  );
  try {
    if (result.data1.length > 0) {
      res.send({
        success: true,
        statusCode: 200,
        data: result.data1,
        message: "Employee data found successfully",
        totalCount: result.totalCount,
      });
    } else {
      res.send({
        success: false,
        statusCode: 404,
        message: "no data available",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      statusCode: 500,
      message: error,
    });
  }
};

//manager/admin update employee details controller

const updateEmployeeDetailData = async (req, res) => {
  if (
    isStringValidation(req.body.first_name) &&
    isStringValidation(req.body.last_name) &&
    isStringValidation(req.body.department) &&
    isStringValidation(req.body.designation) &&
    isStringValidation(req.body.emp_role) &&
    emailValidation(req.body.email_id) &&
    isValidDateOfBirth(req.body.date_of_birth) &&
    phoneNumber(req.body.contact_no) &&
    isStringValidation(req.body.gender) &&
    emailValidation(req.body.reporting_manager_email)
  ) {
    const result = await updateEmployeeInfoService(req.params.id, req.body);
    console.log(result);
    try {
      if (result === 1) {
        res.send({
          success: true,
          statusCode: 302,
          data: result,
          message: "Employee data Updated successfully",
        });
      } else {
        res.send({
          success: false,
          statusCode: 404,
          message: "no data available",
        });
      }
    } catch (error) {
      res.send({
        success: false,
        statusCode: 500,
        message: error,
      });
    }
  } else {
    res.send({
      success: false,
      statusCode: 404,
      message: "Enter Valid data",
    });
  }
};

const deleteEmployeeData = async (req, res) => {
  const validationResult = reasonForDelete(req.body);
  if (validationResult) {
    const result = await deleteEmployeeService(req.params.id, req.body);
    try {
      if (result === 1) {
        res.send({
          success: true,
          statusCode: 200,
          message: " Employee has been deleted successfully",
        });
      } else if (result === 0) {
        res.send({
          success: false,
          statusCode: 404,
          message: "Employee not Found",
        });
      }
    } catch (error) {
      res.send({
        success: false,
        statusCode: 500,
        message: error,
      });
    }
  } else {
    res.send({
      success: false,
      statusCode: 400,
      message: "Please Enter reason for deletion",
    });
  }
};

const changePasswordData = async (req, res) => {
  const result = await changePasswordService(req.params.id, req.body);
  const validationResult = passwordValidation(
    req.body.old_password,
    req.body.new_password
  );
  if (validationResult) {
    try {
      if (result) {
        res.send({
          success: true,
          statusCode: 200,
          message: "Password change successfully",
        });
      } else {
        res.send({
          success: false,
          statusCode: 400,
          message: "old password not match",
        });
      }
    } catch (error) {
      res.send({
        success: false,
        statusCode: 500,
        message: error,
      });
    }
  } else {
    res.send({
      success: false,
      statusCode: 404,
      message:
        "password must contain at least(1character ,1uppercase,1lowercase,1special character and number) and length should be 8",
    });
  }
};

const getSingleEmployeeData = async (req, res) => {
  const result = await getSingleEmployeeService(req.params.id);
  try {
    if (result.length === 1) {
      res.send({
        success: true,
        statusCode: 302,
        data: result[0].dataValues,
        message: "Employee data found successfully",
      });
    } else {
      res.send({
        success: false,
        statusCode: 404,
        message: "no data available",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      statusCode: 500,
      message: error,
    });
  }
};

module.exports = {
  createNewEmployeeData,
  updateEmployeeData,
  searchEmployeeData,
  employeePaginationData,
  updateEmployeeDetailData,
  deleteEmployeeData,
  changePasswordData,
  getSingleEmployeeData,
};
