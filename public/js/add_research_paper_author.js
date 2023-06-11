// `add_research_paper_author.js` handles the client side for Create requests to 
// the `Research_paper_has_Authors` junction table.
//
// Code citation:
// // Dr. Michael Curry. 2022.
// // "Step 5 - Adding New Data".
// // "Step 6 - Dynamically Filling Dropdowns and Adding a Search Box."
// // "Step 7 - Dynamically Deleting Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 12-99 (Curry)
// Get the objects to modify.
let addResearchPaperHasAuthorsForm = document.getElementById("add-research_papers_has_authors-form-ajax");

// Alter needed objects.
addResearchPaperHasAuthorsForm.addEventListener("submit", function (e) {
    
	// Don't submit the form yet.
	e.preventDefault();

	// Retrieve the form's data.
	let inputPaperId = document.getElementById("researchPaperSelect");
	let inputName = document.getElementById("authorSelect");

	// Get the form's values.
	let inputPaperIdValue = inputPaperId.value;
	let inputNameValue = inputName.value;

	// Convert the data into a JavaScript object.
	let data = {paper_id: inputPaperIdValue,
				name: inputNameValue,};

    console.log(data);

	// Prep the Asynchronous JavaScript And XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/add-research_paper_author-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {

			// Add the new data to the table and auto-refresh.
			addRowToTable(xhttp.response);
			location.reload();

			// Clear the inputs for the next transaction.
			inputPaperIdValue.value = "";
			inputNameValue.value = "";} 
		
		else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an input error.");}};

	// Send the request and wait on the reply.
	xhttp.send(JSON.stringify(data));});

// Write an Object row as a single entity record.
addRowToTable = data => {

	// Find the current table, last row, and last object.
	let currentTable = document.getElementById("research_papers_has_authors-table");
	let newRowIndex = currentTable.rows.length;
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1];

	// Create a new row with three cells.
	let row = document.createElement("TR");
	let idCell = document.createElement("TD");
	let paperIdCell = document.createElement("TD");
	let nameCell = document.createElement("TD");
	let deleteCell = document.createElement("TD");

	// Write the data.
	idCell.innerText = newRow.research_paper_author_id;
	paperIdCell.innerText = newRow.paper_id;
	nameCell.innerText = newRow.name;

	// Create a delete button.
	deleteCell = document.createElement("button");
	deleteCell.innerHTML = "Delete";
	deleteCell.onclick = 
        function () {deleteResearchPapersHasAuthors(newRow.research_paper_author_id);};

	// Populate the row.
	row.appendChild(idCell);
	row.appendChild(paperIdCell);
	row.appendChild(nameCell);
	row.appendChild(deleteCell);

	// Let `deleteRow()` find the new row.
	row.setAttribute("data-value", newRow.research_paper_author_id);

	// Add the new row to the table.
	currentTable.appendChild(row);

	// Add the new row to the dropdown.
	let selectMenu = document.getElementById("researchPaperSelect");
	let option = document.createElement("option");

	// Populate the dropdown with `Research_Papers` data.
	option.text = newRow.research_paper_author_id;
	option.value = newRow.research_paper_author_id;
	selectMenu.add(option);};