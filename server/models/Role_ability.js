"use strict";
module.exports = (sequelize, DataTypes) => {
  const RoleAbility = sequelize.define(
    "RoleAbility",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      abilityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Abilities",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {}
  );

  RoleAbility.associate = function (models) {
    RoleAbility.belongsTo(models.Role, { foreignKey: "roleId" });
    RoleAbility.belongsTo(models.Ability, { foreignKey: "abilityId" });
  };

  return RoleAbility;
};
