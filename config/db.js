const Sequelize = require('sequelize')
const sequelize = new Sequelize('heroku_c46e6098b602346','b99b9169b4b39c','b2cfd363',{
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql',
    port:3306
})

module.exports = {
    Sequelize,
    sequelize
}