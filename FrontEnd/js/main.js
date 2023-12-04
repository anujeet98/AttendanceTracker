

const date = document.getElementById('date');
const searchBtn = document.getElementById('searchBtn');
const attnedanceContainer = document.getElementById('attendanceContainer');

document.addEventListener('DOMContentLoaded',()=>{

})

searchBtn.addEventListener('click', getAttendance);


function getAttendance(e){
    if(date.value===''){
        return alert('please enter the date');
    }
    axios.get('http://localhost:8000/attendance/',{params: {date: date.value}})
        .then(result=> {
            console.log(result);
            if(result.data.attendanceAvailable){
                renderAttendanceReport(result.data);
            }
            else{
                renderAttendanceForm(result.data);
            }
        })
        .catch(err=>console.error(err));
}


function renderAttendanceForm(result){
    for(let i=0;i<result.data.length;i++){
        let div = document.createElement('div');
        div.className="attendanceForm_element";
    
        div.innerHTML += `${result.data[i].studentName} <label><input type="radio" name="${result.data[i].studentName}" class="stud-radio" value="Present">Present</label><label><input type="radio" name="${result.data[i].studentName}" class="stud-radio" value="Absent">Absent</label><br>`;
        attnedanceContainer.appendChild(div);
    }
    let submitAttendanceBtn = document.createElement('button');
    submitAttendanceBtn.className = "submitAttendanceBtn";
    submitAttendanceBtn.appendChild(document.createTextNode("Mark Attendance"));
    submitAttendanceBtn.addEventListener("click",postAttendance);

    attnedanceContainer.appendChild(submitAttendanceBtn);
}



function postAttendance(){
    const radio = document.getElementsByClassName('stud-radio');
    for(let i=0;i<radio.length;i++){
        if (radio[i].checked) {
            console.log(radio[i].name, radio[i].value);
        }
        else{
            return alert('please mark for all the students');
        }
    }

}