'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {
      menuId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      storeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      menuName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      menuUrl: {
        type: Sequelize.STRING,
      },
      menuDescription: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      menuPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menus');
  },
};
