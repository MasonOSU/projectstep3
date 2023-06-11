// get objects to modify
let addInstitutionForm = document.getElementById("add-institution-form-ajax");

// alter objects needed
addInstitutionForm.addEventListener("submit", function (e) {
	// stop form from submitting
	e.preventDefault();

	// get form fields for data retrieval
	let inputName = document.getElementById("input-name");
	let inputAddress = document.getElementById("input-address");
	let inputCountry = document.getElementById("input-country");
	let inputWebsite = document.getElementById("input-website");

	// get values from form fields
	let nameValue = inputName.value;
	let addressValue = inputAddress.value;
	let countryValue = inputCountry.value;
	let websiteValue = inputWebsite.value;

	// put data data to send in JavaScript object
	let data = {
		name: nameValue,
		address: addressValue,
		country: countryValue,
		website: websiteValue,
	};
	console.log("data we are passing in: ", data);

	// setup AJAX request
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/add-institution-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// tell request how to resolve
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// add data to table
			addRowToTable(xhttp.response);

			// clear input fields for new transaction
			inputName.value = "";
			inputAddress.value = "";
			inputCountry.value = "";
			inputWebsite.value = "";
		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an error with the input.");
		}
	};

	// send request, wait
	xhttp.send(JSON.stringify(data));
});

// create Object row as single record from Institutions
addRowToTable = data => {
	// get reference to current table on page, clear it out.
	let currentTable = document.getElementById("institutions-table");

	// get location to insert new row (end of table)
	let newRowIndex = currentTable.rows.length;

	// get reference to new row from database query (last object)
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1];

	// make row, five cells
	let row = document.createElement("TR");
	let idCell = document.createElement("TD");
	let nameCell = document.createElement("TD");
	let addressCell = document.createElement("TD");
	let countryCell = document.createElement("TD");
	let websiteCell = document.createElement("TD");

	let deleteCell = document.createElement("TD");

	// fill cells with data
	idCell.innerText = newRow.institution_id;
	nameCell.innerText = newRow.name;
	addressCell.innerText = newRow.address;
	countryCell.innerText = newRow.country;
	websiteCell.innerText = newRow.website;

	deleteCell = document.createElement("button");
	deleteCell.innerHTML = "Delete";
	deleteCell.onclick = function () {
		deleteInstitution(newRow.institution_id);
	};

	// add cells to row
	row.appendChild(idCell);
	row.appendChild(nameCell);
	row.appendChild(addressCell);
	row.appendChild(countryCell);
	row.appendChild(websiteCell);
	row.appendChild(deleteCell);

	// add attribute so deleteRow function can find new row
	row.setAttribute("data-value", newRow.institution_id);

	// add row to table
	currentTable.appendChild(row);

	// find dropdown, create new option, fill data
	// append option to dropdown for AJAX to find without refreshing
	let selectMenu = document.getElementById("institutionSelect");
	let option = document.createElement("option");
    
	// TODO: update this!!!
	option.text = newRow.name + " " + newRow.address;
	option.value = newRow.institution_id;
	selectMenu.add(option);
};
