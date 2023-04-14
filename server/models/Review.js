"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      review_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      review_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 5,
        },
      },
    },
    {}
  );
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: "user_id" });
    Review.belongsTo(models.Book, { foreignKey: "book_id" });
  };
  return Review;
};
