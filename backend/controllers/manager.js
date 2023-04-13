const { getSingleAppService } = require("../services/manager");

const getSingleAppData = async (req, res) => {
  const result = await getSingleAppService(req.params.id);
  console.log(result);
  try {
    if (result.length === 1) {
      res.send({
        success: true,
        statusCode: 200,
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

module.exports = { getSingleAppData };
