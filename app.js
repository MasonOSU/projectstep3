var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

PORT = 1994;

var db = require("./database/db-connector");
const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars");
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/research_papers", function (req, res) {
  let query1 = "SELECT * FROM Research_Papers;";
  let query2 = "SELECT * FROM Institutions;";
  let query3 = "SELECT * FROM Disciplines;";
  db.pool.query(query1, function (error, rows, fields) {
    let research_papers = rows;
    db.pool.query(query2, (error, rows, fields) => {
      let institutions = rows;
      db.pool.query(query3, (error, rows, fields) => {
        let disciplines = rows;
        res.render("research_papers", {
          data: research_papers,
          institutions: institutions,
          disciplines: disciplines,
        });
      });
    });
  });
});

app.get("/authors", function (req, res) {
  let query1 = "SELECT * FROM Authors;";
  db.pool.query(query1, function (error, rows, fields) {
    res.render("authors", { data: rows });
  });
});

///////////////////////////////////////////////////////////////////////////////////////////
app.get("/citations", function (req, res) {
  let query1 = "SELECT * FROM Citations;";
  let query2 = "SELECT * FROM Research_Papers;";
  db.pool.query(query1, function (error, rows, fields) {
    let papers = rows;

    db.pool.query(query2, (error, rows, fields) => {
      let citing_papers = rows;
      let referenced_papers = rows;
      res.render("citations", {
        data: papers,
        citing_papers: citing_papers,
        referenced_papers: referenced_papers,
      });
    });
  });
});

app.get("/research_papers_authors", function (req, res) {
  let query1 = "SELECT * FROM Research_Papers_has_Authors;";
  let query2 = "SELECT * FROM Research_Papers;";
  let query3 = "SELECT * FROM Authors;";
  db.pool.query(query1, function (error, rows, fields) {
    let research_papers_authors = rows;
    db.pool.query(query2, (error, rows, fields) => {
      let research_papers = rows;
      db.pool.query(query3, (error, rows, fields) => {
        let authors = rows;
        res.render("research_papers_authors", {
          data: rows,
          research_papers_authors: research_papers_authors,
          research_papers: research_papers,
          authors: authors,
        });
      });
    });
  });
});

app.get("/institutions", function (req, res) {
  let query = "SELECT * FROM Institutions;";
  db.pool.query(query, function (error, rows, fields) {
    res.render("institutions", { data: rows });
  });
});

// app.get("/disciplines", function (req, res) {
//   let query = "SELECT * FROM Disciplines;";
//   db.pool.query(query, function (error, rows, fields) {
//     res.render("disciplines", { data: rows });
//   });
// });
app.get("/disciplines", function (req, res) {
  let query1;
  // If there is no query string, we just perform a basic SELECT
  if (req.query.field_name === undefined) {
    query1 = "SELECT * FROM Disciplines;";
  }

  // If there is a query string, we assume this is a search, and return desired results
  else {
    query1 = `SELECT * FROM Disciplines WHERE field LIKE "${req.query.field_name}%"`
  }

  db.pool.query(query1, function (error, rows, fields) {
    res.render("disciplines", { data: rows });
  });
});
///////////////////////////////////////////////////////////////////////////////////////////

app.post("/add-author-ajax", function (req, res) {
  let data = req.body;
  query1 = `INSERT INTO Authors (first_name, last_name) VALUES ('${data.first_name}', '${data.last_name}')`;

  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      query2 = `SELECT * FROM Authors;`;
      db.pool.query(query2, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.send(rows);
        }
      });
    }
  });
});

app.post('/add-discipline-ajax', function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Disciplines (field) VALUES ('${data.field}')`;
  db.pool.query(query1, function (error, rows, fields) {

    // Check to see if there was an error
    if (error) {

      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error)
      res.sendStatus(400);
    }
    else {
      // If there was no error, perform a SELECT * on Disciplines
      query2 = `SELECT * FROM Disciplines;`;
      db.pool.query(query2, function (error, rows, fields) {

        // If there was an error on the second query, send a 400
        if (error) {

          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      })
    }
  })
});

app.post('/add-institution-ajax', function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  console.log("this is data", data);
  // Create the query and run it on the database
  query1 = `INSERT INTO Institutions (name, address, city, country, website) VALUES ('${data.name}', '${data.address}', '${data.city}', '${data.country}', '${data.website}')`;
  db.pool.query(query1, function (error, rows, fields) {

    // Check to see if there was an error
    if (error) {

      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error)
      res.sendStatus(400);
    }
    else {
      // If there was no error, perform a SELECT * on Institutions
      query2 = `SELECT * FROM Institutions;`;
      db.pool.query(query2, function (error, rows, fields) {

        // If there was an error on the second query, send a 400
        if (error) {

          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      })
    }
  })
});

app.post('/add-research-paper-ajax', function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  console.log("this is data", data);
  // Create the query and run it on the database
  query1 = `INSERT INTO Research_Papers (title, date_published, doi, institution_id, discipline_id) VALUES ('${data.title}', '${data.date_published}', '${data.doi}', '${data.institution_id}', '${data.discipline_id}');`;
  db.pool.query(query1, function (error, rows, fields) {

    // Check to see if there was an error
    if (error) {

      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error)
      res.sendStatus(400);
    }
    else {
      // If there was no error, perform a SELECT * on Research_Papers
      query2 = `SELECT * FROM Research_Papers;`;
      db.pool.query(query2, function (error, rows, fields) {

        // If there was an error on the second query, send a 400
        if (error) {

          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      })
    }
  })
});

app.put("/put-author-ajax", function (req, res, next) {
  let data = req.body;
  let author = parseInt(data.author_id);
  let firstName = data.first_name;
  let lastName = data.last_name;

  let queryUpdateAuthor = `UPDATE Authors SET first_name = ?, last_name = ? WHERE Authors.author_id = ?;`;
  db.pool.query(
    queryUpdateAuthor,
    [firstName, lastName, author],
    function (error, rows, fields) {

      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        let updatedListAuthors = `SELECT * FROM Authors;`;
        db.pool.query(updatedListAuthors, function (error, rows, fields) {

          if (error) {
            console.log(error);
            res.sendStatus(400);
          } else {
            res.send(rows);
          }
        });
      }
    }
  );
});

app.put('/put-discipline-ajax', function (req, res, next) {
  let data = req.body;
  console.log("this is data", data);
  let disciplineId = parseInt(data.discipline_id);
  let field = data.field;

  let queryUpdateDiscipline = `UPDATE Disciplines SET field = ? WHERE Disciplines.discipline_id = ?;`;
  let selectUpdatedListDisciplines = `SELECT * FROM Disciplines;`;

  // Run the 1st query
  db.pool.query(queryUpdateDiscipline, [field, disciplineId], function (error, rows, fields) {
    if (error) {

      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we run our second query and return that data so we can use it to update the Disciplines
    // table on the front-end
    else {
      // Run the second query
      db.pool.query(selectUpdatedListDisciplines, function (error, rows, fields) {

        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.send(rows);
        }
      })
    }
  })
});

app.put('/put-institution-ajax', function (req, res, next) {
  let data = req.body;
  console.log("this is data", data);
  let institutionID = parseInt(data.institution_id);
  let name = data.name;
  let address = data.address;
  let city = data.city;
  let country = data.country;
  let website = data.website;

  let queryUpdateInstitution = `UPDATE Institutions SET name = ?, address = ?, city = ?, country = ?, website = ? WHERE Institutions.institution_id = ?;`;
  let selectAllInstitutions = `SELECT * FROM Institutions;`;

  // Run the 1st query
  db.pool.query(queryUpdateInstitution, [name, address, city, country, website, institutionID], function (error, rows, fields) {
    if (error) {

      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we run our second query and return that data so we can use it to update the Institutions
    // table on the front-end
    else {
      // Run the second query
      db.pool.query(selectAllInstitutions, [institutionID], function (error, rows, fields) {

        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.send(rows);
        }
      })
    }
  })
});

///////////////////////////////* DELETE ROUTES, AJAX METHOD *///////////////////////////////
app.delete("/delete-author-ajax/", function (req, res, next) {
  let data = req.body;
  let authorID = parseInt(data.id);
  let deleteResearch_Papers_has_AuthorsQuery = `DELETE FROM Research_Papers_has_Authors WHERE author_id = ?`;
  let deleteAuthorQuery = `DELETE FROM Authors WHERE author_id = ?`;

  db.pool.query(
    deleteResearch_Papers_has_AuthorsQuery,
    [authorID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        db.pool.query(
          deleteAuthorQuery,
          [authorID],
          function (error, rows, fields) {
            if (error) {
              console.log(error);
              res.sendStatus(400);
            } else {
              res.sendStatus(204);
            }
          }
        );
      }
    }
  );
});

app.delete('/delete-discipline-ajax/', function (req, res, next) {
  let data = req.body;
  console.log("this is data", data);
  let disciplineID = parseInt(data.id);
  let deleteResearch_Papers_has_AuthorsQuery = `DELETE FROM Research_Papers WHERE discipline_id = ?`;
  let deleteDisciplineQuery = `DELETE FROM Disciplines WHERE discipline_id = ?`;

  db.pool.query(
    deleteResearch_Papers_has_AuthorsQuery,
    [disciplineID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        db.pool.query(
          deleteDisciplineQuery,
          [disciplineID],
          function (error, rows, fields) {
            if (error) {
              console.log(error);
              res.sendStatus(400);
            } else {
              res.sendStatus(204);
            }
          }
        );
      }
    }
  );
});

app.delete('/delete-institution-ajax/', function (req, res, next) {
  let data = req.body;
  console.log("this is data", data);
  let institutionID = parseInt(data.id);
  let deleteResearch_Papers_has_AuthorsQuery = `DELETE FROM Research_Papers WHERE institution_id = ?`;
  let deleteInstitutionQuery = `DELETE FROM Institutions WHERE institution_id = ?`;


  // Run the 1st query
  db.pool.query(deleteResearch_Papers_has_AuthorsQuery, [institutionID], function (error, rows, fields) {
    if (error) {

      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    else {
      // Run the second query
      db.pool.query(deleteInstitutionQuery, [institutionID], function (error, rows, fields) {

        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.sendStatus(204);
        }
      })
    }
  })
});

app.listen(PORT, function () {
  console.log(
    "express active on http://localhost:" + PORT + "; Ctrl-C to stop"
  );
});

///////////////////////////////* DRAFTS *///////////////////////////////
// POST ROUTES
// //*****NOTE**** Route below works****
// app.post("/add-author-form", function (req, res) {
//   // parse incoming data back to JavaScript object
//   let data = req.body;

//   // // catch NULL values
//   // let homeworld = parseInt(data['input-homeworld']);
//   // if (isNaN(homeworld))
//   // {
//   //     homeworld = 'NULL'
//   // }

//   // let age = parseInt(data['input-age']);
//   // if (isNaN(age))
//   // {
//   //     age = 'NULL'
//   // }

//   // run query on database
//   query1 = `INSERT INTO Authors (first_name, last_name) VALUES ("${data["input-first_name"]}", "${data["input-last_name"]}")`;
//   db.pool.query(query1, function (error, rows, fields) {
//     // check if error
//     if (error) {
//       // log error, send 400
//       console.log(error);
//       res.sendStatus(400);
//     }

//     // if no error: redirect to root, run and show SELECT * FROM Authors
//     else {
//       res.redirect("/authors");
//     }
//   });
// });

// app.put('/put-author-ajax', function(req,res,next){
//   let data = req.body;

//   let author = parseInt(data.author_id);
//   let firstName = data.first_name;
//   let lastName = data.last_name;
//   let queryUpdateAuthor = `UPDATE Authors SET first_name = ?, last_name = ? WHERE Authors.author_id = ?`;

//         db.pool.query(queryUpdateAuthor, [firstName, lastName, author], function(error, rows, fields){
//             if (error) {
//               console.log(error);
//               res.sendStatus(400);}
//             else{res.send(rows);}})});
