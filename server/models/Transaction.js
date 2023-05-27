"use strict";

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      transaction_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id",
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ccv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Transaction;
};
