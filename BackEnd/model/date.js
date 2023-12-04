const {Sequelize} = require('sequelize');

const sequelize = require('../util/db.js');


const Date = sequelize.define('dates',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


module.exports = Date;