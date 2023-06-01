// get objects to modify
let addDisciplineForm = document.getElementById("add-discipline-form-ajax");

// modify objects
addDisciplineForm.addEventListener("submit", function (e) {
	// stop form from submitting
	e.preventDefault();

	// get forms for data retrieval
	let inputField = document.getElementById("field-name");

	// get form values
	let fieldValue = inputField.value;

	// put data to send in JS object
	let data = {
		field: fieldValue,
	};

	// prep AJAX request
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/add-discipline-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// tell AJAX request how to resolve
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// add new data to table
			addRowToTable(xhttp.response);

			// clear input fields for new transaction
			inputField.value = "";
		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an error with the input.");
		}
	};

	// send request, wait for response
	xhttp.send(JSON.stringify(data));
});

// // make single Object row as record from Discipline
// addRowToTable = data => {
// 	// get reference to current table, clear it
// 	let currentTable = document.getElementById("disciplines-table");

// 	// find where to insert new row
// 	let newRowIndex = currentTable.rows.length;

// 	// get reference to new row from database query
// 	let parsedData = JSON.parse(data);
// 	let newRow = parsedData[parsedData.length - 1];

// 	// create row, four cells
// 	let row = document.createElement("TR");
// 	let idCell = document.createElement("TD");
// 	let fieldCell = document.createElement("TD");

// 	// fill cells with correct data
// 	idCell.innerText = newRow.discipline_id;
// 	fieldCell.innerText = newRow.field;

// 	// add cells to row
// 	row.appendChild(idCell);
// 	row.appendChild(fieldCell);

// 	// add row to table
// 	currentTable.appendChild(row);
// };

// make single Object row as record from Disciplines
addRowToTable = data => {
	// Get a reference to the current table on the page and clear it out.
	let currentTable = document.getElementById("disciplines-table");

	// Get the location where we should insert the new row (end of table)
	let newRowIndex = currentTable.rows.length;

	// Get a reference to the new row from the database query (last object)
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1];

	// Create a row and 4 cells
	let row = document.createElement("TR");
	let idCell = document.createElement("TD");
	let fieldCell = document.createElement("TD");
	let deleteCell = document.createElement("TD");

	// Fill the cells with correct data
	idCell.innerText = newRow.discipline_id;
	fieldCell.innerText = newRow.field;

	deleteCell = document.createElement("button");
	deleteCell.innerHTML = "Delete";
	deleteCell.onclick = function () {
		deleteDiscipline(newRow.discipline_id);
	};

	// Add the cells to the row
	row.appendChild(idCell);
	row.appendChild(fieldCell);
	row.appendChild(deleteCell);

	// Add a row attribute so the deleteRow function can find a newly added row
	row.setAttribute("data-value", newRow.discipline_id);

	// Add the row to the table
	currentTable.appendChild(row);

	let selectMenu = document.getElementById("disciplineSelect");
	let option = document.createElement("option");
	option.text = newRow.field;
	option.value = newRow.discipline_id;
	selectMenu.add(option);
};
