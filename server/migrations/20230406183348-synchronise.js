const db = require("../models");

// Synchronize all models with the database in a specific order
db.sequelize
  .sync({ force: false })
  .then(() => {
    return db.User.sync();
  })
  .then(() => {
    return db.Book.sync();
  })
  .then(() => {
    return db.Transaction.sync();
  })
  .then(() => {
    return db.Favorite.sync();
  })
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((error) => {
    console.error("An error occurred while synchronizing the models:", error);
  });
