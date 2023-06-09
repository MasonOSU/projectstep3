function deleteCitation(citationID) {

  // Put our data we want to send in a javascript object
  let data = {id: citationID,};

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-citation-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  console.log(data);

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {

      // Add the new data to the table
      deleteRow(citationID);
      location.reload();

    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
}

function deleteRow(citationID) {
  let table = document.getElementById("citations-table");
  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == citationID) {
      table.deleteRow(i);
      deleteDropDownMenu(citationID);
      break;
    }
  }
}

function deleteDropDownMenu(citationID){
  let selectMenu = document.getElementById("citationSelect");
  for (let i = 0; i < selectMenu.length; i++){
    if (Number(selectMenu.options[i].value) === Number(citationID)){
      selectMenu[i].remove();
      break;
    }
  }
}
