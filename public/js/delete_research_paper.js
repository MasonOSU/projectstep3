function deleteResearchPaper(researchPaperID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: researchPaperID,
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-research-paper-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(researchPaperID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(researchPaperID){

    let table = document.getElementById("research_papers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == researchPaperID) {
            table.deleteRow(i);
            deleteDropDownMenu(researchPaperID);
            break;
       }
    }
}

function deleteDropDownMenu(researchPaperID){
    let selectMenu = document.getElementById("researchPaperSelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(researchPaperID)){
        selectMenu[i].remove();
        break;
      }
    }
  }
