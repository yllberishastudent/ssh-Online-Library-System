'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  },
  down: async (queryInterface, Sequelize) => {
    // Implement the rollback logic here if needed
    // This is optional and depends on your requirements
  },
};
