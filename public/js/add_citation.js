// get objects to alter
let addCitationForm = document.getElementById("add-citation-form-ajax");

// alter needed objects
addCitationForm.addEventListener("submit", function (e) {
	// don't submit form
	e.preventDefault();

	// get forms for data retrieval
	let inputCitingPaper = document.getElementById("citingPaperSelect");
	let inputCitedPaper = document.getElementById("citedPaperSelect");

	// get form values
	let citingPaperValue = inputCitingPaper.value;
	let citedPaperValue = inputCitedPaper.value;

	console.log("this is values for new citation: ", citingPaperValue, citedPaperValue);
	// convert data to JavaScript object
	let data = {
		citing_paper_id: citingPaperValue,
		cited_paper_id: citedPaperValue,
	};
	console.log("this is data: ", data);

	// prep AJAX request
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/add-citation-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// tell AJAX request to resolve
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// add new data to table
			addRowToTable(xhttp.response);

			// clear inputs for new transaction
			inputCitingPaper.value = "";
			inputCitedPaper.value = "";
		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an error with the input.");
		}
	};

	// send request, wait on response
	xhttp.send(JSON.stringify(data));
});

// write one row to Object — i.e., a single Authors record
addRowToTable = data => {
	// Get reference to current table on page, clear it
	let currentTable = document.getElementById("citations-table");

	// find where to insert new row — i.e., the last table row
	let newRowIndex = currentTable.rows.length;

	// get reference to new row from database query — i.e., the last object
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1];

	// create row, three cells
	let row = document.createElement("TR");
	let idCell = document.createElement("TD");
	let citingPaperCell = document.createElement("TD");
	let citedPaperCell = document.createElement("TD");
	let deleteCell = document.createElement("TD");

	// write correct data to cells
	idCell.innerText = newRow.citation_id;
	citingPaperCell.innerText = newRow.citing_paper_id;
	citedPaperCell.innerText = newRow.cited_paper_id;

	deleteCell = document.createElement("button");
	deleteCell.innerHTML = "Delete";
	deleteCell.onclick = function () {
		deleteCitation(newRow.citation_id);
	};

	// add cells to row
	row.appendChild(idCell);
	row.appendChild(citingPaperCell);
	row.appendChild(citedPaperCell);
	row.appendChild(deleteCell);

	// add row attribute so deleteRow function can find new row
	row.setAttribute("data-value", newRow.citation_id);

	// add row to table
	currentTable.appendChild(row);

	// find dropdown, make new option, fill data;
	// append option to dropdown so AJAX can find without refreshing
	let selectMenu = document.getElementById("citationIDUpdate");
	let option = document.createElement("option");
	option.text = newRow.citation_id;
	option.value = newRow.citation_id;
	selectMenu.add(option);
};
