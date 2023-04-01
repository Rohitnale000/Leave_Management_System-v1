const { leaveHistoryService } = require("../services/leave-type")

const leaveHistoryData =async (req,res)=>{
    const result = await leaveHistoryService(req.params.id);
    try {
        if(result !== null){
            res.send({
                success: true,
                statusCode: 200,
                data: result.dataValues,
                message: "Leave-type data found",
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


module.exports={leaveHistoryData}