"use strict";
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Authors",
          key: "author_id",
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      cover_image_url: {
        type: DataTypes.STRING,
      },
      pdf_file_url: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {}
  );
  Book.associate = function (models) {
    Book.belongsToMany(models.Category, {
      through: "BookCategory",
      foreignKey: "book_id",
    });
    Book.belongsTo(models.Author, {
      foreignKey: "author_id",
    });
  };
  return Book;
};
