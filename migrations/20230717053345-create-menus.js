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
        references: {
          model: 'Stores',
          key: 'storeId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      menuName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      menuImg: {
        type: Sequelize.STRING,
      },
      menuInfo: {
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
