"use strict";
module.exports = (sequelize, DataTypes) => {
  const Ability = sequelize.define(
    "Ability",
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

  Ability.associate = function (models) {
    Ability.belongsToMany(models.Role, {
      through: "RoleAbility",
      foreignKey: "abilityId",
    });
  };

  return Ability;
};