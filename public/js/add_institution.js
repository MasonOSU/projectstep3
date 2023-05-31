// Get the objects we need to modify
let addInstitutionForm = document.getElementById('add-institution-form-ajax');

// Modify the objects we need
addInstitutionForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputAddress = document.getElementById("input-address");
    let inputCity = document.getElementById("input-city");
    let inputCountry = document.getElementById("input-country");
    let inputWebsite = document.getElementById("input-website");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let addressValue = inputAddress.value;
    let cityValue = inputCity.value;
    let countryValue = inputCountry.value;
    let websiteValue = inputWebsite.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        address: addressValue,
        city: cityValue,
        country: countryValue,
        website: websiteValue
    }
    console.log("data we are passing in: ", data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-institution-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputAddress.value = '';
            inputCity.value = '';
            inputCountry.value = '';
            inputWebsite.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Institutions
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("institutions-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let countryCell = document.createElement("TD");
    let websiteCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.institution_id;
    nameCell.innerText = newRow.name;
    addressCell.innerText = newRow.address;
    cityCell.innerText = newRow.city;
    countryCell.innerText = newRow.country;
    websiteCell.innerText = newRow.website;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteInstitution(newRow.institution_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(addressCell);
    row.appendChild(cityCell);
    row.appendChild(countryCell);
    row.appendChild(websiteCell);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.institution_id);

    // Add the row to the table
    currentTable.appendChild(row);
}