// `add_institution.js` handles the client side for Create requests to the `Institutions` table.
//
// Code citation:
// // Dr. Michael Curry. 2022.
// // "Step 5 - Adding New Data".
// // "Step 6 - Dynamically Filling Dropdowns and Adding a Search Box."
// // "Step 7 - Dynamically Deleting Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 12-118 (Curry)
// Get the objects to modify.
let addInstitutionForm = document.getElementById("add-institution-form-ajax");

// Get the needed objects.
addInstitutionForm.addEventListener("submit", function (e) {
	// Don't submit the form yet.
	e.preventDefault();

	// Get the form's data for retrieval.
	let inputName = document.getElementById("input-name");
	let inputAddress = document.getElementById("input-address");
	let inputCountry = document.getElementById("input-country");
	let inputWebsite = document.getElementById("input-website");

	// Get the form's values.
	let nameValue = inputName.value;
	let addressValue = inputAddress.value;
	let countryValue = inputCountry.value;
	let websiteValue = inputWebsite.value;

	// Convert data to a JavaScript object.
	let data = {
		name: nameValue,
		address: addressValue,
		country: countryValue,
		website: websiteValue,
	};

	// Prep the Asynchronous JavaScript and XML request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/add-institution-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// Add the data to the table.
			addRowToTable(xhttp.response);

			// Clear the inputs for a new transaction.
			inputName.value = "";
			inputAddress.value = "";
			inputCountry.value = "";
			inputWebsite.value = "";
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
	let currentTable = document.getElementById("institutions-table");
	let newRowIndex = currentTable.rows.length;
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1];

	// Create a new row with five cells.
	let row = document.createElement("TR");
	let idCell = document.createElement("TD");
	let nameCell = document.createElement("TD");
	let addressCell = document.createElement("TD");
	let countryCell = document.createElement("TD");
	let websiteCell = document.createElement("TD");

	let deleteCell = document.createElement("TD");

	// Write the data.
	idCell.innerText = newRow.institution_id;
	nameCell.innerText = newRow.name;
	addressCell.innerText = newRow.address;
	countryCell.innerText = newRow.country;
	websiteCell.innerText = newRow.website;

	// Create a delete button.
	deleteCell = document.createElement("button");
	deleteCell.innerHTML = "Delete";
	deleteCell.onclick = function () {
		deleteInstitution(newRow.institution_id);
	};

	// Populate the row.
	row.appendChild(idCell);
	row.appendChild(nameCell);
	row.appendChild(addressCell);
	row.appendChild(countryCell);
	row.appendChild(websiteCell);
	row.appendChild(deleteCell);

	// Let `deleteRow()` find the new row.
	row.setAttribute("data-value", newRow.institution_id);

	// Add the new row to the table.
	currentTable.appendChild(row);

	// Add the new row to the dropdown.
	let selectMenu = document.getElementById("institutionSelect");
	let option = document.createElement("option");

	// Populate the dropdown with `Institutions` data.
	option.text = newRow.name + " " + newRow.address;
	option.value = newRow.institution_id;
	selectMenu.add(option);
};
