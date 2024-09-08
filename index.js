const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');
const recordclearAll = document.getElementById('clearAll');
const totalStudentCount = document.getElementById('total-student')

// initialize record from local storage

let records = JSON.parse(localStorage.getItem('records')) || [];
console.log("Record",records.length);

// Edit 

function editRecords(index){
    const editRecord = records[index];
     nameInput.value = editRecord.name;
     ageInput.value = editRecord.age;
     emailInput.value = editRecord.email;
     editIndexInput.value = index;


}

// Clear All Record

     recordclearAll.addEventListener('click',function(){
         localStorage.removeItem('records');  
         records = [];
         displayRecordes();
     });

``
// Display Records
  function displayRecordes() {
    recordList.innerHTML = '';
    totalStudentCount.innerHTML = `Total Studnet = ${records.length}`;
    console.log("Records Length",records.length);
    if(records.length === 0)
    {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan = "5"
         style="text-align:center;color:red">No Records Found</td>`;
        recordList.appendChild(row);
    }
    else{
      records.forEach((record,index)=>{
        const row = document.createElement('tr');
        row.innerHTML = `
           <td>${record.name}
           <td>${record.age}</td>
           <td>${record.email}</td>
           <td><button onclick="editRecords(${index})">Edit</button></td>
          <td  class="deleteButton" ><button onclick="deleteRecords(${index})" >Delete</button></td>
        `;
        recordList.appendChild(row);
      })
    }
  }

  // Delete Records
  function deleteRecords(index){
    let btnDelete = document.querySelectorAll('.deleteButton');
    btnDelete[index].innerHTML = `
    
      <div class="icon-container">
           <i id="yesBtn-${index}" onclick="confirmDelete(${index})" class="fa fa-check pointer"></i>
           <i id="noBtn-${index}" onclick="resetDelete(${index})" class="fa fa-times  pointer"></i>
      </div>
    
    `;
  } 

  // Confirm Delete
  function confirmDelete(index) { 
    records.splice(index,1);
    localStorage.setItem('records',JSON.stringify(records));
    displayRecordes();
  }

  //Reset/Cancle Delete Records

  function resetDelete(index) {
    displayRecordes();
  }

// Add or update a record
recordForm.addEventListener('submit',function(e){
  e.preventDefault();
  const name = nameInput.value;
  const age = ageInput.value;
  const email = emailInput.value;
  const editIndex = parseInt(editIndexInput.value);

  if(editIndex === -1){
    records.push({name, age, email});
  }
  else{
      records[editIndex] = {name,age,email};
  }
    localStorage.setItem('records', 
      JSON.stringify(records)
    );
    nameInput.value = '';
    ageInput.value = '';
    emailInput.value = '';
    
    displayRecordes();
});
displayRecordes();

