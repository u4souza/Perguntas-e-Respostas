const Sequelize = require ('sequelize');

const connection = new Sequelize('guiaperguntas' ,'root', '96354219', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;