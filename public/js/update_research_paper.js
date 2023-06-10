// `update_research_paper.js` handles the client side for Update requests to the `Research_Papers` table.
//
// Code citation:
// // Dr. Michael Curry. 2022. "Step 8 - Dynamically Updating Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 9-72 (Curry)
// Get the objects to modify.
let updateResearchPaperForm = 
	document.getElementById("update-research_paper-form-ajax");

// Alter needed objects.
updateResearchPaperForm.addEventListener("submit", function (e) {
	
	// Don't submit the form yet.
	e.preventDefault();

	// Retrieve the form's data.
	let inputResearchPaper = document.getElementById("researchPaperSelect");
	let inputTitle = document.getElementById("input-title-update");
	let inputDatePublished = document.getElementById("input-date_published-update");
	let inputDoi = document.getElementById("input-doi-update");
	let inputInstitutionId = document.getElementById("input-institution-update");
	let inputDisciplineId = document.getElementById("input-discipline-update");

	// Get the form's values.
	let researchPaperId = inputResearchPaper.value;
	let inputTitleValue = inputTitle.value;
	let inputDatePublishedValue = inputDatePublished.value;
	let inputDoiValue = inputDoi.value;
	let inputInstitutionIdValue = inputInstitutionId.value;
	let inputDisciplineIdValue = inputDisciplineId.value;

	// Convert the data into a JavaScript object.
	let data = {research_paper_id: researchPaperId,
				title: inputTitleValue,
				date_published: inputDatePublishedValue,
				doi: inputDoiValue,
				institution_id: inputInstitutionIdValue,
				discipline_id: inputDisciplineIdValue,};

	// Prep the Asynchronous JavaScript And XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "/put-research_paper-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {

			// Add the new data to the table and auto-refresh.
			updateRow(xhttp.response, researchPaperId);
			location.reload();} 
		
		else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an input error.");}};

	// Send the request and wait on the reply.
	xhttp.send(JSON.stringify(data));});

// Write an Object row as a single entity record.
function updateRow(data, researchPaperId) {
	
	// Find the current table, last row, and last object.
	let parsedData = JSON.parse(data);
	let table = document.getElementById("research_papers-table");
	let parsedDataIndex = 0;
	
    // Access rows with "row" variable assigned in the for loop.
	for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
		if (parsedData[dataIndex].research_paper_id == researchPaperId) {
			parsedDataIndex = dataIndex;}}
			
			// Lines 75-93 were heavily aided by Curry,
			// but Zilton added the nested loop and other code while debugging.
			for (let parsedIndex = 0, row; (row = table.rows[parsedIndex]); parsedIndex++) {
				if (table.rows[parsedIndex].getAttribute("data-value") == researchPaperId) {
					
					// Get the row matching `research_paper_id`.
					let updateRowIndex = table.getElementsByTagName("tr")[parsedIndex];

					// Get the cell values.
					let tdTitle = updateRowIndex.getElementsByTagName("td")[1];
					let tdDatePublished = updateRowIndex.getElementsByTagName("td")[2];
					let tdDoi = updateRowIndex.getElementsByTagName("td")[3];
					let tdInstitutionId = updateRowIndex.getElementsByTagName("td")[4];
					let tdDisciplineId = updateRowIndex.getElementsByTagName("td")[5];

					// Assign the new `parsedData` values to the row.
					tdTitle.innerHTML = parsedData[parsedDataIndex].title;
					tdDatePublished.innerHTML = parsedData[parsedDataIndex].date_published;
					tdDoi.innerHTML = parsedData[parsedDataIndex].doi;
					tdInstitutionId.innerHTML = parsedData[parsedDataIndex].institution_id;
					tdDisciplineId.innerHTML = parsedData[parsedDataIndex].discipline_id;}}}