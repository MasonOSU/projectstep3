// Get the objects we need to modify
let updateInstitutionForm = document.getElementById('update-institution-form-ajax');

// Modify the objects we need
updateInstitutionForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInstitution = document.getElementById("institutionSelect");
    let inputName = document.getElementById("input-name_update");
    let inputAddress = document.getElementById("input-address_update");
    let inputCountry = document.getElementById("input-country_update");
    let inputWebsite = document.getElementById("input-website_update");

    // Get the values from the form fields
    let institutionID = inputInstitution.value;
    let nameValue = inputName.value;
    let addressValue = inputAddress.value;
    let countryValue = inputCountry.value;
    let websiteValue = inputWebsite.value;

    // Put our data we want to send in a javascript object
    let data = {
        institution_id: institutionID,
        name: nameValue,
        address: addressValue,
        country: countryValue,
        website: websiteValue,
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-institution-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, institutionID);
            location.reload()

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, institutionID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("institutions-table");

    let parsedDataIndex = 0;
    for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
      if (parsedData[dataIndex].author_id == institutionID) {
        parsedDataIndex = dataIndex;
      }
    }

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == institutionID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of values
            let tdName = updateRowIndex.getElementsByTagName("td")[1];
            let tdAddress = updateRowIndex.getElementsByTagName("td")[2];
            let tdCountry = updateRowIndex.getElementsByTagName("td")[4];
            let tdWebsite = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign homeworld to our value we updated to
            tdName.innerHTML = parsedData[parsedDataIndex].name; 
            tdAddress.innerHTML = parsedData[parsedDataIndex].address;
            tdCountry.innerHTML = parsedData[parsedDataIndex].country;
            tdWebsite.innerHTML = parsedData[parsedDataIndex].website; 
       }
    }
}
