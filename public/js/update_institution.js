// `update_institution.js` handles the client side for Update requests to the `Institutions` table.
//
// Code citation:
// // Dr. Michael Curry. 2022. "Step 8 - Dynamically Updating Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 9-96 (Curry)
// Get the objects to modify.
let updateInstitutionForm = document.getElementById(
	"update-institution-form-ajax"
);

// Alter needed objects.
updateInstitutionForm.addEventListener("submit", function (e) {
	// Don't submit the form yet.
	e.preventDefault();

	// Retrieve the form's data.
	let inputInstitution = document.getElementById("institutionSelect");
	let inputName = document.getElementById("input-name_update");
	let inputAddress = document.getElementById("input-address_update");
	let inputCountry = document.getElementById("input-country_update");
	let inputWebsite = document.getElementById("input-website_update");

	// Get the form's values.
	let institutionID = inputInstitution.value;
	let nameValue = inputName.value;
	let addressValue = inputAddress.value;
	let countryValue = inputCountry.value;
	let websiteValue = inputWebsite.value;

	// Convert the data into a JavaScript object.
	let data = {
		institution_id: institutionID,
		name: nameValue,
		address: addressValue,
		country: countryValue,
		website: websiteValue,
	};

	// Prep the Asynchronous JavaScript And XML (AJAX) request.
	var xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "/put-institution-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell the AJAX request how to resolve.
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// Add the new data to the table and auto-refresh.
			updateRow(xhttp.response, institutionID);
			location.reload();
		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an error with the input.");
		}
	};

	// Send the request and wait on the reply.
	xhttp.send(JSON.stringify(data));
});

// Write an Object row as a single entity record.
function updateRow(data, institutionID) {
	// Find the current table, last row, and last object.
	let parsedData = JSON.parse(data);
	let table = document.getElementById("institutions-table");
	let parsedDataIndex = 0;

	// Access rows with "row" variable assigned in the for loop.
	for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
		if (parsedData[dataIndex].institution_id == institutionID) {
			parsedDataIndex = dataIndex;
		}
	}

	// Lines 77-95 were heavily aided by Curry,
	// but Zilton added the second loop and other code while debugging.
	for (let i = 0, row; (row = table.rows[i]); i++) {
		if (table.rows[i].getAttribute("data-value") == institutionID) {
			// Get the row matching `research_paper_id`.
			let updateRowIndex = table.getElementsByTagName("tr")[i];

			// Get the cell values.
			let tdName = updateRowIndex.getElementsByTagName("td")[1];
			let tdAddress = updateRowIndex.getElementsByTagName("td")[2];
			let tdCountry = updateRowIndex.getElementsByTagName("td")[3];
			let tdWebsite = updateRowIndex.getElementsByTagName("td")[4];

			// Assign the new `parsedData` values to the row.
			tdName.innerHTML = parsedData[parsedDataIndex].name;
			tdAddress.innerHTML = parsedData[parsedDataIndex].address;
			tdCountry.innerHTML = parsedData[parsedDataIndex].country;
			tdWebsite.innerHTML = parsedData[parsedDataIndex].website;
		}
	}
}
