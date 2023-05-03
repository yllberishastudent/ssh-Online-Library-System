"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "MembershipId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Memberships",
        key: "id",
      },
    });

    await queryInterface.removeColumn("Users", "membership_status");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "membership_status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "inactive",
    });

    await queryInterface.removeColumn("Users", "MembershipId");
  },
};
