// get objects to alter
let addResearchPaperForm = document.getElementById("add-research_paper-form-ajax");

// alter needed objects
addResearchPaperForm.addEventListener("submit", function (e) {
	
    // don't submit form
	e.preventDefault();

	// get forms for data retrieval
	let inputTitle = document.getElementById("input-title");
	let inputDatePublished = document.getElementById("input-date_published");
	let inputDoi = document.getElementById("input-doi");
	let inputInstitutionId = document.getElementById("institutionSelect");
	let inputDisciplineId = document.getElementById("disciplineSelect");

	// get form values
	let titleValue = inputTitle.value;
	let datePublishedValue = inputDatePublished.value;
	let doiValue = inputDoi.value;
	let institutionIdValue = inputInstitutionId.value;
	let disciplineIdValue = inputDisciplineId.value;

	// convert data to JavaScript object
	let data = {
		title: titleValue,
		date_published: datePublishedValue,
		doi: doiValue,
		institution_id: institutionIdValue,
		discipline_id: disciplineIdValue,
	};

	// prep AJAX request
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/add-research_paper-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// tell AJAX request how to resolve
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {

			// add new data to table
			addRowToTable(xhttp.response);
			location.reload()

			// clear inputs for another transaction
			inputTitle.value = "";
			inputDatePublished.value = "";
			inputDoi.value = "";
			inputInstitutionId.value = "";
			inputDisciplineId.value = "";

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
	let currentTable = document.getElementById("research_papers-table");

	// find last row for insert
	let newRowIndex = currentTable.rows.length;

	// find new row (last object)
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1];

	// create row, five cells
	let row = document.createElement("TR");
	let researchPaperIdCell = document.createElement("TD");
	let titleCell = document.createElement("TD");
	let datePublishedCell = document.createElement("TD");
	let doiCell = document.createElement("TD");
	let institutionIdCell = document.createElement("TD");
	let disciplineIdCell = document.createElement("TD");
	let deleteCell = document.createElement("TD");

	// write data
	researchPaperIdCell.innerText = newRow.research_paper_id;
	titleCell.innerText = newRow.title;

	datePublishedCell.innerText = newRow.date_published;
    const formattedDatePublishedCell = new Date(newRow.date_published).toLocaleDateString("en-US", {
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

    // make delete button
	deleteCell = document.createElement("button");
	deleteCell.innerHTML = "Delete";
    deleteCell.classList.add("delete-button");
	deleteCell.onclick = function () {
		deleteResearchPaper(newRow.research_paper_id);
	};

	// populate row
	row.appendChild(researchPaperIdCell);
	row.appendChild(titleCell);
	row.appendChild(datePublishedCell);
	row.appendChild(doiCell);
	row.appendChild(institutionIdCell);
	row.appendChild(disciplineIdCell);
    row.appendChild(deleteCell);

	// let deleteRow() find new row
	row.setAttribute("data-value", newRow.research_paper_id);

	// add row to table
	currentTable.appendChild(row);

	// let AJAX find dropdown update without refreshing
	let selectMenu = document.getElementById("researchPaperSelect");
	let option = document.createElement("option");

    // populate dropdown with research_papers
    option.text = newRow.title;
	option.value = newRow.research_paper_id;
	selectMenu.add(option);
};
