'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Author', {

      author_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
      {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Author')
  }
};