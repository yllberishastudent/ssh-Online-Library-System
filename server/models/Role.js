"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {}
  );

  Role.associate = function (models) {
    Role.belongsToMany(models.Ability, {
      through: "RoleAbility",
      foreignKey: "roleId",
    });
    Role.belongsToMany(models.User, {
      through: "UserRole",
      foreignKey: "roleId",
    });
  };

  return Role;
};