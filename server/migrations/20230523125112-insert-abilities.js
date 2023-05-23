"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const abilities = [
      { name: "ReadBook" },
      { name: "LeaveReview" },
      { name: "AddToFavorites" },
      { name: "SearchBooks" },
      { name: "ViewBookDetails" },
      { name: "UpdateProfile" },
      { name: "ChangePassword" },
      { name: "ManageBooks" },
      { name: "ManageUsers" },
      { name: "ManageReviews" },
      { name: "ViewAnalytics" },
      { name: "ManageAbilities" },
      { name: "DeleteAccount" },
      { name: "CreateGenre" },
      { name: "EditGenre" },
      { name: "DeleteGenre" },
      { name: "DeleteReview" },
    ];

    await queryInterface.bulkInsert("Abilities", abilities, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Abilities", null, {});
  },
};
