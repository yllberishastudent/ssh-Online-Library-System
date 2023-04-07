-"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      membership_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "inactive",
      },
      account_balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      role: {
        type: DataTypes.ENUM("member", "admin"),
        allowNull: false,
        defaultValue: "member",
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
