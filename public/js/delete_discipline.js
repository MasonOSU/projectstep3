function deleteDiscipline(disciplineID) {
	// put data to send in JS object
	let data = {
		id: disciplineID,
	};

	// prep AJAX request
	var xhttp = new XMLHttpRequest();
	xhttp.open("DELETE", "/delete-discipline-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// tell AJAX request how to resolve
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 204) {
			// add new data
			deleteRow(disciplineID);
			location.reload()
		} else if (xhttp.readyState == 4 && xhttp.status != 204) {
			console.log("There was an error with the input.");
		}
	};
	// send request, wait for response
	xhttp.send(JSON.stringify(data));
}

function deleteRow(disciplineID) {
	let table = document.getElementById("disciplines-table");
	for (let i = 0, row; (row = table.rows[i]); i++) {
		// loop rows with assigned variable
		if (table.rows[i].getAttribute("data-value") == disciplineID) {
			table.deleteRow(i);
			deleteDropDownMenu(disciplineID);
			break;
		}
	}
}

function deleteDropDownMenu(disciplineID) {
	let selectMenu = document.getElementById("disciplineSelect");
	for (let i = 0; i < selectMenu.length; i++) {
		if (Number(selectMenu.options[i].value) === Number(disciplineID)) {
			selectMenu[i].remove();
			break;
		}
	}
}
