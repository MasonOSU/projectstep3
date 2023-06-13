// `update_research_paper_author.js` handles the client side for Update requests
// to the `Research_Papers_has_Authors` junction table.
//
// Code citation:
// // Dr. Michael Curry. 2022. "Step 8 - Dynamically Updating Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 10-100 (Curry)
// Get the objects to modify.
let updateResearchPapersHasAuthorsForm = document.getElementById(
	"update-research_papers_has_authors-form-ajax"
);

// Alter needed objects.
updateResearchPapersHasAuthorsForm.addEventListener("submit", function (e) {
	// Don't submit the form yet.
	e.preventDefault();

	// Retrieve the form's data.
	let inputResearchPaperAuthor = document.getElementById(
		"input-research_paper_author_id-update"
	);
	let inputPaperId = document.getElementById("input-paper_id-update");
	let inputName = document.getElementById("input-name-update");

	// Get the form's values.
	let researchPaperAuthorId = inputResearchPaperAuthor.value;
	let inputPaperIdValue = inputPaperId.value;
	let inputNameValue = inputName.value;

	console.log(inputPaperId, inputPaperIdValue);

	// Convert the data into a JavaScript object.
	let data = {
		research_paper_author_id: researchPaperAuthorId,
		paper_id: inputPaperIdValue,
		researcher_id: inputNameValue,
	};

	// Prep the Asynchronous JavaScript And XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "/put-research_paper_author-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// Add the new data to the table and auto-refresh.
			updateRow(xhttp.response, researchPaperAuthorId);
			location.reload();
		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an input error.");
		}
	};

	// Send the request and wait on the reply.
	xhttp.send(JSON.stringify(data));
});

// Write an Object row as a single entity record.
function updateRow(data, researchPaperAuthorId) {
	// Find the current table, last row, and last object.
	let parsedData = JSON.parse(data);
	let table = document.getElementById("research_papers_has_authors-table");
	let parsedDataIndex = 0;

	// Access rows with "row" variable assigned in the for loop.
	for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
		if (
			parsedData[dataIndex].research_paper_id == researchPaperAuthorId
		) {
			parsedDataIndex = dataIndex;
		}
	}

	// Lines 78-100 were heavily aided by Curry,
	// but Zilton added the nested loop and other code while debugging.
	for (
		let parsedIndex = 0, row;
		(row = table.rows[parsedIndex]);
		parsedIndex++
	) {
		if (
			table.rows[parsedIndex].getAttribute("data-value") ==
			researchPaperAuthorId
		) {
			// Get the row matching `research_paper_id`.
			let updateRowIndex =
				table.getElementsByTagName("tr")[parsedIndex];

			// Get the cell values.
			let tdPaperId = updateRowIndex.getElementsByTagName("td")[1];
			let tdName = updateRowIndex.getElementsByTagName("td")[2];

			// Assign the new `parsedData` values to the row.
			tdPaperId.innerHTML = parsedData[parsedDataIndex].paper_id;
			tdName.innerHTML = parsedData[parsedDataIndex].researcher_id;
		}
	}
}
