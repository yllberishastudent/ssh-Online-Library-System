"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Category.associate = function (models) {
    Category.belongsToMany(models.Book, {
      through: "BookCategory",
      foreignKey: "category_id",
    });
  };
  return Category;
};
