let updateResearchPaperForm = document.getElementById("update-research_paper-form-ajax");
updateResearchPaperForm.addEventListener("submit", function (e) {
	e.preventDefault();

	let inputPaper = document.getElementById("paperSelect");
    let inputTitle = document.getElementById("input-title-update");
	let inputDate = document.getElementById("input-date_published-update");
	let inputDoi = document.getElementById("input-doi-update");
    let inputInstitution = document.getElementById("input-institution-update");
    let inputDiscipline = document.getElementById("input-discipline-update");

    let paperID = inputPaper.value;
    let inputTitleValue = inputTitle.value;
	let inputDateValue = inputDate.value;
	let inputDoiValue = inputDoi.value;
    let inputInstitutionValue = inputInstitution.value;
    let inputDisciplineValue = inputDiscipline.value;

	let data = {
		research_paper_id: paperID,
		title: inputTitleValue,
        date_published: inputDateValue,
        doi: inputDoiValue,
        institution_id: inputInstitutionValue,
        discipline_id: inputDisciplineValue
	};

	var xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "/put-research_paper-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			updateRow(xhttp.response, paperID);
		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an error with the input.");
		}
	};

	xhttp.send(JSON.stringify(data));
});

function updateRow(data, paperID) {
	let parsedData = JSON.parse(data);

	let table = document.getElementById("research_papers-table");

	let parsedDataIndex = 0;
	for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
		if (parsedData[dataIndex].research_paper_id == paperID) {
			parsedDataIndex = dataIndex;
		}
	}

	for (let i = 0, row; (row = table.rows[i]); i++) {
		// iterate through rows
		// rows accessed using row variable in for loop
		if (table.rows[i].getAttribute("data-value") == paperID) {
			// get row matching author ID
			let updateRowIndex = table.getElementsByTagName("tr")[i];

			// get td values
			let tdTitle = updateRowIndex.getElementsByTagName("td")[1];
			let tdDate = updateRowIndex.getElementsByTagName("td")[2];
            let tdDoi = updateRowIndex.getElementsByTagName("td")[3];
			let tdInstitution = updateRowIndex.getElementsByTagName("td")[4];
			let tdDiscipline = updateRowIndex.getElementsByTagName("td")[5];

			// reassign new values from parsedData to row
			tdTitle.innerHTML = parsedData[parsedDataIndex].title;
			tdDate.innerHTML = parsedData[parsedDataIndex].date_published;
            tdDoi.innerHTML = parsedData[parsedDataIndex].doi;
            tdInstitution.innerHTML = parsedData[parsedDataIndex].institution_id;
            tdDiscipline.innerHTML = parsedData[parsedDataIndex].discipline_id;
		}
	}
}
