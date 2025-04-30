
  var selectedRow = null;

  function onFormsubmit(event) {
    event.preventDefault();
    var formdata = readFormData();
    if (selectedRow === null) {
      insertNewRecord(formdata);
    } else {
      updateRecord(formdata);
    }
    resetForm();
  }

  function readFormData() {
    return {
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      age: document.getElementById("age").value,
      email: document.getElementById("email").value
    };
  }

  function renderRow(data) {
    var table = document.getElementById("storeid").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow();
    newRow.insertCell(0).innerHTML = data.fname;
    newRow.insertCell(1).innerHTML = data.lname;
    newRow.insertCell(2).innerHTML = data.age;
    newRow.insertCell(3).innerHTML = data.email;
    newRow.insertCell(4).innerHTML = `
      <button onclick="onEdit(this)">Edit</button>
      <button onclick="onDelete(this)">Delete</button>
    `;
  }
  
  function insertNewRecord(data) {
    renderRow(data); 
  
    
    let existingData = JSON.parse(localStorage.getItem("tableData")) || [];
    existingData.push(data);
    localStorage.setItem("tableData", JSON.stringify(existingData));
  }
  
  window.onload = function () {
    const storedData = JSON.parse(localStorage.getItem("tableData")) || [];
    storedData.forEach(data => renderRow(data)); 
  };
  

  function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("age").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
  }

  function updateRecord(formdata) {
  
    selectedRow.cells[0].innerHTML = formdata.fname;
    selectedRow.cells[1].innerHTML = formdata.lname;
    selectedRow.cells[2].innerHTML = formdata.age;
    selectedRow.cells[3].innerHTML = formdata.email;

    
    let existingData = JSON.parse(localStorage.getItem("tableData")) || [];
    const index = selectedRow.rowIndex - 1; 
    existingData[index] = formdata;
    localStorage.setItem("tableData", JSON.stringify(existingData));

    selectedRow = null;
  }

  function onDelete(td) {
    if (confirm("Do you want to delete this record?")) {
      var row = td.parentElement.parentElement;
      const index = row.rowIndex - 1;

      
      document.getElementById("storeid").getElementsByTagName("tbody")[0].deleteRow(index);

      
      let existingData = JSON.parse(localStorage.getItem("tableData")) || [];
      existingData.splice(index, 1);
      localStorage.setItem("tableData", JSON.stringify(existingData));

      resetForm();
    }
  }

  function resetForm() {
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("email").value = "";
    selectedRow = null;
  }

