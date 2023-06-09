"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Memberships", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "user_id",
        },
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      expiryDate: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      membershipType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Memberships");
  },
};
