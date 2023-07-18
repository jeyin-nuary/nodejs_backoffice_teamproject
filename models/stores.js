'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Reviews, {
        targetKey: 'storeId',
        foreignKey: 'storeId',
      });
      this.hasMany(models.Menus, {
        targetKey: 'storeId',
        foreignKey: 'storeId',
      });
      this.hasMany(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.OrderMenus, {
        targetKey: 'storeId',
        foreignKey: 'storeId',
      });
    }
  }
  Stores.init(
    {
      storeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      storeName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      storeAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      storeUrl: {
        type: DataTypes.STRING,
      },
      storeRating: {
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
      modelName: 'Stores',
    }
  );
  return Stores;
};
