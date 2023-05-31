function deleteDiscipline(disciplineID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: disciplineID,
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-discipline-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Add the new data to the table
            deleteRow(disciplineID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(disciplineID) {

    let table = document.getElementById("disciplines-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == disciplineID) {
            table.deleteRow(i);
            deleteDropDownMenu(disciplineID);
            break;
        }
    }
}

function deleteDropDownMenu(disciplineID){
    let selectMenu = document.getElementById("disciplineSelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(disciplineID)){
        selectMenu[i].remove();
        break;
      } 
  
    }
  }