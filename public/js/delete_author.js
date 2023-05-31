function deleteAuthor(authorID) {
  let data = { id: authorID };

  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-author-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      deleteRow(authorID);
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log("There was an error with the input.");
    }
  };
  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
}

function deleteRow(authorID) {
  let table = document.getElementById("authors-table");
  for (let i = 0, row; (row = table.rows[i]); i++) {
    if (table.rows[i].getAttribute("data-value") == authorID) {
      table.deleteRow(i);
      break;
    }
  }
}

function deleteDropDownMenu(authorID) {
  let selectMenu = document.getElementById("authorSelect");
  for (let i = 0; i < selectMenu.length; i++) {
    if (Number(selectMenu.options[i].value) === Number(authorID)) {
      selectMenu[i].remove();
      break;
    }
  }
}
