const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.BDD_NAME, process.env.BDD_USER, process.env.BDD_PASS, {
    dialect: 'sqlite',
    host: './db.sqlite3'
});
module.exports = sequelize;