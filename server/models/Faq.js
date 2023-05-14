'use strict';
module.exports = (sequelize, DataTypes) => {
  const FAQ = sequelize.define('FAQ', {
    faq_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('unanswered', 'answered'),
      defaultValue: 'unanswered',
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {});
  FAQ.associate = function(models) {
    FAQ.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return FAQ;
};






