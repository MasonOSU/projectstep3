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

	// convert data to JavaScript object
	let data = {
		first_name: firstNameValue,
		last_name: lastNameValue,
	};

	// prep AJAX request
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/add-author-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// tell AJAX request how to resolve
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {

			// add new data to table
			addRowToTable(xhttp.response);

			// clear inputs for new transaction
			inputFirstName.value = "";
			inputLastName.value = "";

		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("input error");
		}
	};

	// send request, wait on reply
	xhttp.send(JSON.stringify(data));
});

// write one row as Object (single entity record)
addRowToTable = data => {

	// find current table, clear it
	let currentTable = document.getElementById("authors-table");

	// find last row for insert
	let newRowIndex = currentTable.rows.length;

	// find new row (last object)
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1];

	// create row, three cells
	let row = document.createElement("TR");
	let authorIdCell = document.createElement("TD");
	let firstNameCell = document.createElement("TD");
	let lastNameCell = document.createElement("TD");
	let deleteCell = document.createElement("TD");

	// write data
	authorIdCell.innerText = newRow.author_id;
	firstNameCell.innerText = newRow.first_name;
	lastNameCell.innerText = newRow.last_name;

	// make delete button
	deleteCell = document.createElement("button");
	deleteCell.innerHTML = "Delete";
	deleteCell.onclick = function () {
		deleteAuthor(newRow.author_id);
	};

	// populate row
	row.appendChild(authorIdCell);
	row.appendChild(firstNameCell);
	row.appendChild(lastNameCell);
	row.appendChild(deleteCell);

	// let deleteRow() find new row
	row.setAttribute("data-value", newRow.author_id);

	// add row to table
	currentTable.appendChild(row);

	// let AJAX find dropdown update without refreshing
	let selectMenu = document.getElementById("authorSelect");
	let option = document.createElement("option");
	option.text = newRow.first_name + " " + newRow.last_name;
	option.value = newRow.author_id;
	selectMenu.add(option);
};
