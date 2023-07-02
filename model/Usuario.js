const db = require ('../config/db')
const Usuario = db.sequelize.define('usuario',{
    matricula:{
        type: db.Sequelize.INTEGER(7),
        primaryKey: true,
        allowNull:false
    },
    nome:{
    type: db.Sequelize.STRING(50),
    allowNull:false
    },
    turma:{
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
})

//Usuario.sync({force:true})

module.exports = Usuario;