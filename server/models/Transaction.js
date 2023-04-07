'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Book',
        key: 'book_id'
      }
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    transaction_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
    Transaction.belongsTo(models.Book, { foreignKey: 'book_id' });
  };
  return Transaction;
};
