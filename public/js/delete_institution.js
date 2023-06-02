function deleteInstitution(institutionID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: institutionID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-institution-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(institutionID);
            location.reload()

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(institutionID){

    let table = document.getElementById("institutions-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == institutionID) {
            table.deleteRow(i);
            deleteDropDownMenu(institutionID);
            break;
       }
    }
}

function deleteDropDownMenu(institutionID){
    let selectMenu = document.getElementById("institutionSelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(institutionID)){
        selectMenu[i].remove();
        break;
      } 
  
    }
  }
