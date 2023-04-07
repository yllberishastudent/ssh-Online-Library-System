"use strict";
module.exports = (sequelize, DataTypes) => {
  const User_History = sequelize.define(
    "User_History",
    {
      history_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Book",
          key: "book_id",
        },
      },
      activity_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activity_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {}
  );
  User_History.associate = function (models) {
    // associations can be defined here
  };
  return User_History;
};
