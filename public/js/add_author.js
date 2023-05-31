// get objects to alter
let addAuthorForm = document.getElementById("add-author-form-ajax");

// alter needed objects
addAuthorForm.addEventListener("submit", function (e) {
  // don't submit form
  e.preventDefault();

  // get forms for data retrieval
  let inputFirstName = document.getElementById("input-first_name");
  let inputLastName = document.getElementById("input-last_name");

  // get form values
  let firstNameValue = inputFirstName.value;
  let lastNameValue = inputLastName.value;
  console.log(firstNameValue, lastNameValue);

  // convert data to JavaScript object
  let data = {
    first_name: firstNameValue,
    last_name: lastNameValue,
  };

  // prep AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-author-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // tell AJAX request to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // add new data to table
      addRowToTable(xhttp.response);

      // clear inputs for new transaction
      inputFirstName.value = "";
      inputLastName.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // send request, wait on response
  xhttp.send(JSON.stringify(data));
});

// write one row to Object — i.e., a single Authors record
addRowToTable = (data) => {
  // Get reference to current table on page, clear it
  let currentTable = document.getElementById("authors-table");

  // find where to insert new row — i.e., the last table row
  let newRowIndex = currentTable.rows.length;

  // get reference to new row from database query — i.e., the last object
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // create row, three cells
  let row = document.createElement("TR");
  let idCell = document.createElement("TD");
  let firstNameCell = document.createElement("TD");
  let lastNameCell = document.createElement("TD");

  let deleteCell = document.createElement("TD");

  // write correct data to cells
  idCell.innerText = newRow.author_id;
  firstNameCell.innerText = newRow.first_name;
  lastNameCell.innerText = newRow.last_name;

  deleteCell = document.createElement("button");
  deleteCell.innerHTML = "Delete";
  deleteCell.onclick = function () {
    deleteAuthor(newRow.author_id);
  };

  // add cells to row
  row.appendChild(idCell);
  row.appendChild(firstNameCell);
  row.appendChild(lastNameCell);
  row.appendChild(deleteCell);

  // Add a row attribute so the deleteRow function can find a newly added row
  row.setAttribute("data-value", newRow.author_id);

  // add row to table
  currentTable.appendChild(row);

  // Start of new Step 8 code for adding new data to the dropdown menu for updating authors

  // Find drop down menu, create a new option, fill data in the option (full name, id),
  // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
  let selectMenu = document.getElementById("authorSelect");
  let option = document.createElement("option");
  option.text = newRow.first_name + ' ' + newRow.last_name;
  option.value = newRow.author_id;
  selectMenu.add(option);
  // End of new step 8 code.
};
