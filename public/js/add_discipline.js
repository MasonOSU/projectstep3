// `add_discipline.js` handles the client side for Create requests to the `Disciplines` table.
//
// Code citation:
// // Dr. Michael Curry. 2022.
// // "Step 5 - Adding New Data".
// // "Step 6 - Dynamically Filling Dropdowns and Adding a Search Box."
// // "Step 7 - Dynamically Deleting Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 12-96 (Curry)
// Get the objects to modify.
let addDisciplineForm = document.getElementById("add-discipline-form-ajax");

// Alter needed objects.
addDisciplineForm.addEventListener("submit", function (e) {
	// Don't submit the form yet.
	e.preventDefault();

	// Retrieve the form's data.
	let inputField = document.getElementById("field-name");

	// Get the form's values.
	let fieldValue = inputField.value;

	// Convert the data into a JavaScript object.
	let data = {
		field: fieldValue,
	};

	// Prep the Asynchronous JavaScript And XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/add-discipline-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// Add the new data to the table and auto-refresh.
			addRowToTable(xhttp.response);

			// Clear the inputs for the next transaction.
			inputField.value = "";
		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an error with the input.");
		}
	};

	// Send the request and wait on the reply.
	xhttp.send(JSON.stringify(data));
});

// Write an Object row as a single entity record.
addRowToTable = data => {
	// Find the current table, last row, and last object.
	let currentTable = document.getElementById("disciplines-table");
	let newRowIndex = currentTable.rows.length;
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1];

	// Create a new row with two cells.
	let row = document.createElement("TR");
	let idCell = document.createElement("TD");
	let fieldCell = document.createElement("TD");
	let deleteCell = document.createElement("TD");

	// Write the data.
	idCell.innerText = newRow.discipline_id;
	fieldCell.innerText = newRow.field;

	// Create a delete button.
	deleteCell = document.createElement("button");
	deleteCell.innerHTML = "Delete";
	deleteCell.onclick = function () {
		deleteDiscipline(newRow.discipline_id);
	};

	// Populate the row.
	row.appendChild(idCell);
	row.appendChild(fieldCell);
	row.appendChild(deleteCell);

	// Let `deleteRow()` find the new row.
	row.setAttribute("data-value", newRow.discipline_id);

	// Add the new row to the table.
	currentTable.appendChild(row);

	// Add the new row to the dropdown.
	let selectMenu = document.getElementById("disciplineSelect");
	let option = document.createElement("option");

	// Populate the dropdown with `Research_Papers` data.
	option.text = newRow.field;
	option.value = newRow.discipline_id;
	selectMenu.add(option);
};
