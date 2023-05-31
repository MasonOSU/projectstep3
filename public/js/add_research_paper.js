// Get the objects we need to modify
let addResearchPaperForm = document.getElementById('add-research-paper-form-ajax');

// Modify the objects we need
addResearchPaperForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("input-title");
    let inputDatePub = document.getElementById("input-date_published");
    let inputDoi = document.getElementById("input-doi");
    let inputInstitution = document.getElementById("institutionIdSelect");
    let inputDiscipline = document.getElementById("disciplineIdSelect");
    console.log("inputInstitution: ", inputInstitution);

    // Get the values from the form fields
    let titleValue = inputTitle.value;
    let datePubValue = inputDatePub.value;
    let doiValue = inputDoi.value;
    let institutionValue = inputInstitution.value;
    let disciplineValue = inputDiscipline.value;
    console.log("this is diciplineid value: ", disciplineValue);

    // Put our data we want to send in a javascript object
    let data = {
        title: titleValue,
        date_published: datePubValue,
        doi: doiValue,
        institution_id: institutionValue,
        discipline_id: disciplineValue,
    };

    console.log("this is data again", data);

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-research-paper-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTitle.value = '';
            inputDatePub.value = '';
            inputDoi.value = '';
            inputInstitution.value = '';
            inputDiscipline.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("research_papers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let datePublishedCell = document.createElement("TD");
    let doiCell = document.createElement("TD");
    let institutionIdCell = document.createElement("TD");
    let disciplineIdCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.research_paper_id;
    titleCell.innerText = newRow.title;
    datePublishedCell.innerText = newRow.date_published;
    doiCell.innerText = newRow.doi;
    institutionIdCell.innerText = newRow.institution_id;
    disciplineIdCell.innerText = newRow.discipline_id;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteResearchPaper(newRow.research_paper_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(datePublishedCell);
    row.appendChild(doiCell);
    row.appendChild(institutionIdCell);
    row.appendChild(disciplineIdCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.research_paper_id);

    // Add the row to the table
    currentTable.appendChild(row);
}