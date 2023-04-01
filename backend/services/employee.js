const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const saltRounds = 10;
const db = require("../models/connection");
const { dataFormatting } = require("../utils/dataFormatting");
const employeeDetailsDb = db.employeeDetails;
const leaveTypeDb = db.leaveTypes;

exports.createNewEmployeeService = async (bodyData) => {
  const hash = bcrypt.hashSync(await bodyData.emp_password, saltRounds);
  try {
    await db.sequelize.transaction(async (t) => {
      const employeeDetailsResult = await employeeDetailsDb.create(
        {
          first_name: bodyData.first_name,
          last_name: bodyData.last_name,
          email_id: bodyData.email_id,
          date_of_birth: bodyData.date_of_birth,
          gender: bodyData.gender,
          contact_no: bodyData.contact_no,
          department: bodyData.department,
          designation: bodyData.designation,
          joining_date: bodyData.joining_date,
          emp_password: hash,
          emp_role: bodyData.emp_role,
          reporting_manager_email: bodyData.reporting_manager_email,
        },
        { transaction: t }
      );

      const leaveTypeResult = await leaveTypeDb.create(
        {
          emp_id: employeeDetailsResult.emp_id,
        },
        { transaction: t }
      );
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

//my profile update api
exports.updateEmployeeService = async (paramsId, bodyData) => {
  const hash = bcrypt.hashSync(bodyData.emp_password, saltRounds);
  bodyData.emp_password = hash;
  const updateEmployeeResult = await employeeDetailsDb.update(
    {
      first_name: bodyData.first_name,
      last_name: bodyData.last_name,
      gender: bodyData.gender,
      date_of_birth: bodyData.date_of_birth,
      contact_no: bodyData.contact_no,
      emp_password: bodyData.emp_password,
    },
    {
      where: { emp_id: paramsId, status: "Active", emp_role: "Employee" },
    }
  );
  const resultInArray = updateEmployeeResult[0];

  return resultInArray;
};

exports.searchEmployeeService = async (paramsEmail) => {
  try {
    const queryResult = await employeeDetailsDb.findAll({
      where: {
        status: "Active",
        emp_role: "Employee",
        email_id: { [Op.like]: `%${paramsEmail}%` },
      },
    });
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};

exports.employeePaginationService = async (page, limit, paramsEmail) => {
  let offset = (page - 1) * limit;

  try {
    const data = await employeeDetailsDb.findAll({
      where: {
        status: "Active",
        emp_role: "Employee",
        reporting_manager_email: paramsEmail,
      },

      limit,
      offset,
    });
    const count = await employeeDetailsDb.count({
      where: { status: "Active" },
    });
    let result = dataFormatting(data);
    return { data1: result, totalCount: count };
  } catch (error) {
    console.log(error);
  }
};

//employee information updated by manager/admin

exports.updateEmployeeInfoService = async (paramsId, bodyData) => {
  const queryResult = await employeeDetailsDb.update(
    {
      first_name: bodyData.first_name,
      last_name: bodyData.last_name,
      email_id: bodyData.email_id,
      contact_no: bodyData.contact_no,
      department: bodyData.department,
      designation: bodyData.designation,
      joining_date: bodyData.joining_date,
      emp_role: bodyData.emp_role,
      reporting_manager_email: bodyData.reporting_manager_email,
    },
    {
      where: { emp_id: paramsId, status: "Active" },
    }
  );
  const resultInArray = queryResult[0];
   // console.log(queryResult);
  return resultInArray;
};


exports.deleteEmployeeService =async(paramsId,bodyData)=>{
  try {
    const queryResult = await employeeDetailsDb.update(
      { status: "Inactive",reason_for_delete:bodyData.reason_for_delete },
      { where: { emp_id: paramsId } }
    );
    const resultInArray = queryResult[0];
    console.log(resultInArray);
   return resultInArray;
   
  } catch (error) {
    console.log(error);
  }
}

