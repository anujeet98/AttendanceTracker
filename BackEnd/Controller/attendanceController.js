const Date = require('../model/date.js');
const Student = require('../model/student.js');
const Attendance = require('../model/attendance.js');

module.exports.getAttendance = async (req,res,next) => {
    try{
        const date = req.query.date;

        const findDate = Date.findOne({where: {date: date}});
    
        const getStudents = Student.findAll();
    
        let [foundDate, studentData] = await Promise.all([findDate, getStudents]);
    
        const studentNames = studentData.map(student => student.name);

    
        const resJSON = {
            attendanceDate: date,
            attendanceAvailable: foundDate?true:false,
            data: []
        };

        if(foundDate){
            //attendance for date not registered. GET attendanece
            const stud_attendance = await Attendance.findAll({
                where: {date:foundDate.id},
                include: [{model:Student,attributes:['name']}]
            });

            stud_attendance.forEach(attendance => {
                resJSON.data.push({studentName: attendance.name, status: attendance.status});
            });
        }
        else{
            //attendance for date not registered
            studentNames.forEach((name)=>{
                resJSON.data.push({studentName: name, status: null});
            });

        }

        res.json(resJSON);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    };

};

module.exports.postAttendance = (req,res,next) => {

};

module.exports.getSummary = (req,res,next) => {

};
