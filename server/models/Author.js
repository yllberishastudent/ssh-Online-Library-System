"use strict";
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    "Author",
    {
      author_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pen_name: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
      },
      country: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {}
  );

  Author.associate = function (models) {
    Author.hasMany(models.Book, {
      foreignKey: "author_id",
    });
  };

  return Author;
};