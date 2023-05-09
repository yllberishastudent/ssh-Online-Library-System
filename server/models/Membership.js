module.exports = (sequelize, DataTypes) => {
    const Membership = sequelize.define("Membership", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id",
        },
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      expiryDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      membershipType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  
    Membership.associate = function (models) {
      Membership.belongsTo(models.User, { foreignKey: "userId" });
    };
  
    return Membership;
  };