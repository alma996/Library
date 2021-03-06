'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {

      user_id: {
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
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      }
    },
      {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users')
  }
};
