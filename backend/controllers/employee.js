const {
  createNewEmployeeService,
  updateEmployeeService,
  searchEmployeeService,
  employeePaginationService,
  updateEmployeeInfoService,
  deleteEmployeeService,
} = require("../services/employee");
const {
  allFieldValidation,
  emailAndPassValidation,
  emailValidation,
  reasonForDelete,
} = require("../utils/validations");

const createNewEmployeeData = async (req, res) => {
  const validationResult = allFieldValidation(req.body);
  const validationResult1 = emailAndPassValidation(
    req.body.email_id,
    req.body.emp_password
  );
  if (validationResult && validationResult1) {
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
  try {
    const result = await updateEmployeeService(req.params.id, req.body);
    console.log(result);
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
};

const searchEmployeeData = async (req, res) => {
  //console.log(req.params.email);
  const result = await searchEmployeeService(req.params.email);
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
        totalCount:result.totalCount
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
  console.log(req.params.id);
  const result = await updateEmployeeInfoService(req.params.id, req.body);
  console.log(result);
  try {
    if (result === 1) {
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
};

const deleteEmployeeData = async (req, res) => {
  const validationResult = reasonForDelete(req.body)
  if(validationResult){
  const result = await deleteEmployeeService(req.params.id,req.body);
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
}else{
  res.send({
    success: false,
    statusCode: 400,
    message: "Please Enter reason for deletion",
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
};
