// add event listener to form submission
let updateResearchPaperForm = document.getElementById(
	"update-research_paper-form-ajax"
);
updateResearchPaperForm.addEventListener("submit", function (e) {
	// don't submit form
	e.preventDefault();

	// get input values
	let inputResearchPaper = document.getElementById("researchPaperSelect");
	let inputTitle = document.getElementById("input-title-update");
	let inputDatePublished = document.getElementById("input-date_published-update");
	let inputDoi = document.getElementById("input-doi-update");
	let inputInstitutionId = document.getElementById("input-institution-update");
	let inputDisciplineId = document.getElementById("input-discipline-update");

	// get form element values
	let researchPaperId = inputResearchPaper.value;
	let inputTitleValue = inputTitle.value;
	let inputDatePublishedValue = inputDatePublished.value;
	let inputDoiValue = inputDoi.value;
	let inputInstitutionIdValue = inputInstitutionId.value;
	let inputDisciplineIdValue = inputDisciplineId.value;

	// make object with form data
	let data = {
		research_paper_id: researchPaperId,
		title: inputTitleValue,
		date_published: inputDatePublishedValue,
		doi: inputDoiValue,
		institution_id: inputInstitutionIdValue,
		discipline_id: inputDisciplineIdValue,
	};

	// make new request object
	var xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "/put-research_paper-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// define callback to handle response
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			updateRow(xhttp.response, researchPaperId);
		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("input error");
		}
	};

	// send data as JSON
	xhttp.send(JSON.stringify(data));
});

function updateRow(data, researchPaperId) {
	let parsedData = JSON.parse(data);

	// get table element
	let table = document.getElementById("research_papers-table");

	let parsedDataIndex = 0;
	for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
		if (parsedData[dataIndex].research_paper_id == researchPaperId) {
			parsedDataIndex = dataIndex;
		}
	}

	for (let i = 0, row; (row = table.rows[i]); i++) {
		if (table.rows[i].getAttribute("data-value") == researchPaperId) {
			// get row matching research_paper_id
			let updateRowIndex = table.getElementsByTagName("tr")[i];

			// get td values
			let tdTitle = updateRowIndex.getElementsByTagName("td")[1];
			let tdDatePublished =
				updateRowIndex.getElementsByTagName("td")[2];
			let tdDoi = updateRowIndex.getElementsByTagName("td")[3];
			let tdInstitutionId =
				updateRowIndex.getElementsByTagName("td")[4];
			let tdDisciplineId =
				updateRowIndex.getElementsByTagName("td")[5];

			// reassign new values from parsedData to row
			tdTitle.innerHTML = parsedData[parsedDataIndex].title;
			tdDatePublished.innerHTML =
				parsedData[parsedDataIndex].date_published;
			tdDoi.innerHTML = parsedData[parsedDataIndex].doi;
			tdInstitutionId.innerHTML =
				parsedData[parsedDataIndex].institution_id;
			tdDisciplineId.innerHTML =
				parsedData[parsedDataIndex].discipline_id;
		}
	}
}
