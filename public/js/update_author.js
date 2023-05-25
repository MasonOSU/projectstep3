// Get the objects we need to modify
let updateAuthorForm = document.getElementById('update-author-form-ajax');

// Modify the objects we need
updateAuthorForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputAuthor = document.getElementById("authorSelect");
    let inputFirstName = document.getElementById("input-first_name-update");
    let inputLastName = document.getElementById("input-last_name-update");
    console.log("inputAuthor: ", inputAuthor);
    console.log("inputFirstName inputLastName", inputFirstName, inputLastName);

    console.log(inputFullName);

    // Get the values from the form fields
    let authorID = inputAuthor.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    console.log("authorID: ", authorID);
    console.log("I am in update_author.js ", firstNameValue, lastNameValue);
    
    // // currently the database table for Authors does not allow updating values to NULL
    // // so we must abort if NULL for first or last name

<<<<<<< HEAD
    // if (isNaN(firstNameValue)) 
    // {
    //     return;
    // }
=======
    if (isNaN(firstNameValue))
    {
        return;
    }
>>>>>>> 41cfb0fb9372ac6d9b40b3f442a7e9178ce763a3

    // if (isNaN(lastNameValue)) 
    // {
    //     return;
    // }

    // Put our data we want to send in a javascript object
    let data = {
        author_id: authorID,
        first_name: firstNameValue,
        last_name: lastNameValue,
    }
    console.log("data: ", data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-author-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("I got a status of 200 in update_author.js");
            // Add the new data to the table
            updateRow(xhttp.response, authorID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, authorID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("authors-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == authorID) {

            // Get the location of the row where we found the matching author ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}