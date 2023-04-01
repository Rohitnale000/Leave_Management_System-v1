
const db = require("../models/connection");
const leaveTypeDb = db.leaveTypes;
exports.leaveHistoryService=async(paramsId)=>{
    try {
        const queryResult = await leaveTypeDb.findOne({
            where: { emp_id: paramsId },
          });
          return queryResult
    } catch (error) {
        console.log(error);
    }
}
