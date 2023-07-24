'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stores', {
      storeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      storeName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      storeAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      storeUrl: {
        type: Sequelize.STRING,
      },
      storeRating: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      // storeSales: {
      //   allowNull: false,
      //   defaultValue: 0,
      //   type: Sequelize.INTEGER,
      // },
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
    await queryInterface.dropTable('Stores');
  },
};
