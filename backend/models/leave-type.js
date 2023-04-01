module.exports = (sequelize, DataTypes) => {
  const leaveType = sequelize.define(
    "leave_type",
    {
      // Model attributes are defined here
      leave_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      casual_leave: {
        type: DataTypes.NUMERIC(4,2),
        defaultValue: 13.00,
      },
      sick_leave: {
        type: DataTypes.NUMERIC(4,2),
        defaultValue: 13.00,
      },
      paid_leave: {
        type: DataTypes.NUMERIC(4,2),
        defaultValue: 13.00,
      },
      total_leave: {
        type: DataTypes.NUMERIC(4,2),
        defaultValue: 39.00,
      },
    },
    {
      // Other model options go here
      tableName: "leave_type",
      timestamps: false,
    }
  );
  return leaveType;
};
