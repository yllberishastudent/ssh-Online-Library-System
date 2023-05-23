"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "RoleAbilities",
      [
        // Assign abilities to the admin role (id: 1)
        { roleId: 1, abilityId: 6 }, // UpdateProfile
        { roleId: 1, abilityId: 7 }, // ChangePassword
        { roleId: 1, abilityId: 8 }, // ManageBooks
        { roleId: 1, abilityId: 9 }, // ManageUsers
        { roleId: 1, abilityId: 10 }, // ManageReviews
        { roleId: 1, abilityId: 11 }, // ViewAnalytics
        { roleId: 1, abilityId: 12 }, // ManageAbilities
        { roleId: 1, abilityId: 13 }, // DeleteAccount
        { roleId: 1, abilityId: 14 }, // CreateGenre
        { roleId: 1, abilityId: 15 }, // EditGenre
        { roleId: 1, abilityId: 16 }, // DeleteGenre
        { roleId: 1, abilityId: 17 }, // DeleteReview

        // Assign abilities to the basic role (id: 2)
        { roleId: 2, abilityId: 1 }, // ReadBook
        { roleId: 2, abilityId: 2 }, // LeaveReview
        { roleId: 2, abilityId: 3 }, // AddToFavorites
        { roleId: 2, abilityId: 4 }, // SearchBooks
        { roleId: 2, abilityId: 5 }, // ViewBookDetails
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("RoleAbilities", null, {});
  },
};
