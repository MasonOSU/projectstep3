let updateAuthorForm = document.getElementById("update-author-form-ajax");
updateAuthorForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputAuthor = document.getElementById("authorSelect");
  let inputFirstName = document.getElementById("input-first_name-update");
  let inputLastName = document.getElementById("input-last_name-update");

  let authorID = inputAuthor.value;
  let firstNameValue = inputFirstName.value;
  let lastNameValue = inputLastName.value;

  let data = {
    author_id: authorID,
    first_name: firstNameValue,
    last_name: lastNameValue,
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-author-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      updateRow(xhttp.response, authorID);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  xhttp.send(JSON.stringify(data));
});

function updateRow(data, authorID) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById("authors-table");

  let parsedDataIndex = 0;
  for (let dataIndex = 0; dataIndex < parsedData.length; dataIndex++) {
    if (parsedData[dataIndex].author_id == authorID) {
      parsedDataIndex = dataIndex;
    }
  }

  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == authorID) {

      // Get the location of the row where we found the matching author ID
      let updateRowIndex = table.getElementsByTagName("tr")[i];

      // Get td of values
      let tdFirstName = updateRowIndex.getElementsByTagName("td")[1];
      let tdLastName = updateRowIndex.getElementsByTagName("td")[2];

      // reassign new values from parsedData to row in table
      tdFirstName.innerHTML = parsedData[parsedDataIndex].first_name;
      tdLastName.innerHTML = parsedData[parsedDataIndex].last_name;
    }
  }
}
