const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('library', 'root', '', {
  logging: false,
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  charset: 'utf8',
    collate: 'utf8_unicode_ci',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db