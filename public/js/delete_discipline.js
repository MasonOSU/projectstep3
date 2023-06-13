// `delete_discipline.js` handles the client side for Delete requests to the `Disciplines` table.
//
// Code citation:
// // Dr. Michael Curry. 2022. "Step 7 - Dynamically Deleting Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 8-54 (Curry)
function deleteDiscipline(disciplineID) {
	// Convert the target data into a JavaScript object.
	let data = {
		id: disciplineID,
	};
	// Prep the Asynchronous JavaScipt and XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("DELETE", "/delete-discipline-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 204) {
			// Add the new data to the table and auto-refresh.
			deleteRow(disciplineID);
			location.reload();
		} else if (xhttp.readyState == 4 && xhttp.status != 204) {
			console.log("There was an error with the input.");
		}
	};
	// Send the request and wait for the response.
	xhttp.send(JSON.stringify(data));
}

function deleteRow(disciplineID) {
	console.log("discipline id passed into delete row: ", disciplineID);
	let table = document.getElementById("disciplines-table");
	// Loop and access assigned `row` variables.
	for (let i = 0, row; (row = table.rows[i]); i++) {
		if (table.rows[i].getAttribute("data-value") == disciplineID) {
			table.deleteRow(i);
			deleteDropDownMenu(disciplineID);
			break;
		}
	}
}

// Dynamically delete from the dropdown menu.
function deleteDropDownMenu(disciplineID) {
	let selectMenu = document.getElementById("disciplineSelect");
	for (let i = 0; i < selectMenu.length; i++) {
		if (Number(selectMenu.options[i].value) === Number(disciplineID)) {
			selectMenu[i].remove();
			break;
		}
	}
}
