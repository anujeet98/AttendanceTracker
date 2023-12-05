const date = document.getElementById('date');
const searchBtn = document.getElementById('searchBtn');
const fetchBtn = document.getElementById('fetchBtn');
// const attendanceContainer = document.getElementById('attendanceContainer');
const attendanceContainer_name = document.getElementById('attendanceContainer_name');
const attendanceContainer_status = document.getElementById('attendanceContainer_status');
const attendanceContainer_percent = document.getElementById('attendanceContainer_percent');
const markBtnContainer = document.getElementById('markBtnContainer');


//------------------------------------------------------------------------------------
searchBtn.addEventListener('click', getAttendance);

fetchBtn.addEventListener('click', getAttanceReport);
//------------------------------------------------------------------------------------



function getAttendance(e){
    if(date.value===''){
        return alert('please enter the date');
    }
    axios.get('http://localhost:9000/attendance/',{params: {date: date.value}})
        .then(result=> {
            console.log(result);
            if(result.data.attendanceAvailable){
                renderAttendanceSummary(result.data);
            }
            else{
                renderAttendanceForm(result.data);
            }
        })
        .catch(err=>console.error(err));
}



function postAttendance(){
    let jsonData = {
        date: date.value,
        data: []
    };

    const radio = document.getElementsByClassName('stud-radio');
    for(let i=0;i<radio.length;i++){
        if (radio[i].checked) {
            jsonData.data.push({studentId: radio[i].name.split('_')[0], studentName:radio[i].name.split('_')[1], status: radio[i].value});
            // console.log(radio[i].name, radio[i].value);
        }

        let selectedValue = null;
        document.getElementsByName(`${radio[i].name}`).forEach(r => {
            if(r.checked){
                selectedValue = r.value;
            }
        });
        if(selectedValue===null)
            return alert('please mark all the attendance');
    }

    //-------------------------------------------------------------------
    console.log(jsonData);
    axios.post('http://localhost:9000/attendance/',jsonData)
        .then(()=>{
            renderAttendanceSummary(jsonData);
        })
        .catch(err=>console.error('postAttendanceError: ',err));

}

//======================================================================================================================================

function renderAttendanceForm(result){
    attendanceContainer_name.innerHTML = '';
    attendanceContainer_status.innerHTML = '';
    attendanceContainer_percent.innerHTML = '';
    markBtnContainer.innerHTML = '';

    const totalDays = result.totalDays;

    for(let i=0;i<result.data.length;i++){
        attendanceContainer_name.innerHTML += `${result.data[i].studentName} <br><br>`;
        attendanceContainer_status.innerHTML += `<label><input type="radio" name="${result.data[i].studentId}_${result.data[i].studentName}" class="stud-radio" value="Present">Present</label><label><input type="radio" name="${result.data[i].studentId}_${result.data[i].studentName}" class="stud-radio" value="Absent">Absent</label>  <br><br>`;
    }

    let submitAttendanceBtn = document.createElement('button');
    submitAttendanceBtn.className = "submitAttendanceBtn";
    submitAttendanceBtn.appendChild(document.createTextNode("Mark Attendance"));
    submitAttendanceBtn.addEventListener("click",postAttendance);

    markBtnContainer.appendChild(submitAttendanceBtn);
}




function renderAttendanceSummary(result){

    attendanceContainer_name.innerHTML = '';
    attendanceContainer_status.innerHTML = '';
    attendanceContainer_percent.innerHTML = '';
    markBtnContainer.innerHTML = '';

    for(let i=0;i<result.data.length;i++){

        attendanceContainer_name.innerHTML += `${result.data[i].studentName} <br><br>`;
        if(result.data[i].status==='Present'){
            attendanceContainer_status.innerHTML += `✔ Present <br><br>`;
        }
        else{
            attendanceContainer_status.innerHTML += `✘ Absent <br><br>`;
        }

    }
};

//=====================================================================================================================
function getAttanceReport(){

    axios.get('http://localhost:9000/attendance/report')
        .then(result=> {
            renderReport(result.data);
        })
        .catch(err=>console.error(err));
}


function renderReport(result){
    attendanceContainer_name.innerHTML = '';
    attendanceContainer_status.innerHTML = '';
    attendanceContainer_percent.innerHTML = '';
    markBtnContainer.innerHTML = '';

    const totalDays = result.totalDays;

    for(let i=0;i<result.data.length;i++){
        let percent = Math.round(result.data[i].presentCount/totalDays * 100);
        attendanceContainer_name.innerHTML += `${result.data[i].studentName} <br><br>`;
        attendanceContainer_status.innerHTML += `${result.data[i].presentCount}/${totalDays} <br><br>`;
        attendanceContainer_percent.innerHTML += `${percent}% <br><br>`;
    }
}

//=====================================================================================================================















// {
//     totalDays: 3,
//     data:[
//         {
//             studentName: "Anujeet",
//             presentCount: 3
//         },
//         {
//             studentName: "Viraj",
//             presentCount: 2
//         },
//         {
//             studentName: "Harsh",
//             presentCount: 1
//         },
//         {
//             studentName: "Kartik",
//             presentCount: 0
//         }
//     ]
// }