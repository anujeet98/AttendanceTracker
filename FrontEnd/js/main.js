const date = document.getElementById('date');
const searchBtn = document.getElementById('searchBtn');
const fetchBtn = document.getElementById('fetchBtn');
const attnedanceContainer = document.getElementById('attendanceContainer');


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



function renderAttendanceForm(result){
    attnedanceContainer.innerHTML = '';
    for(let i=0;i<result.data.length;i++){
        let div = document.createElement('div');
        div.className="attendanceForm_element";
    
        div.innerHTML += `${result.data[i].studentName} <label><input type="radio" name="${result.data[i].studentId}_${result.data[i].studentName}" class="stud-radio" value="Present">Present</label><label><input type="radio" name="${result.data[i].studentId}_${result.data[i].studentName}" class="stud-radio" value="Absent">Absent</label><br>`;
        attnedanceContainer.appendChild(div);
    }
    let submitAttendanceBtn = document.createElement('button');
    submitAttendanceBtn.className = "submitAttendanceBtn";
    submitAttendanceBtn.appendChild(document.createTextNode("Mark Attendance"));
    submitAttendanceBtn.addEventListener("click",postAttendance);

    attnedanceContainer.appendChild(submitAttendanceBtn);
}




function renderAttendanceSummary(result){
    attnedanceContainer.innerHTML = '';

    for(let i=0;i<result.data.length;i++){
        let div = document.createElement('div');
        div.className="attendanceForm_element";
    
        if(result.data[i].status==='Present'){
            div.innerHTML += `${result.data[i].studentName}   ✔ Present`;
        }
        else{
            div.innerHTML += `${result.data[i].studentName}   ✘ Absent`;
        }
        attnedanceContainer.appendChild(div);
    }
};







function getAttanceReport(){

    axios.get('http://localhost:9000/attendance/report')
        .then(result=> {
            renderReport(result.data);
        })
        .catch(err=>console.error(err));
}

function renderReport(result){
    attnedanceContainer.innerHTML = '';
    const totalDays = result.totalDays;

    for(let i=0;i<result.data.length;i++){
        let div = document.createElement('div');
        div.className="attendanceReport_element";
    
        let percent = Math.round(result.data[i].presentCount/totalDays * 100);
        div.innerHTML += `${result.data[i].studentName}   ${result.data[i].presentCount}/${totalDays}    ${percent}%`;

        attnedanceContainer.appendChild(div);
    }
}

















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