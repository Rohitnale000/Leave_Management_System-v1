const db = require("../models/connection.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const employeeDetailsDb = db.employeeDetails;
const {  Op } = require("sequelize");
exports.empLoginService = async (bodyData) => {
  const EmpLoginDetail = await employeeDetailsDb.findOne({
    where: {
      update_password: { [Op.or]: ["0", "1"] },
      email_id: bodyData.email_id,
      status: "Active",
      //update_password: "0"
    }
  });
  if (EmpLoginDetail != null) {
    const isMatch = await bcrypt.compare(
      bodyData.emp_password,
      EmpLoginDetail.emp_password
    );
    if (isMatch) {
      return {
        status: true,
        data: EmpLoginDetail,
      };
    } else {
      return {
        status: false,
      };
    }
  } else {
    return {
      status: false,
    };
  }
};

exports.storeNewPasswordService = async (paramsEmail, bodyData) => {
  const hash = bcrypt.hashSync(bodyData.emp_password, saltRounds);
  bodyData.emp_password = hash;
  const updatePassword = await employeeDetailsDb.update(
    { update_password: "1", emp_password: bodyData.emp_password },
    { where: { email_id: paramsEmail, status: "Active" } }
  );
  const resultInArray = updatePassword[0];
  return resultInArray;
};


