

const {Sequelize} = require('sequelize');

const sequelize = require('../util/db.js');


const Attendance = sequelize.define('attendance',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


module.exports = Attendance;