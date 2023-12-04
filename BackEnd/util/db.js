const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('attendanceTracker','root','rootoor',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;