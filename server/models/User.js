"use strict";
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
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {}
  );

  User.associate = function (models) {
    User.hasMany(models.Membership, { foreignKey: "userId" });
    User.belongsTo(models.Role, { foreignKey: "roleId"});
    User.hasOne(models.UserInfo, { foreignKey: "userId" });
  };

  return User;
};
