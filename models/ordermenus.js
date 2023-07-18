'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderMenus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Orders, {
        targetKey: 'orderId',
        foreignKey: 'orderId',
      });
      this.belongsTo(models.Menu, {
        targetKey: 'menuId',
        foreignKey: 'menuId',
      });
    }
  }
  OrderMenus.init(
    {
      orderMenuId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      menuId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      orderQuantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      totalPrice: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
      modelName: 'OrderMenus',
    }
  );
  return OrderMenus;
};
