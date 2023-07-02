const Sequelize = require('sequelize')
const sequelize = new Sequelize('heroku_033a70c3ddc6ebc','baa61e403990b3','d03b231a',{
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql',
    port:3306
})

module.exports = {
    Sequelize,
    sequelize
}