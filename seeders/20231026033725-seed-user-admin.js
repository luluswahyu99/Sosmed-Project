'use strict';

const fs = require('fs')
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8')).map(el => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(el.password, salt);
      el.password = hash;
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

   await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('Users', null, {});
  }
};
