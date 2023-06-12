// `delete_research_paper_author.js` handles the client side for Delete requests
// to the `Research_Papers_has_Authors` junction table.
//
// Code citation:
// // Dr. Michael Curry. 2022. "Step 7 - Dynamically Deleting Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 9-61 (Curry)
function deleteResearchPaperAuthor(researchPaperAuthorId) {
	// Convert the target data into a JavaScript object.
	let data = {id: researchPaperAuthorId};

	// Prep the Asynchronous JavaScipt and XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("DELETE", "/delete-research_paper_author-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 204) {
			// Add the new data to the table and auto-refresh.
			deleteRow(researchPaperAuthorId);
			location.reload();
		} else if (xhttp.readyState == 4 && xhttp.status != 204) {
			console.log("There was an input error.");
		}
	};

	// Send the request and wait for the response.
	xhttp.send(JSON.stringify(data));
}

function deleteRow(researchPaperAuthorId) {
	let table = document.getElementById("research_papers_has_authors-table");

	// Loop and access assigned `row` variables.
	for (let index = 0, row; (row = table.rows[index]); index++) {
		if (
			table.rows[index].getAttribute("data-value") ==
			researchPaperAuthorId
		) {
			table.deleteRow(index);
			deleteDropDownMenu(researchPaperAuthorId);
			break;
		}
	}
}

// Dynamically delete from the dropdown menu.
function deleteDropDownMenu(researchPaperAuthorId) {
	let selectMenu = document.getElementById("researchPaperAuthorSelect");
	for (let index = 0; index < selectMenu.length; index++) {
		if (
			Number(selectMenu.options[index].value) ===
			Number(researchPaperAuthorId)
		) {
			selectMenu[index].remove();
			break;
		}
	}
}
