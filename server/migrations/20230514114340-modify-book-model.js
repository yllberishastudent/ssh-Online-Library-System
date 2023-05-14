"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Books", "author_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Authors",
        key: "author_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Books", "author_id");
  },
};
