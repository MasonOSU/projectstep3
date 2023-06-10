// `update_citation.js` handles the client side for Update requests to the `Citations` table.
//
// Code citation:
// // Dr. Michael Curry. 2022. "Step 8 - Dynamically Updating Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 9-80 (Curry)
// Get the objects to modify.
let updateCitationForm = document.getElementById('update-citation-form-ajax');

// Alter needed objects.
updateCitationForm.addEventListener("submit", function (e) {
   
	// Don't submit the form yet.
    e.preventDefault();

	// Retrieve the form's data.
    let inputCitation = document.getElementById("input-citation-update");
    let inputCitingPaper = document.getElementById("input-citing_paper-update");
	let inputCitedPaper = document.getElementById("input-cited_paper-update");

	// Get the form's values.
    let citationId = inputCitation.value;
    let citingPaperValue = inputCitingPaper.value;
    let citedPaperValue = inputCitedPaper.value;

	// Convert the data into a JavaScript object.
    let data = {citation_id: citationId,
                citing_paper_id: citingPaperValue,
                cited_paper_id: citedPaperValue,};
    
	// Prep the Asynchronous JavaScript And XML (AJAX) request.
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-citation-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

			// Add the new data to the table and auto-refresh.
            updateRow(xhttp.response, citationId);
            location.reload();}

        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an input error.")}}

	// Send the request and wait on the reply.
    xhttp.send(JSON.stringify(data));});

// Write an Object row as a single entity record.
function updateRow(data, citationId) {

	// Find the current table, last row, and last object.
    let parsedData = JSON.parse(data);
    let table = document.getElementById("citations-table");
    let parsedDataIndex = 0;

    // Access rows with "row" variable assigned in the for loop.
    for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
      if (parsedData[dataIndex].citation_id == citationId) {
        parsedDataIndex = dataIndex;}}

	// Lines 66-80 were heavily aided by Curry,
	// but Zilton added the second loop and other code while debugging.
    for (let parsedIndex = 0, row; row = table.rows[parsedIndex]; parsedIndex++) {
       if (table.rows[parsedIndex].getAttribute("data-value") == citationId) {

			// Get the row matching `research_paper_id`.
            let updateRowIndex = table.getElementsByTagName("tr")[parsedIndex];

			// Get the cell values.
            let tdCitation = updateRowIndex.getElementsByTagName("td")[1];
            let tdCitingPaper = updateRowIndex.getElementsByTagName("td")[2];
            let tdCitedPaper = updateRowIndex.getElementsByTagName("td")[3];

			// Assign the new `parsedData` values to the row.
            tdCitation.innerHTML = parsedData[parsedDataIndex].citation_id; 
            tdCitingPaper.innerHTML = parsedData[parsedDataIndex].citing_paper_id;
            tdCitedPaper.innerHTML = parsedData[parsedDataIndex].cited_paper_id;}}}