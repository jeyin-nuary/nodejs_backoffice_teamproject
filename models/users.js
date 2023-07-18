'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Reviews, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.Stores, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.Orders, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.Orders, {
        targetKey: 'userAddress',
        foreignKey: 'userAddress',
      });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userPoints: {
        allowNull: false,
        defaultValue: 1000000,
        type: DataTypes.INTEGER,
      },
      userAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
