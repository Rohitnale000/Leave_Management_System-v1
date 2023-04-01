const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const leaveApplications = sequelize.define(
    "leave_applications",
    {
      // Model attributes are defined here
      app_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      from_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      to_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      type_of_leave: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type_of_day: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leave_status: {
        type: DataTypes.STRING,

        defaultValue: "Pending",
      },
      applied_date: {
        type: DataTypes.DATE,

        defaultValue: Sequelize.fn("now"),
      },
      no_of_leave: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reporting_manager_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      tableName: "leave_applications",
      timestamps: false,
    }
  );
  return leaveApplications;
};
