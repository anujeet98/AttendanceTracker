const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Sequelize} = require('sequelize');

const attendanceRoute = require('./Routes/attendanceRoute.js');

const sequelize = require('./util/db.js');
const Student = require('./model/student.js');
const Date = require('./model/date.js');
const Attendance = require('./model/attendance.js');
//--------------------------------------------------
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));



app.use('/attendance', attendanceRoute);

//-------------------------------------------------

Student.belongsToMany(Date, {through:Attendance});
Date.belongsToMany(Student, {through:Attendance});


sequelize
    // .sync({force:true})
    .sync()
    .then(result=>{
        app.listen(8000);
    })
    .catch(err=>console.error(err));



