'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderMenus', {
      orderMenuId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      menuId: {
        references: {
          model: 'Menus',
          key: 'menuId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      orderId: {
        references: {
          model: 'Orders',
          key: 'orderId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('OrderMenus');
  },
};
