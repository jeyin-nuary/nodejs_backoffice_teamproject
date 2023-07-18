'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
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
      this.hasMany(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.OrderMenus, {
        targetKey: 'orderId',
        foreignKey: 'orderId',
      });
    }
  }
  Orders.init(
    {
      orderId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      storeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      deliveryReq: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userAddress: {
        allowNull: false,
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
      modelName: 'Orders',
    }
  );
  return Orders;
};
