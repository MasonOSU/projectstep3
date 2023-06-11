// `add_citation.js` handles the client side for Create requests to the `Citations` table.
//
// Code citation:
// // Dr. Michael Curry. 2022.
// // "Step 5 - Adding New Data".
// // "Step 6 - Dynamically Filling Dropdowns and Adding a Search Box."
// // "Step 7 - Dynamically Deleting Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 12-99 (Curry)
// Get the objects to modify.
let addAuthorForm = document.getElementById("add-author-form-ajax");

// Alter needed objects.
addAuthorForm.addEventListener("submit", function (e) {

	// Don't submit the form yet.
	e.preventDefault();

	// Retrieve the form's data.
	let inputFirstName = document.getElementById("input-first_name");
	let inputLastName = document.getElementById("input-last_name");

	// Get the form's values.
	let firstNameValue = inputFirstName.value;
	let lastNameValue = inputLastName.value;

	// Convert the data to a JavaScript object.
	let data = {first_name: firstNameValue,
				last_name: lastNameValue,};

	// Prep the Asynchronous JavaScript and XML (Ajax) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/add-author-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {

			// Add the new data to the table.
			addRowToTable(xhttp.response);

			// Clear the inputs for a new transaction.
			inputFirstName.value = "";
			inputLastName.value = "";} 
		
		else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an input error.");}};

	// Send the request and wait on the reply.
	xhttp.send(JSON.stringify(data));});

// Write an Object row as a single entity record.
addRowToTable = data => {

	// Find the current table, last row, and last object.
	let currentTable = document.getElementById("authors-table");
	let newRowIndex = currentTable.rows.length;
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1];

	// Create a new row with three cells.
	let row = document.createElement("TR");
	let authorIdCell = document.createElement("TD");
	let firstNameCell = document.createElement("TD");
	let lastNameCell = document.createElement("TD");
	let deleteCell = document.createElement("TD");

	// Write the data.
	authorIdCell.innerText = newRow.author_id;
	firstNameCell.innerText = newRow.first_name;
	lastNameCell.innerText = newRow.last_name;

	// Create a delete button.
	deleteCell = document.createElement("button");
	deleteCell.innerHTML = "Delete";
	deleteCell.onclick = function () {deleteAuthor(newRow.author_id);};

	// Populate the row.
	row.appendChild(authorIdCell);
	row.appendChild(firstNameCell);
	row.appendChild(lastNameCell);
	row.appendChild(deleteCell);

	// Let `deleteRow()` find the new row.
	row.setAttribute("data-value", newRow.author_id);

	// Add the new row to the table.
	currentTable.appendChild(row);

	// Populate the dropdown with `Research_Papers` data.
	let selectMenu = document.getElementById("authorIdSelect");
	let option = document.createElement("option");

	option.text = newRow.first_name + " " + newRow.last_name;
	option.value = newRow.author_id;
	selectMenu.add(option);};