// `delete_citation.js` handles the client side for Delete requests to the `Citations` table.
//
// Code citation:
// // Dr. Michael Curry. 2022. "Step 7 - Dynamically Deleting Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 8-54 (Curry)
function deleteCitation(citationId) {
	// Convert the target data into a JavaScript object.
	let data = {id: citationId};

	// Prep the Asynchronous JavaScipt and XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("DELETE", "/delete-citation-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 204) {
			// Add the new data to the table and auto-refresh.
			deleteRow(citationId);
			location.reload();
		} else if (xhttp.readyState == 4 && xhttp.status != 204) {
			console.log("There was an input error.");
		}
	};

	// Send the request and wait for the response.
	xhttp.send(JSON.stringify(data));
}

function deleteRow(citationId) {
	let table = document.getElementById("citations-table");

	// Loop and access assigned `row` variables.
	for (let index = 0, row; (row = table.rows[index]); index++) {
		if (table.rows[index].getAttribute("data-value") == citationId) {
			table.deleteRow(index);
			deleteDropDownMenu(citationId);
			break;
		}
	}
}

// Dynamically delete from the dropdown menu.
function deleteDropDownMenu(citationId) {
	let selectMenu = document.getElementById("citationSelect");
	for (let i = 0; i < selectMenu.length; i++) {
		if (Number(selectMenu.options[i].value) === Number(citationId)) {
			selectMenu[i].remove();
			break;
		}
	}
}
