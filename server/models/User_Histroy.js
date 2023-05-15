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
          model: "Users",
          key: "user_id",
        },
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Books",
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
    User_History.belongsTo(models.Book, { foreignKey: "book_id" });
  };

  return User_History;
};
