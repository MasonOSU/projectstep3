// `delete_institution.js` handles the client side for Delete requests to the `Institutions` table.
//
// Code citation:
// // Dr. Michael Curry. 2022. "Step 7 - Dynamically Deleting Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 8-60 (Curry)
function deleteInstitution(institutionID) {
	// Convert the target data into a JavaScript object.
	let data = {
		id: institutionID,
	};
	// Prep the Asynchronous JavaScipt and XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("DELETE", "/delete-institution-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 204) {
			// Add the new data to the table and auto-refresh.
			deleteRow(institutionID);
			location.reload();
		} else if (xhttp.readyState == 4 && xhttp.status != 204) {
			console.log("There was an error with the input.");
		}
	};
	// Send the request and wait for the response.
	xhttp.send(JSON.stringify(data));
}

function deleteRow(institutionID) {
	let table = document.getElementById("institutions-table");
	// Loop and access assigned `row` variables.
	for (let i = 0, row; (row = table.rows[i]); i++) {
		if (table.rows[i].getAttribute("data-value") == institutionID) {
			table.deleteRow(i);
			deleteDropDownMenu(institutionID);
			break;
		}
	}
}

// Dynamically delete from the dropdown menu.
function deleteDropDownMenu(institutionID) {
	let selectMenu = document.getElementById("institutionSelect");
	for (let i = 0; i < selectMenu.length; i++) {
		if (Number(selectMenu.options[i].value) === Number(institutionID)) {
			selectMenu[i].remove();
			break;
		}
	}
}
