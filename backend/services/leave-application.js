const { dateDiffInDays } = require("../utils/datedifferance");
const db = require("../models/connection");
const leaveApplications = require("../models/leave-applications");
const { QueryTypes } = require("sequelize");
const { query } = require("express");
const { fromatingEmployeeData } = require("../utils/dataFormatting");
const { sequelize } = require("../models/connection");
const applicationDetailsDb = db.leaveApplications;
const employeeDetailsDb = db.employeeDetails;
const leaveTypeDb = db.leaveTypes;

exports.createLeaveApplicationService = async (bodyData) => {
  //console.log(bodyData);
  let iCnt = 0;
  let flag = false;

  const fromDate = new Date(bodyData.from_date);
  const toDate = new Date(bodyData.to_date);
  let difference = dateDiffInDays(fromDate, toDate);
  difference = difference + 1;

  try {
    const queryResult = await leaveTypeDb.findAll({
      where: { emp_id: bodyData.emp_id },
    });

    if (bodyData.type_of_leave === "Sick Leave") {
      iCnt = 1;
    } else if (bodyData.type_of_leave === "Casual Leave") {
      iCnt = 2;
    } else if (bodyData.type_of_leave === "Paid Leave") {
      iCnt = 3;
    }

    if (iCnt === 1) {
      if (queryResult[0].dataValues.sick_leave >= difference) {
        flag = true;
      } else {
        flag = false;
      }
    }
    if (iCnt === 2) {
      if (
        bodyData.type_of_day === "Full Day" ||
        bodyData.type_of_day === "Half Day"
      ) {
        if (queryResult[0].dataValues.casual_leave >= difference) {
          flag = true;
        } else {
          flag = false;
        }
      }
    }
    if (iCnt === 3) {
      if (
        bodyData.type_of_day === "Full Day" ||
        bodyData.type_of_day === "Half Day"
      ) {
        if (queryResult[0].dataValues.paid_leave >= difference) {
          flag = true;
        } else {
          flag = false;
        }
      }
    }

    //console.log(flag);

    if (flag) {
      const applicationResult = applicationDetailsDb.create({
        from_date: bodyData.from_date,
        to_date: bodyData.to_date,
        type_of_leave: bodyData.type_of_leave,
        type_of_day: bodyData.type_of_day,
        reason: bodyData.reason,
        no_of_leave: difference,
        emp_id: bodyData.emp_id,
        reporting_manager_email: bodyData.reporting_manager_email,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getLeaveApplicationsService = async (page, limit, paramsEmail) => {
  console.log(paramsEmail);
  let offset = (page - 1) * limit;
  try {
    // const result = await employeeDetailsDb.findAll({
    //   include: [
    //     {
    //       model: applicationDetailsDb,
    //       where: { reporting_manager_email: paramsEmail },
    //     },
    //   ],
    // });
    // console.log(await result);
    console.log(limit);
    console.log(offset);
    const queryResult = await sequelize.query(
      `SELECT * FROM leave_applications INNER JOIN employee_details ON leave_applications.emp_id= employee_details.emp_id where employee_details.reporting_manager_email='${paramsEmail}' limit ${limit} offset ${offset};
    `,
      { type: QueryTypes.SELECT }
    );

    //const result =fromatingEmployeeData(queryResult)
    return await queryResult;
  } catch (error) {
    console.log(error);
  }
};
// const queryResult1= await applicationDetailsDb.findAll({
//   where:{reporting_manager_email: paramsEmail}
// })

exports.approveLeaveService = async (bodyData, paramsId) => {
  let iCnt = 0;
  let totalLeave = 0;
  let totalNoOfLeave = 0;
  const queryResult = await leaveTypeDb.findAll({
    where: { emp_id: bodyData.emp_id },
  });

  if (bodyData.type_of_leave === "Sick Leave") {
    iCnt = 1;
  } else if (bodyData.type_of_leave === "Casual Leave") {
    iCnt = 2;
  } else if (bodyData.type_of_leave === "Paid Leave") {
    iCnt = 3;
  }

  //Calculations for sick leave
  if (iCnt === 1) {
    if (bodyData.type_of_day === "Full Day") {
      totalLeave = queryResult[0].dataValues.sick_leave - bodyData.no_of_leave;
      totalNoOfLeave =
        queryResult[0].dataValues.total_leave - bodyData.no_of_leave;

      await db.sequelize.transaction(async (t) => {
        const updateLeaves = await leaveTypeDb.update(
          {
            sick_leave: totalLeave,
            total_leave: totalNoOfLeave,
          },
          {
            where: { emp_id: bodyData.emp_id },
          },
          { transaction: t }
        );

        const leaveStatusChange = await applicationDetailsDb.update(
          {
            leave_status: "Approve",
          },
          {
            where: { emp_id: bodyData.emp_id, app_id: paramsId },
          }
        );
      });

      return true;
    } else if (bodyData.type_of_day === "Half Day") {
      totalLeave = queryResult[0].dataValues.sick_leave - 0.5;
      totalNoOfLeave = queryResult[0].dataValues.total_leave - 0.5;
      await db.sequelize.transaction(async (t) => {
        const updateLeaves = await leaveTypeDb.update(
          {
            sick_leave: totalLeave,
            total_leave: totalNoOfLeave,
          },
          {
            where: { emp_id: bodyData.emp_id },
          },
          { transaction: t }
        );

        const leaveStatusChange = await applicationDetailsDb.update(
          {
            leave_status: "Approve",
          },
          {
            where: { emp_id: bodyData.emp_id, app_id: paramsId },
          }
        );
      });

      return true;
    }
  }

  //Calculations for casual leave
  if (iCnt === 2) {
    if (bodyData.type_of_day === "Full Day") {
      totalLeave =
        queryResult[0].dataValues.casual_leave - bodyData.no_of_leave;
      totalNoOfLeave =
        queryResult[0].dataValues.total_leave - bodyData.no_of_leave;
      await db.sequelize.transaction(async (t) => {
        const updateLeaves = await leaveTypeDb.update(
          {
            casual_leave: totalLeave,
            total_leave: totalNoOfLeave,
          },
          {
            where: { emp_id: bodyData.emp_id },
          },
          { transaction: t }
        );

        const leaveStatusChange = await applicationDetailsDb.update(
          {
            leave_status: "Approve",
          },
          {
            where: { emp_id: bodyData.emp_id, app_id: paramsId },
          }
        );
      });

      return true;
      console.log(updateLeaves);
    } else if (bodyData.type_of_day === "Half Day") {
      totalLeave = queryResult[0].dataValues.casual_leave - 0.5;
      totalNoOfLeave = queryResult[0].dataValues.total_leave - 0.5;
      await db.sequelize.transaction(async (t) => {
        const updateLeaves = await leaveTypeDb.update(
          {
            casual_leave: totalLeave,
            total_leave: totalNoOfLeave,
          },
          {
            where: { emp_id: bodyData.emp_id },
          },
          { transaction: t }
        );

        const leaveStatusChange = await applicationDetailsDb.update(
          {
            leave_status: "Approve",
          },
          {
            where: { emp_id: bodyData.emp_id, app_id: paramsId },
          }
        );
      });

      return true;
      console.log(updateLeaves);
    }
  }

  //Calculations for paid leave
  if (iCnt === 3) {
    if (bodyData.type_of_day === "Full Day") {
      totalLeave = queryResult[0].dataValues.paid_leave - bodyData.no_of_leave;
      totalNoOfLeave =
        queryResult[0].dataValues.total_leave - bodyData.no_of_leave;
      await db.sequelize.transaction(async (t) => {
        const updateLeaves = await leaveTypeDb.update(
          {
            paid_leave: totalLeave,
            total_leave: totalNoOfLeave,
          },
          {
            where: { emp_id: bodyData.emp_id },
          },
          { transaction: t }
        );

        const leaveStatusChange = await applicationDetailsDb.update(
          {
            leave_status: "Approve",
          },
          {
            where: { emp_id: bodyData.emp_id, app_id: paramsId },
          }
        );
      });

      return true;
      console.log(updateLeaves);
    } else if (bodyData.type_of_day === "Half Day") {
      totalLeave = queryResult[0].dataValues.paid_leave - 0.5;
      totalNoOfLeave = queryResult[0].dataValues.total_leave - 0.5;
      await db.sequelize.transaction(async (t) => {
        const updateLeaves = await leaveTypeDb.update(
          {
            paid_leave: totalLeave,
            total_leave: totalNoOfLeave,
          },
          {
            where: { emp_id: bodyData.emp_id },
          },
          { transaction: t }
        );

        const leaveStatusChange = await applicationDetailsDb.update(
          {
            leave_status: "Approve",
          },
          {
            where: { emp_id: bodyData.emp_id, app_id: paramsId },
          }
        );
      });

      return true;
      console.log(updateLeaves);
    }
  }
  //console.log(queryResult[0].dataValues.sick_leave);
};

exports.rejectLeaveService = async (bodyData, paramsId) => {
  try {
    const leaveStatusChange = await applicationDetailsDb.update(
      {
        leave_status: "Reject",
      },
      {
        where: { emp_id: bodyData, app_id: paramsId },
      }
    );
    const resultInArray = leaveStatusChange[0];
    return resultInArray;
  } catch (error) {
    console.log(error);
  }
};

exports.getLeaveStatusService = async (paramsId) => {
  try {
    const queryResult = await applicationDetailsDb.findAll({
      where: { emp_id: paramsId },
    });
    console.log(queryResult.dataValues);
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
