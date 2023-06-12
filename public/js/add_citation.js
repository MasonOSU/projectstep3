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
let addCitationForm = document.getElementById("add-citation-form-ajax");

// Alter needed objects.
addCitationForm.addEventListener("submit", function (e) {
	// Don't submit the form yet.
	e.preventDefault();

	// Retrieve the form's data.
	let inputCitingPaper = document.getElementById("citingPaperSelect");
	let inputCitedPaper = document.getElementById("citedPaperSelect");

	// Get the form's values.
	let citingPaperValue = inputCitingPaper.value;
	let citedPaperValue = inputCitedPaper.value;

	// Convert the data into a JavaScript object.
	let data = {
		citing_paper_id: citingPaperValue,
		cited_paper_id: citedPaperValue,
	};

	// Prep the Asynchronous JavaScript And XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/add-citation-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// Add the new data to the table and auto-refresh.
			addRowToTable(xhttp.response);
			location.reload();

			// Clear the inputs for the next transaction.
			inputCitingPaper.value = "";
			inputCitedPaper.value = "";
		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an input error.");
		}
	};

	// Send the request and wait on the reply.
	xhttp.send(JSON.stringify(data));
});

// Write an Object row as a single entity record.
addRowToTable = data => {
	// Find the current table, last row, and last object.
	let currentTable = document.getElementById("citations-table");
	let newRowIndex = currentTable.rows.length;
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1];

	// Create a new row with three cells.
	let row = document.createElement("TR");
	let idCell = document.createElement("TD");
	let citingPaperCell = document.createElement("TD");
	let citedPaperCell = document.createElement("TD");
	let deleteCell = document.createElement("TD");

	// Write the data.
	idCell.innerText = newRow.citation_id;
	citingPaperCell.innerText = newRow.citing_paper_id;
	citedPaperCell.innerText = newRow.cited_paper_id;

	// Create a delete button.
	deleteCell = document.createElement("button");
	deleteCell.innerHTML = "Delete";
	deleteCell.onclick = function () {
		deleteCitation(newRow.citation_id);
	};

	// Populate the row.
	row.appendChild(idCell);
	row.appendChild(citingPaperCell);
	row.appendChild(citedPaperCell);
	row.appendChild(deleteCell);

	// Let `deleteRow()` find the new row.
	row.setAttribute("data-value", newRow.citation_id);

	// Add the new row to the table.
	currentTable.appendChild(row);

	// Add the new row to the dropdown.
	let selectMenu = document.getElementById("input-citation-update");
	let option = document.createElement("option");

	// Populate the dropdown with `Research_Papers` data.
	option.text = newRow.citation_id;
	option.value = newRow.citation_id;
	selectMenu.add(option);
};
