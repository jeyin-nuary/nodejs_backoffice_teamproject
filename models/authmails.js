'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthMails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        sourceKey: 'email',
        foreignKey: 'email',
      });
      // this.belongsTo(models.Stores, {
      //   sourceKey: '',
      //   foreignKey: '',
      // });
      // this.belongsTo(models.Reviews, {
      //   sourceKey: '',
      //   foreignKey: '',
      // });
      // this.belongsTo(models.Orders, {
      //   sourceKey: '',
      //   foreignKey: '',
      // });
      // this.belongsTo(models.Menus, {
      //   sourceKey: '',
      //   foreignKey: '',
      // });
    }
  }
  AuthMails.init(
    {
      emailId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      authCode: {
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
      modelName: 'AuthMails',
    }
  );
  return AuthMails;
};
