// Get the objects we need to modify
let updateCitationForm = document.getElementById('update-citation-form-ajax');

// Modify the objects we need
updateCitationForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCitation = document.getElementById("citationIDUpdate");
    let inputCitingPaper = document.getElementById("citingPaperSelect");
	let inputCitedPaper = document.getElementById("citedPaperSelect");

    // Get the values from the form fields
    let citationID = inputCitation.value;
    let citingPaperValue = inputCitingPaper.value;
    let citedPaperValue = inputCitedPaper.value;

    // Put our data we want to send in a javascript object
    let data = {
        citation_id: citationID,
        citing_paper_id: citingPaperValue,
        cited_paper_id: citedPaperValue,
    };
    console.log("this is data: ", data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-citation-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, citationID);
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, citationID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("citations-table");

    let parsedDataIndex = 0;
    for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
      if (parsedData[dataIndex].citation_id == citationID) {
        parsedDataIndex = dataIndex;
      }
    }

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == citationID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of values
            let tdCitation = updateRowIndex.getElementsByTagName("td")[1];
            let tdCitingPaper = updateRowIndex.getElementsByTagName("td")[2];
            let tdCitedPaper = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            tdCitation.innerHTML = parsedData[parsedDataIndex].citation_id; 
            tdCitingPaper.innerHTML = parsedData[parsedDataIndex].citing_paper_id;
            tdCitedPaper.innerHTML = parsedData[parsedDataIndex].cited_paper_id;
       }
    }
}
