const db = require('../models'); // import all the models

// Synchronize all models with the database
db.sequelize.sync({ force: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.error('An error occurred while synchronizing the models:', error);
  });