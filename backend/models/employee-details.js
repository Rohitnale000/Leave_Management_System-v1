module.exports = (sequelize, DataTypes) => {
  const employeeDetails = sequelize.define(
    "employee_details",
    {
      // Model attributes are defined here
      emp_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      email_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_no: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      emp_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emp_role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reporting_manager_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      update_password: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        defaultValue: "Active",
      },
      reason_for_delete: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      // Other model options go here
      tableName: "employee_details",
      timestamps: false,
    }
  );
  return employeeDetails;
};
