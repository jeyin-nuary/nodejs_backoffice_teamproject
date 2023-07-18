'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Stores, {
        targetKey: 'storeId',
        foreignKey: 'storeId',
      });

      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });

      this.hasOne(models.Orders, {
        targetKey: 'orderId',
        foreignKey: 'orderId',
      });
    }
  }
  Reviews.init(
    {
      reviewId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      storeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      reviewContent: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      reviewUrl: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Reviews',
    }
  );
  return Reviews;
};
