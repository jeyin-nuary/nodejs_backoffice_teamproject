'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menus extends Model {
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
      this.hasMany(models.OrderMenus, {
        sourcekey: 'menuId',
        foreignKey: 'menuId',
      });
    }
  }
  Menus.init(
    {
      menuId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      storeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      menuName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      menuUrl: {
        type: DataTypes.STRING,
      },
      menuInfo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      menuPrice: {
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
      modelName: 'Menus',
    }
  );
  return Menus;
};
