const DateModel = require('../model/date.js');
const StudentModel = require('../model/student.js');
const AttendanceModel = require('../model/attendance.js');

module.exports.getAttendance = async (req,res,next) => {
    try{
        console.log('get request...')

        const date = req.query.date;

        const findDate = DateModel.findOne({where: {date: date}});
    
        const getStudents = StudentModel.findAll();
    
        let [foundDate, studentsData] = await Promise.all([findDate, getStudents]);
    
    
        const resJSON = {
            attendanceDate: date,
            attendanceAvailable: foundDate?true:false,
            data: []
        };

        if(foundDate){
            //attendance for date not registered. GET attendanece
            const stud_attendance = await AttendanceModel.findAll({
                where: {dateId:foundDate.id},
                include: [{model:StudentModel,attributes:['name']}]
            });

            // console.log(stud_attendance);
            stud_attendance.forEach(attendance => {
                resJSON.data.push({studentName: attendance.student.name, status: attendance.status});
            });
        }
        else{
            //attendance for date not registered
            studentsData.forEach((data)=>{
                resJSON.data.push({studentId: data.id, studentName: data.name, status: null});
            });

        }

        res.json(resJSON);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    };

};

module.exports.postAttendance = async (req,res,next) => {
    try{
        console.log('post request....');
    
        const date = req.body.date;
        const data = req.body.data;
    
        const newDate = await DateModel.create({date: date});
    
        data.forEach(element => element['dateId'] = newDate.id);
        // console.log(data);
        await AttendanceModel.bulkCreate(data);

        res.status(200).json({status: "success"});
    }
    catch(err){
        console.error('postAttendanceError: ',err);
        res.status(500).json({status: "Internal Server Error"});
    }
};

module.exports.getReport = (req,res,next) => {

};






// if(foundDate){
//     //attendance for date not registered. GET attendanece
//     const stud_attendance = await AttendanceModel.findAll({
//         where: { dateId: foundDate.id },
//         raw: true, // Added raw: true
//     });

//     const studentIds = stud_attendance.map(attendance => attendance.studentId);
//     const studentsData = await StudentModel.findAll({
//         where: { id: studentIds },
//         attributes: ['id', 'name'],
//     });

//     resJSON.data = stud_attendance.map(attendance => {
//         const studentData = studentsData.find(student => student.id === attendance.studentId);
//         return {
//             studentName: studentData ? studentData.name : null,
//             status: attendance.status,
//         };
//     });
// }