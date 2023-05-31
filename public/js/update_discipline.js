// Get the objects we need to modify
let updateDisciplineForm = document.getElementById('update-discipline-form-ajax');

// Modify the objects we need
updateDisciplineForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDiscipline = document.getElementById("disciplineSelect");
    let inputField = document.getElementById("input-field_name");

    // Get the values from the form field
    let disciplineID = inputDiscipline.value;
    let fieldValue = inputField.value;

    console.log("this is disciplineID: ", disciplineID);
    console.log("this is fieldValue: ", fieldValue);


    // Put our data we want to send in a javascript object
    let data = {
        discipline_id: disciplineID,
        field: fieldValue,
    }
    console.log("this is data: ", data);

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-discipline-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, disciplineID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, disciplineID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("disciplines-table");

    let parsedDataIndex = 0;
    for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
        if (parsedData[dataIndex].discipline_id == disciplineID) {
            parsedDataIndex = dataIndex;
        }
    }

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == disciplineID) {

            // Get the location of the row where we found the matching disciplineID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tdField = updateRowIndex.getElementsByTagName("td")[1];
            //console.log("inner html", parsedData[parsedDataIndex].field);
            // reassign new values from parsedData to row in table
            tdField.innerHTML = parsedData[parsedDataIndex].field;
        }
    }
}
