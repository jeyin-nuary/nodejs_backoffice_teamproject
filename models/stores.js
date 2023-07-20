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
        sourceKey: 'storeId',
        foreignKey: 'storeId',
      });
      this.hasMany(models.Menus, {
        sourceKey: 'storeId',
        foreignKey: 'storeId',
      });
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.Orders, {
        sourceKey: 'storeId',
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
        allowNull: false || true,
        // false 하니까 오류가나서  false || true로 변경 :  로그인없이해서 그런듯?
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
        allowNull: true,
        // false -> true 변경   // 1. 가게의 별점은 사용자가 안줄수도 있다고 생각하여 true 변경 2. 39번줄과 마찬가지로 로그인없이해서 그런지 false일때 오류남
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
