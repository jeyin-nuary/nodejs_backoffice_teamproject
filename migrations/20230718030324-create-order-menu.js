'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderMeuns', {
      orderMenuId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      menuId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      orderQuantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      totalPrice: {
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
    await queryInterface.dropTable('orderMenus');
  },
};
