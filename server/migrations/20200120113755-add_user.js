'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userData = [{
      "user_id": "",
      "first_name": "Alma",
      "last_name": "Sadiković",
      "email": "alma96@gmail.com",
      "password":"$2a$10$SwI9U6Vy2FJ4URVnE46mnujwRul0yGUeu9Sk4qt1TowzikLMCJ94O",
      "created": "20.01.2020",
    }]

    await queryInterface.bulkInsert('Users', userData)
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {first_name: "Alma", last_name: "Sadiković", email: "alma96@gmail.com"}, {})
   
  }
};
