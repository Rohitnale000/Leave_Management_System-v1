const db = require("../models/connection");
const applicationDetailsDb = db.leaveApplications;
exports.getSingleAppService = async (paramsId) => {
  try {
    const queryResult = await applicationDetailsDb.findAll({
      where: {
        app_id: paramsId,
      },
    });
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
