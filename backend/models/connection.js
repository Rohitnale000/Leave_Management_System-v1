const { Sequelize, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("leave_management", "postgres", "rohit", {
  host: "localhost",
  logging: false,
  dialect: "postgres",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;

db.employeeDetails = require("../models/employee-details.js")(
  sequelize,
  DataTypes
);
db.leaveApplications = require("../models/leave-applications.js")(
  sequelize,
  DataTypes
);
db.leaveTypes = require("../models/leave-type.js")(sequelize, DataTypes);

db.employeeDetails.hasMany(db.leaveApplications, {
  foreignKey: "emp_id",
});

db.employeeDetails.hasMany(db.leaveTypes, {
  foreignKey: "emp_id",
});

db.sequelize.sync({ force: false });
console.log("All models were synchronized successfully.");

module.exports = db;
