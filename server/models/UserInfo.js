"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserInfo = sequelize.define(
    "UserInfo",
    {
      userInfo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ethnicity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
    },
    {}
  );

  UserInfo.associate = function (models) {
    UserInfo.belongsTo(models.User, { foreignKey: "userId" });
  };

  return UserInfo;
};
