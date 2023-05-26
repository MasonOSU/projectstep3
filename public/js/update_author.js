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

  for (let i = 0, row; (row = table.rows[i]); i++) {
    if (table.rows[i].getAttribute("data-value") == authorID) {
      // let updateRowIndex = table.getElementsByTagName("tr")[i];

      // console.log(td.innerHTML);
      // console.log(parsedData);

      // td.innerHTML = parsedData[0].name;

      // Get the location of the row where we found the matching author ID
      let updateRowIndex = table.getElementsByTagName("tr")[i];
      // let td = updateRowIndex.getElementsByTagName("td")[3];

      //   // Get td of values
      let tdFirstName = updateRowIndex.getElementsByTagName("td")[1];
      let tdLastName = updateRowIndex.getElementsByTagName("td")[2];


      //   // Reassign to value we updated to
      //   tdFirstName.innerHTML = parsedData[i].first_name;
      //   tdLastName.innerHTML = parsedData[i].last_name;
    }
  }
}
