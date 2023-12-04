const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Sequelize} = require('sequelize');

const attendanceRoute = require('./Routes/attendanceRoute.js');

const sequelize = require('./util/db.js');
const StudentModel = require('./model/student.js');
const DateModel = require('./model/date.js');
const AttendanceModel = require('./model/attendance.js');
//--------------------------------------------------
const app = express();

app.use(cors());

app.use(bodyParser.json({extended:false}));



app.use('/attendance', attendanceRoute);

//-------------------------------------------------
AttendanceModel.belongsTo(StudentModel);
AttendanceModel.belongsTo(DateModel);
StudentModel.belongsToMany(DateModel, {through:AttendanceModel});
DateModel.belongsToMany(StudentModel, {through:AttendanceModel});


sequelize
    // .sync({force:true})
    .sync()
    .then(result=>{
        app.listen(9000);
    })
    .catch(err=>console.error(err));



    // sequelize
    // .sync({force:true})
    // // .sync()
    // .then(result=>{
    //     StudentModel.findByPk(1)
    //     .then(result=>{
    //         if(!result){
    //             let a =[{name:'Anujeet'},{name:'Kartik'},{name:'Sid'},{name:'Raj'},{name:'Viraj'},{name:'Tim'},{name:'Sam'}];

    //             StudentModel.bulkCreate(a)
    //             .then(()=>{
    //                 app.listen(9000);
    //             })
                
    //         }
    //     })
    //     .catch(err=>console.log(err));
        
    // })
    // .catch(err=>console.error(err));