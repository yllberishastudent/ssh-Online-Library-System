'use strict';
module.exports = (sequelize, DataTypes) => {
  const BookCategory = sequelize.define('BookCategory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {});
  BookCategory.associate = function(models) {
    BookCategory.belongsTo(models.Book, { foreignKey: 'book_id' });
    BookCategory.belongsTo(models.Category, { foreignKey: 'category_id' });
  };
  return BookCategory;
};
