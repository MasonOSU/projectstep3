// `update_discipline.js` handles the client side for Update requests to the `Disciplines` table.
//
// Code citation:
// // Dr. Michael Curry. 2022. "Step 8 - Dynamically Updating Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 9-96 (Curry)
// Get the objects to modify.
let updateDisciplineForm = document.getElementById(
	"update-discipline-form-ajax"
);

// Alter needed objects.
updateDisciplineForm.addEventListener("submit", function (e) {
	// Don't submit the form yet.
	e.preventDefault();

	// Retrieve the form's data.
	let inputDiscipline = document.getElementById("disciplineSelect");
	let inputField = document.getElementById("input-field_name");

	// Get the form's values.
	let disciplineID = inputDiscipline.value;
	let fieldValue = inputField.value;

	// Convert the data into a JavaScript object.
	let data = {
		discipline_id: disciplineID,
		field: fieldValue,
	};
	console.log("this is data: ", data);

	// Prep the Asynchronous JavaScript And XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "/put-discipline-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// Add the new data to the table and auto-refresh.
			updateRow(xhttp.response, disciplineID);
			location.reload();
		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an error with the input.");
		}
	};

	// Send the request and wait on the reply.
	xhttp.send(JSON.stringify(data));
});

// Write an Object row as a single entity record.
function updateRow(data, disciplineID) {
	// Find the current table, last row, and last object.
	let parsedData = JSON.parse(data);
	let table = document.getElementById("disciplines-table");
	let parsedDataIndex = 0;

	// Access rows with "row" variable assigned in the for loop.
	for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
		if (parsedData[dataIndex].discipline_id == disciplineID) {
			parsedDataIndex = dataIndex;
		}
	}

	// Lines 69-81 were heavily aided by Curry,
	// but Zilton added the second loop and other code while debugging.
	for (let i = 0, row; (row = table.rows[i]); i++) {
		if (table.rows[i].getAttribute("data-value") == disciplineID) {
			// Get the row matching `research_paper_id`.
			let updateRowIndex = table.getElementsByTagName("tr")[i];

			// Get the cell values.
			let tdField = updateRowIndex.getElementsByTagName("td")[1];

			// Assign the new `parsedData` values to the row.
			tdField.innerHTML = parsedData[parsedDataIndex].field;
		}
	}
}
