module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'id', 'user_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'user_id', 'id');
  }
};
