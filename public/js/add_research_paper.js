// `add_research_paper.js` handles the client side for Create requests to the `Research_Papers` table.
//
// Code citation:
// // Dr. Michael Curry. 2022.
// // "Step 5 - Adding New Data".
// // "Step 6 - Dynamically Filling Dropdowns and Adding a Search Box."
// // "Step 7 - Dynamically Deleting Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 12-147 (Curry)
// Get the objects to modify.
let addResearchPaperForm = document.getElementById(
	"add-research_paper-form-ajax"
);

// Alter needed objects.
addResearchPaperForm.addEventListener("submit", function (e) {
	// Don't submit the form yet.
	e.preventDefault();

	// Retrieve the form's data.
	let inputTitle = document.getElementById("input-title");
	let inputDatePublished = document.getElementById("input-date_published");
	let inputDoi = document.getElementById("input-doi");
	let inputInstitutionId = document.getElementById("institutionSelect");
	let inputDisciplineId = document.getElementById("disciplineSelect");

	// Get the form's values.
	let titleValue = inputTitle.value;
	let datePublishedValue = inputDatePublished.value;
	let doiValue = inputDoi.value;
	let institutionIdValue = inputInstitutionId.value;
	let disciplineIdValue = inputDisciplineId.value;

	// Convert the data into a JavaScript object.
	let data = {
		title: titleValue,
		date_published: datePublishedValue,
		doi: doiValue,
		institution_id: institutionIdValue,
		discipline_id: disciplineIdValue,
	};
	console.log("this is data: ", data);
	// Prep the Asynchronous JavaScript And XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/add-research_paper-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// Add the new data to the table and auto-refresh.
			addRowToTable(xhttp.response);
			location.reload();

			// Clear the inputs for the next transaction.
			inputTitle.value = "";
			inputDatePublished.value = "";
			inputDoi.value = "";
			inputInstitutionId.value = "";
			inputDisciplineId.value = "";
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
	let currentTable = document.getElementById("research_papers-table");
	let newRowIndex = currentTable.rows.length;
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1];

	// Create a new row with five cells.
	let row = document.createElement("TR");
	let researchPaperIdCell = document.createElement("TD");
	let titleCell = document.createElement("TD");
	let datePublishedCell = document.createElement("TD");
	let doiCell = document.createElement("TD");
	let institutionIdCell = document.createElement("TD");
	let disciplineIdCell = document.createElement("TD");
	let deleteCell = document.createElement("TD");

	// Write the data.
	researchPaperIdCell.innerText = newRow.research_paper_id;
	titleCell.innerText = newRow.title;

	// Format the date values for readability — e.g., "Jan. 1, 2023".
	datePublishedCell.innerText = newRow.date_published;

	const formattedDatePublishedCell = new Date(
		newRow.date_published
	).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	datePublishedCell.innerText = formattedDatePublishedCell;
	datePublishedCell.classList.add("date_published-cell");

	doiCell.innerText = newRow.doi;
	doiCell.classList.add("doi-cell");

	institutionIdCell.innerText = newRow.institution_id;
	institutionIdCell.classList.add("institution_id-cell");

	disciplineIdCell.innerText = newRow.discipline_id;
	disciplineIdCell.classList.add("discipline_id-cell");

	// Create a delete button.
	deleteCell = document.createElement("button");
	deleteCell.innerHTML = "Delete";
	deleteCell.classList.add("delete-button");
	deleteCell.onclick = function () {
		deleteResearchPaper(newRow.research_paper_id);
	};

	// Populate the row.
	row.appendChild(researchPaperIdCell);
	row.appendChild(titleCell);
	row.appendChild(datePublishedCell);
	row.appendChild(doiCell);
	row.appendChild(institutionIdCell);
	row.appendChild(disciplineIdCell);
	row.appendChild(deleteCell);

	// Let `deleteRow()` find the new row.
	row.setAttribute("data-value", newRow.research_paper_id);

	// Add the new row to the table.
	currentTable.appendChild(row);

	// Let the AJAX request view an updated dropdown menu without refreshing.
	let selectMenu = document.getElementById("researchPaperSelect");
	let option = document.createElement("option");

	// Populate the dropdown with `Research_Papers` data.
	option.text = newRow.title;
	option.value = newRow.research_paper_id;
	selectMenu.add(option);
};
