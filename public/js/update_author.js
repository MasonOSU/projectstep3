// `update_author.js` handles the client side for Update requests to the `Authors` table.
//
// Code citation:
// // Dr. Michael Curry. 2022. "Step 8 - Dynamically Updating Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 9-80 (Curry)
// Get the objects to modify.
let updateAuthorForm = document.getElementById("update-author-form-ajax");

// Alter needed objects.
updateAuthorForm.addEventListener("submit", function (e) {
	
	// Don't submit the form yet.
	e.preventDefault();

	// Retrieve the form's data.
	let inputAuthor = document.getElementById("authorIdSelect");
	let inputFirstName = document.getElementById("input-first_name-update");
	let inputLastName = document.getElementById("input-last_name-update");

	// Get the form's values.
	let authorId = inputAuthor.value;
	let firstNameValue = inputFirstName.value;
	let lastNameValue = inputLastName.value;

	// Convert the data into a JavaScript object.
	let data = {author_id: authorId,
				first_name: firstNameValue,
				last_name: lastNameValue,};
	console.log("this is data when updating a row: ", data);
	// Prep the Asynchronous JavaScript And XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "/put-author-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {

			// Add the new data to the table and auto-refresh.
			updateRow(xhttp.response, authorId);
			location.reload();} 
		
		else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an input error.");}};

	// Send the request and wait on the reply.
	xhttp.send(JSON.stringify(data));});

// Write an Object row as a single entity record.
function updateRow(data, authorId) {

	// Find the current table, last row, and last object.
	let parsedData = JSON.parse(data);
	let table = document.getElementById("authors-table");
	let parsedDataIndex = 0;

    // Access rows with "row" variable assigned in the for loop.
	for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
		if (parsedData[dataIndex].author_id == authorId) {
			parsedDataIndex = dataIndex;}}

	// Lines 66-80 were heavily aided by Curry,
	// but Zilton added the second loop and other code while debugging.
	for (let parsedIndex = 0, row; (row = table.rows[parsedIndex]); parsedIndex++) {
		if (table.rows[parsedIndex].getAttribute("data-value") == authorId) {

			// Get the row matching `research_paper_id`.
			let updateRowIndex = table.getElementsByTagName("tr")[parsedIndex];

			// Get the cell values.
			let tdFirstName = updateRowIndex.getElementsByTagName("td")[1];
			let tdLastName = updateRowIndex.getElementsByTagName("td")[2];

			// Assign the new `parsedData` values to the row.
			tdFirstName.innerHTML = parsedData[parsedDataIndex].first_name;
			tdLastName.innerHTML = parsedData[parsedDataIndex].last_name;}}}