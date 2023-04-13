const { query } = require("express");
const {
  createLeaveApplicationService,
  getLeaveApplicationsService,
  approveLeaveService,
  rejectLeaveService,
  getLeaveStatusService,
  searchLeaveAppService,
} = require("../services/leave-application");
const { dateDiffInDays } = require("../utils/datedifferance");
const { otherFieldValidation } = require("../utils/validations");

const createLeaveApplicationData = async (req, res) => {
  let flag = false;
  // let falg2;

  // if (req.body.type_of_day === "Half Day") {
  //   if (req.body.from_date === req.body.to_date) {
  //     falg2 = true;
  //   } else {
  //     falg2 = false;
  //   }
  // }

  // if (falg2 === false) {
  //   res.send({
  //     success: false,
  //     statusCode: 404,
  //     message: "If you are apply for Half day please select same date",
  //   });
  //   return;
  // }

  const fromDate = new Date(req.body.from_date);
  const toDate = new Date(req.body.to_date);
  let validationResult = dateDiffInDays(fromDate, toDate);
  let validationResult1 = otherFieldValidation(req.body);

  if (validationResult >= 0 && validationResult1) {
    flag = true;
  } else {
    flag = false;
  }

  if (flag) {
    const result = await createLeaveApplicationService(req.body);
    try {
      if (result) {
        res.send({
          success: true,
          statusCode: 201,
          message: " you have applied leave application successfully",
        });
      } else {
        res.send({
          success: false,
          statusCode: 404,
          message: "There is no leave pending",
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
      message: "Please Enter Valid Date",
    });
  }
};

const getLeaveApplicationsData = async (req, res) => {
  const result = await getLeaveApplicationsService(
    req.query.page,
    req.query.limit,
    req.params.email
  );
  try {
    if (result.length > 0) {
      res.send({
        success: true,
        statusCode: 200,
        data: result,
        message: " employee Data found successfully",
      });
    } else {
      res.send({
        success: true,
        statusCode: 400,
        data: null,
        message: " employee Data Not found",
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

const approveLeaveData = async (req, res) => {
  const result = await approveLeaveService(req.body, req.params.id);
  console.log(result);
  try {
    if (result) {
      res.send({
        success: true,
        statusCode: 200,
        message: "Leave Approved successfully",
      });
    } else {
      res.send({
        success: false,
        statusCode: 400,
        message: "No Leave Approved",
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

const rejectLeaveData = async (req, res) => {
  const result = await rejectLeaveService(req.body.emp_id, req.params.id);
  try {
    if (result === 1) {
      res.send({
        success: true,
        statusCode: 200,
        message: "Leave Rejected",
      });
    } else {
      res.send({
        success: false,
        statusCode: 400,
        message: "Leave Not Rejected Id not found",
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

const leaveStatusData = async (req, res) => {
  const result = await getLeaveStatusService(req.params.id);
  console.log(result);
  try {
    if (result !== null) {
      res.send({
        success: true,
        statusCode: 200,
        data: result,
        message: "Leave-type data found successfully",
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

const searchLeaveData = async (req, res) => {
  const result = await searchLeaveAppService(
    req.query.data,
    req.query.manEmail
  );
  try {
    if (result.length >= 1) {
      res.send({
        success: true,
        statusCode: 302,
        data: result,
        message: "Leave application data found successfully",
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
  createLeaveApplicationData,
  getLeaveApplicationsData,
  approveLeaveData,
  rejectLeaveData,
  leaveStatusData,
  searchLeaveData,
};
