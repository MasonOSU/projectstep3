/* SETUP */
// express
var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

PORT = 1993;

// database
var db = require("./database/db-connector");

// handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

app.get('/', function(req, res){
    res.render('index');
});

// static files
app.use(express.static("public"));

/* ROUTES */
// get routes
app.get("/research_papers", function (req, res) {
  let query1 = "SELECT * FROM Research_Papers;";
  let query2 = "SELECT * FROM Institutions;";
  let query3 = "SELECT * FROM Disciplines;";
  db.pool.query(query1, function (error, rows, fields) {
    let research_papers = rows;
    db.pool.query(query2, (error, rows, fields) => {
      let institutions = rows;
      db.pool.query(query2, (error, rows, fields) => {
        let disciplines = rows;
        res.render("research_papers", { data: research_papers, institutions: institutions, disciplines: disciplines });
      })
    })
  });
});

app.get("/authors", function (req, res) {
  let query1 = "SELECT * FROM Authors;";
  db.pool.query(query1, function (error, rows, fields) {
    res.render("authors", { data: rows });
  });
});

/////////////////////////////////////////////////////////////////////
app.get("/citations", function (req, res) {
  let query1 = "SELECT * FROM Citations;";
  let query2 = "SELECT * FROM Research_Papers;";
  db.pool.query(query1, function (error, rows, fields) {
    let papers = rows;

    db.pool.query(query2, (error, rows, fields) => {
      let citingPapers = rows;
      //console.log("citing papers: ", citingPapers[0]['title']);
      let referencedPapers = rows;
      res.render("citations", { data: papers, citingPapers: citingPapers, referencedPapers: referencedPapers });
    })
  });
});

app.get("/research_papers_authors", function (req, res) {
  let query = "SELECT * FROM Research_Papers_has_Authors;";
  db.pool.query(query, function (error, rows, fields) {
    res.render("research_papers_authors", { data: rows });
  });
});

app.get("/institutions", function (req, res) {
  let query = "SELECT * FROM Institutions;";
  db.pool.query(query, function (error, rows, fields) {
    res.render("institutions", { data: rows });
  });
});

app.get("/disciplines", function (req, res) {
  let query = "SELECT * FROM Disciplines;";
  db.pool.query(query, function (error, rows, fields) {
    res.render("disciplines", { data: rows });
  });
});
//////////////////////////////////////////////////////////////////////////////////////

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

// ADDING NEW AUTHOR WITH AJAX
app.post("/add-author-ajax", function (req, res) {
  // parse incoming data back to JavaScript object
  let data = req.body;

  // run query on database
  query1 = `INSERT INTO Authors (first_name, last_name) VALUES ('${data.first_name}', '${data.last_name}')`;
  db.pool.query(query1, function (error, rows, fields) {
    // check if error
    if (error) {
      // log error to terminal, send HTTP response 400 showing bad request
      console.log(error);
      res.sendStatus(400);
    }

    // if no error, run SELECT * on Authors
    else {
      query2 = `SELECT * FROM Authors;`;
      db.pool.query(query2, function (error, rows, fields) {
        // if error on second query, send 400
        if (error) {
          console.log(error);
          res.sendStatus(400);
        }

        // else good, send query
        else {
          res.send(rows);
        }
      });
    }
  });
});

/* LISTENER */
app.listen(PORT, function () {
  console.log(
    "express active on http://localhost:" + PORT + "; Ctrl-C to stop"
  );
});
