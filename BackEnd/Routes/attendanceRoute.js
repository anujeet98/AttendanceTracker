
const express = require('express');

const Router = express.Router();

const attendanceController = require('../Controller/attendanceController.js');

Router.get('/report',attendanceController.getReport);

Router.get('/',attendanceController.getAttendance);

Router.post('/',attendanceController.postAttendance);



module.exports = Router;