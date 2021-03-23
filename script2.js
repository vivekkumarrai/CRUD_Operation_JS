var selectedRow = null;
form.addEventListener('submit', e => {
	e.preventDefault();

	validateForm();
});
let userdata = [
    
    {
        keyname : "userFirstName",
        errorNameForEmpty : "Please Enter your name",
        errorNameForValidation : "Please enter a valid name",
        regx : /^[a-zA-Z ]{3,20}$/,
        errorKeyName : "NameError",
    },

    {
        keyname : "userLastName",
        errorNameForEmpty : "Please Enter your username",
        errorNameForValidation : "Please enter a valid username",
        regx : /^[a-zA-Z(0-9)]+$/,
         errorKeyName : "userLastNameError",
    },

    {
        keyname : "emailValue",
        errorNameForEmpty : "Please Enter your email",
        errorNameForValidation : "Please enter a valid email",
        regx : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/,
        errorKeyName : "emailError",
    },

    {
        keyname : "mobileNo",
        errorNameForEmpty : "Please Enter your number",
        errorNameForValidation : "Please enter a valid number",
         regx:/^\d{10}$/,
        errorKeyName : "numberError",
    },
    

]
function validateForm(){
    var valid=1;
   
    for(let i=0;i<userdata.length;i++){
      
        var input = document.forms["form"][userdata[i].keyname].value;
       
        if(input==""){       
            document.getElementById(userdata[i].errorKeyName).innerHTML= userdata[i].errorNameForEmpty;
        }
    else{
        if(!(input.match(userdata[i].regx))) {
        document.getElementById(userdata[i].errorKeyName).innerHTML= userdata[i].errorNameForValidation;
         
       }else{
           document.getElementById(userdata[i].errorKeyName).innerHTML="";
           valid++
       }
    }   
    }
    if(valid === 5){
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
    else{
        document.getElementById(userdata[i].errorKeyName).innerHTML="";
    }
    
}
    
// CRUD Operation

function readFormData() {
    var formData = {};
    formData["userFirstName"] = document.getElementById("userFirstName").value;
    formData["userLastName"] = document.getElementById("userLastName").value;
    formData["emailValue"] = document.getElementById("emailValue").value;
    formData["mobileNo"] = document.getElementById("mobileNo").value;
    return formData;
}
function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.userFirstName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.userLastName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.emailValue;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.mobileNo;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onClick="onEdit(this)"><i style="color:green" class="fas fa-edit"></i></a>`;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML=  `<a onClick="onDelete(this)"><i style="color:green" class="fas fa-trash-alt"></i></a>`;
}
function resetForm() {
    document.getElementById("userFirstName").value = "";
    document.getElementById("userLastName").value = "";
    document.getElementById("emailValue").value = "";
    document.getElementById("mobileNo").value = "";
    selectedRow = null;
}
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("userFirstName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("userLastName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("emailValue").value = selectedRow.cells[2].innerHTML;
    document.getElementById("mobileNo").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.userFirstName;
    selectedRow.cells[1].innerHTML = formData.userLastName;
    selectedRow.cells[2].innerHTML = formData.emailValue;
    selectedRow.cells[3].innerHTML = formData.mobileNo;
}
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function deleteAll(){
    var table = document.getElementById("employeeList");
    for(var i = table.rows.length - 1; i > 0; i--)
    {
        table.deleteRow(i);
    }
}





