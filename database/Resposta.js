const Sequelize = require ('sequelize');
const connection = require ('./database');

const Resposta = connection.define ('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allwNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allwNull: false
    }
});

Resposta.sync({force: false});

module.exports = Resposta;