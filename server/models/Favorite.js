"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    "Favorite",
    {
      favorite_id: {
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
          onDelete: "CASCADE",
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
    },
    {}
  );
  Favorite.associate = function (models) {
    Favorite.belongsTo(models.User, { foreignKey: "user_id" });
    Favorite.belongsTo(models.Book, { foreignKey: "book_id" });
  };
  return Favorite;
};
