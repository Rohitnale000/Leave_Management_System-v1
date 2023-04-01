const {
  createLeaveApplicationService,
  getLeaveApplicationsService,
  approveLeaveService,
  rejectLeaveService,
  getLeaveStatusService,
} = require("../services/leave-application");

const createLeaveApplicationData = async (req, res) => {
  //console.log(req.body);
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

const approveLeaveData =async (req,res)=>{
      const result = await approveLeaveService(req.body)
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
}

const rejectLeaveData=async(req,res)=>{
      const result =await rejectLeaveService(req.params.id);
      try {
        if (result===1) {
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
}


const leaveStatusData =async (req,res)=>{
      const result = await getLeaveStatusService(req.params.id)
      console.log(result);
      try {
        if(result !== null){
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
}

module.exports = { createLeaveApplicationData, getLeaveApplicationsData,approveLeaveData,rejectLeaveData,leaveStatusData };
