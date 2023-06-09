// add event listener to form submission
let updateCitationForm = document.getElementById("update-citation-form-ajax");

updateCitationForm.addEventListener("submit", function (e) {
	
    // don't submit form
	e.preventDefault();

	// get input values
	let inputCitation = document.getElementById("citationSelect");
	let inputCitingPaperId = document.getElementById("citingPaperSelect");
	let inputCitedPaperId = document.getElementById("citedPaperSelect");

	// get form element values
	let citationId = inputCitation.value;
	let inputCitingPaperValue = inputCitingPaperId.value;
	let inputCitedPaperValue = inputCitedPaperId.value;

	// make object with form data
	let data = {citation_id: citationId, 
        citing_paper_id: inputCitingPaperValue,
        cited_paper_id: inputCitedPaperValue,};

	// make new request object
	var xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "/put-citation-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// define callback to handle response
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			updateRow(xhttp.response, researchPaperId);
			location.reload()
		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("input error");
		}
	};

	// send data as JSON
	xhttp.send(JSON.stringify(data));
});

function updateRow(data, citationId) {
	let parsedData = JSON.parse(data);

	// get table element
	let table = document.getElementById("citations-table");

	let parsedDataIndex = 0;
	for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
		if (parsedData[dataIndex].citation_id == citationId) {
			parsedDataIndex = dataIndex;
		}
	}

	for (let i = 0, row; (row = table.rows[i]); i++) {
		if (table.rows[i].getAttribute("data-value") == citationId) {
			// get row matching research_paper_id
			let updateRowIndex = table.getElementsByTagName("tr")[i];

			// get td values
			let tdCitingPaper = updateRowIndex.getElementsByTagName("td")[1];
			let tdCitedPaper = updateRowIndex.getElementsByTagName("td")[2];

			// reassign new values from parsedData to row
			tdCitingPaper.innerHTML = parsedData[parsedDataIndex].title;
			tdCitedPaper.innerHTML = parsedData[parsedDataIndex].date_published;}}}
