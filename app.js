// `app.js` handles the setup, routes, and listener sections:
// // Setup has all the variables to run the server and handle data.
// // Routes has all the server paths for navigation and output.
// // Listener responds to the input port and initializes.
//
// Code citation:
// // Dr. Michael Curry. 2022.
// // "Step 0 - Getting a Server Running".
// // "Step 1 - Connecting to a MySQL Database".
// // "Step 3 - Integrating a Templating Engine (Handlebars)".
// // "Step 4 - Dynamically Displaying Data".
// // "Step 5 - Adding New Data".
// // "Step 6 - Dynamically Filling Dropdowns and Adding a Search Box".
// // "Step 7 - Dynamically Deleting Data".
// // "Step 8 - Dynamically Updating Data".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Setup
var express = require("express");					// Use the `express` library for the web server.
var app = express();								// Set an `express` object for server interaction.
PORT = 1994;										// Set the active port.

// These middleware functions permit data extraction and key-value pairs.
app.use(express.json());							// Parse incoming JSON.
app.use(express.urlencoded({ extended: true }));		// Parse URL-encoded payloads.

app.use(express.static("public"));					// Allow the site to use Cascading Style Sheets (CSS).

var db = require("./database/db-connector");
const { engine } = require("express-handlebars");		// Import `express-handlebars`.
var exphbs = require("express-handlebars");

app.engine(".hbs", engine({ extname: ".hbs" }));		// Create a handlebars engine to process templates.
app.set("view engine", ".hbs");						// Use `handlebars` with `.hbs` files.

// Routes
// // Read data with `get()` functions:
// // // Read the homepage.
app.get("/", function (req, res) {
	res.render("index");
});

// // // Read `Research_Papers` data. 
app.get("/research_papers", function (req, res) {
	let researchPapersQuery = `SELECT research_paper_id AS ResearchPaperId, title AS Title,
		DATE_FORMAT(date_published, '%b. %e, %Y') AS DatePublished,
		doi as DOI,
		(SELECT name FROM Institutions 
			WHERE institution_id = Research_Papers.institution_id) AS Institution, 
		(SELECT field FROM Disciplines 
			WHERE discipline_id = Research_Papers.discipline_id) AS Discipline 
		FROM Research_Papers;`;

	let institutionsQuery = `SELECT * FROM Institutions;`;
	let disciplinesQuery = `SELECT * FROM Disciplines;`;

	db.pool.query(researchPapersQuery, function (error, rows, fields) {
		let research_papers = rows;

		db.pool.query(institutionsQuery, (error, rows, fields) => {
			let institutions = rows;

			db.pool.query(disciplinesQuery, (error, rows, fields) => {
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

// // // Read `Citations` data. 
app.get("/citations", function (req, res) {
	let readCitationsQuery = ` 
	SELECT citation_id AS CitationId, (SELECT title FROM Research_Papers WHERE citing_paper_id = Research_Papers.research_paper_id) AS CitingPaper, (SELECT title FROM Research_Papers WHERE cited_paper_id = Research_Papers.research_paper_id) AS CitedPaper FROM Citations;`;

	let readResearchPapersQuery = `SELECT * FROM Research_Papers;`;

	db.pool.query(readCitationsQuery, function (error, rows, fields) {
		let research_papers = rows;

		db.pool.query(readResearchPapersQuery, (error, rows, fields) => {
			let citing_papers = rows;
			let cited_papers = rows;

			res.render("citations", {
				data: research_papers,
				citing_papers: citing_papers,
				cited_papers: cited_papers,
			});
		});
	});
});

// // // Read `Authors` data.
app.get("/authors", function (req, res) {
	let readAuthorsQuery = `SELECT author_id AS AuthorId, first_name AS FirstName, last_name AS LastName FROM Authors;`;

	db.pool.query(readAuthorsQuery, function (error, rows, fields) {
		res.render("authors", { data: rows });
	});
});

// // // Read `Research_Papers_has_Authors` data.
app.get("/research_papers_has_authors", function (req, res) {
	let readResearchPapersHasAuthorsQuery = `SELECT research_paper_author_id AS PublisherId,
		(SELECT title FROM Research_Papers 
			WHERE paper_id = Research_Papers.research_paper_id) 
			AS ResearchPaper,
		(SELECT CONCAT(Authors.first_name, ' ', Authors.last_name) FROM Authors 
			WHERE researcher_id = Authors.author_id) 
			AS AuthorName
		FROM Research_Papers_has_Authors;`;

	let readResearchPapersQuery = `SELECT * FROM Research_Papers;`;
	let readAuthorsQuery = `SELECT * FROM Authors;`;

	db.pool.query(readResearchPapersHasAuthorsQuery, function (error, rows, fields) {
		let research_papers_authors = rows;

		db.pool.query(readResearchPapersQuery, function (error, rows, fields) {
			let research_papers = rows;

			db.pool.query(readAuthorsQuery, function (error, rows, fields) {
				let authors = rows;

				res.render("research_papers_has_authors", {
					data: research_papers_authors,
					research_papers: research_papers,
					authors: authors,
				});
			})
		})
	})
});

// // // Read `Institutions` data.
app.get("/institutions", function (req, res) {
	let query = "SELECT institution_id AS InstitutionId, name AS Name, address AS Address, country AS Country, website AS Website FROM Institutions;";

	db.pool.query(query, function (error, rows, fields) {
		res.render("institutions", { data: rows });
	});
});

// // // Read `Disciplines` data.
app.get("/disciplines", function (req, res) {
	let readDisciplinesQuery;

	if (req.query.field_name === undefined) {
		readDisciplinesQuery = "SELECT discipline_id AS DisciplineId, field AS Field FROM Disciplines;";
	}
	else {
		readDisciplinesQuery = `SELECT * FROM Disciplines WHERE field LIKE "${req.query.field_name}%"`;
	}

	db.pool.query(readDisciplinesQuery, function (error, rows, fields) {
		res.render("disciplines", { data: rows });
	});
});

// // Create data with `post()` functions:
// // // Add `Research_Papers` data.
app.post("/add-research_paper-ajax", function (req, res) {
	let data = req.body;

	let researchPapersQuery = `
		INSERT INTO Research_Papers (title, date_published, doi, institution_id, discipline_id) 
		VALUES ('${data.title}', '${data.date_published}', '${data.doi}', 
		'${data.institution_id}', '${data.discipline_id}');`;

	db.pool.query(researchPapersQuery, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
		else {
			let readResearchPapersQuery = `SELECT * FROM Research_Papers;`;

			db.pool.query(readResearchPapersQuery, function (error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}
				else {
					res.send(rows);
				}
			});
		}
	});
});

// // // Add `Citations` data.
app.post("/add-citation-ajax", function (req, res) {
	let data = req.body;

	let addCitationsQuery = `INSERT INTO Citations (citing_paper_id, cited_paper_id)
		VALUES ('${data.citing_paper_id}', '${data.cited_paper_id}');`;

	db.pool.query(addCitationsQuery, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
		else {
			let readCitationsQuery = `SELECT * FROM Citations;`;

			db.pool.query(readCitationsQuery, function (error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}
				else { res.send(rows); }
			});
		}
	});
});

// // // Add `Authors` data.
app.post("/add-author-ajax", function (req, res) {
	let data = req.body;

	let addAuthorsQuery = `INSERT INTO Authors (first_name, last_name) 
		VALUES ('${data.first_name}', '${data.last_name}')`;

	db.pool.query(addAuthorsQuery, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
		else {
			let readAuthorsQuery = `SELECT * FROM Authors;`;

			db.pool.query(readAuthorsQuery, function (error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}

				else { res.send(rows); }
			});
		}
	});
});

// // // Add `Disciplines` data.
app.post("/add-discipline-ajax", function (req, res) {
	let data = req.body;
	let addDisciplinesQuery = `INSERT INTO Disciplines (field) VALUES ('${data.field}')`;

	db.pool.query(addDisciplinesQuery, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}

		else {
			let readDisciplinesQuery = `SELECT * FROM Disciplines;`;
			db.pool.query(readDisciplinesQuery, function (error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}

				else { res.send(rows); }
			});
		}
	});
});

// // // Create `Research_Papers_has_Authors` data.
app.post("/add-research_paper_author-ajax", function (req, res) {
	let data = req.body;

	let addResearchPapersHasAuthorsQuery = `
		INSERT INTO Research_Papers_has_Authors (research_paper_author_id, paper_id, researcher_id) 
		VALUES ('${data.research_paper_author_id}', '${data.paper_id}', '${data.researcher_id}');`;

	db.pool.query(addResearchPapersHasAuthorsQuery, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
		else {
			let readResearchPapersHasAuthorsQuery = `SELECT * FROM Research_Papers_has_Authors;`;

			db.pool.query(readResearchPapersHasAuthorsQuery, function (error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}

				else { res.send(rows); }
			});
		}
	});
});

// // // Add `Institutions` data.
app.post("/add-institution-ajax", function (req, res) {
	let data = req.body;

	let addInstitutionsQuery = `
		INSERT INTO Institutions (name, address, country, website) 
		VALUES ('${data.name}', '${data.address}', '${data.country}', '${data.website}')`;

	db.pool.query(addInstitutionsQuery, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}

		else {
			let readInstitutionsQuery = `SELECT * FROM Institutions;`;

			db.pool.query(readInstitutionsQuery, function (error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}
				else { res.send(rows); }
			});
		}
	});
});

// // Update data with `put()` functions:
// // // Update `Research_Papers` data.
app.put("/put-research_paper-ajax", function (req, res, next) {
	let data = req.body;

	let research_paper_id = parseInt(data.research_paper_id);
	let title = data.title;
	let date_published = data.date_published;
	let doi = data.doi;
	let institution_id = data.institution_id;
	let discipline_id = data.discipline_id;

	let updateResearchPaperQuery = `
		UPDATE Research_Papers 
		SET title = ?, date_published = ?, doi = ?, institution_id = ?, discipline_id = ? 
		WHERE Research_Papers.research_paper_id = ?;`;

	db.pool.query(updateResearchPaperQuery, [
		title,
		date_published,
		doi,
		institution_id,
		discipline_id,
		research_paper_id,],

		function (error, rows, fields) {
			if (error) {
				console.log(error);
				res.sendStatus(400);
			}
			else {
				let updatedResearchPapers = `SELECT * FROM Research_Papers;`;

				db.pool.query(updatedResearchPapers, function (error, rows, fields) {
					if (error) {
						console.log(error);
						res.sendStatus(400);
					}
					else { res.send(rows); }
				});
			}
		});
});

// // // Update `Citations` data.
app.put('/put-citation-ajax', function (req, res, next) {
	let data = req.body;

	let citationId = parseInt(data.citation_id);
	let citingPaperId = data.citing_paper_id;
	let citedPaperId = data.cited_paper_id;

	let updateCitationQuery = `
		UPDATE Citations SET citing_paper_id = ?, cited_paper_id = ? WHERE Citations.citation_id = ?;`;

	let readCitationsQuery = `SELECT * FROM Citations;`;

	db.pool.query(updateCitationQuery, [citingPaperId, citedPaperId, citationId], function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
		else {
			db.pool.query(readCitationsQuery, [citationId], function (error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}

				else { res.send(rows); }
			})
		}
	})
});

// // // Update `Authors` data.
app.put("/put-author-ajax", function (req, res, next) {
	let data = req.body;
	let authorId = parseInt(data.author_id);
	let firstName = data.first_name;
	let lastName = data.last_name;
	let updateAuthorQuery = `UPDATE Authors SET first_name = ?, last_name = ? WHERE Authors.author_id = ?;`;

	db.pool.query(updateAuthorQuery, [firstName, lastName, authorId], function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
		else {
			let updatedAuthors = `SELECT * FROM Authors;`;

			db.pool.query(updatedAuthors, function (error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}

				else { res.send(rows); }
			});
		}
	});
});

// // // Update `Research_Papers_has_Authors` data.
app.put('/put-research_paper_author-ajax', function (req, res, next) {
	let data = req.body;
	let researchPaperAuthorId = parseInt(data.research_paper_author_id);
	let paperId = data.paper_id;
	let researcherId = data.researcher_id;

	let updateResearchPapersHasAuthorsQuery = `
		UPDATE Research_Papers_has_Authors 
		SET paper_id = ?, researcher_id = ? WHERE Research_Papers_has_Authors.research_paper_author_id = ?;`;

	let readResearchPapersHasAuthorsQuery = `SELECT * FROM Research_Papers_has_Authors;`;

	db.pool.query(updateResearchPapersHasAuthorsQuery, [paperId, researcherId, researchPaperAuthorId],
		function (error, rows, fields) {
			if (error) {
				console.log(error);
				res.sendStatus(400);
			}
			else {
				db.pool.query(readResearchPapersHasAuthorsQuery, [researchPaperAuthorId],
					function (error, rows, fields) {
						if (error) {
							console.log(error);
							res.sendStatus(400);
						}

						else { res.send(rows); }
					})
			}
		})
});

// // // Update `Institutions` data.
app.put("/put-institution-ajax", function (req, res, next) {
	let data = req.body;

	let institutionId = parseInt(data.institution_id);
	let name = data.name;
	let address = data.address;
	let country = data.country;
	let website = data.website;

	let updateInstitutionsQuery = `
		UPDATE Institutions SET name = ?, address = ?, country = ?, website = ? 
		WHERE Institutions.institution_id = ?;`;

	let readInstitutionsQuery = `SELECT * FROM Institutions;`;

	db.pool.query(updateInstitutionsQuery, [name, address, country, website, institutionId],
		function (error, rows, fields) {
			if (error) {
				console.log(error);
				res.sendStatus(400);
			}
			else {
				db.pool.query(readInstitutionsQuery, [institutionId], function (error, rows, fields) {
					if (error) {
						console.log(error);
						res.sendStatus(400);
					}

					else { res.send(rows); }
				});
			}
		});
});

// // // Update `Disciplines` data.
app.put("/put-discipline-ajax", function (req, res, next) {
	let data = req.body;

	let disciplineId = parseInt(data.discipline_id);
	let field = data.field;
	let updateDisciplinesQuery = `UPDATE Disciplines SET field = ? WHERE Disciplines.discipline_id = ?;`;
	let readDisciplinesQuery = `SELECT * FROM Disciplines;`;

	db.pool.query(updateDisciplinesQuery, [field, disciplineId], function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
		else {
			db.pool.query(readDisciplinesQuery, function (error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}

				else { res.send(rows); }
			});
		}
	});
});

// // Delete data with `delete()` functions:
// // // Delete `Research_Papers` data.
app.delete("/delete-research-paper-ajax/", function (req, res, next) {
	let data = req.body;
	let researchPaperId = parseInt(data.id);
	let deleteResearchPapersHasAuthorsQuery = `DELETE FROM Research_Papers_has_Authors WHERE paper_id = ?`;
	let deleteResearchPapersQuery = `DELETE FROM Research_Papers WHERE research_paper_id = ?`;

	db.pool.query(deleteResearchPapersHasAuthorsQuery, [researchPaperId], function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}

		else {
			db.pool.query(deleteResearchPapersQuery, [researchPaperId], function (error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}

				else { res.sendStatus(204); }
			});
		}
	});
});

// // Delete `Citations` data.
app.delete("/delete-citation-ajax/", function (req, res, next) {
	let data = req.body;

	let citationId = parseInt(data.id);
	let deleteCitationQuery = `DELETE FROM Citations WHERE citation_id = ?`;

	db.pool.query(deleteCitationQuery, [citationId], function (error, rows, fields) {
		if (error) {
			console.log(error); res.sendStatus(400);
		}

		else { res.sendStatus(204); }
	});
});

// // // Delete `Authors` data.
app.delete("/delete-author-ajax/", function (req, res, next) {
	let data = req.body;
	console.log("this is data", data);
	let authorId = parseInt(data.id);
	let deleteResearchPapersHasAuthorsQuery = `DELETE FROM Research_Papers_has_Authors WHERE researcher_id = ?`;
	let deleteAuthorsQuery = `DELETE FROM Authors WHERE author_id = ?`;

	db.pool.query(deleteResearchPapersHasAuthorsQuery, [authorId], function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}

		else {
			db.pool.query(deleteAuthorsQuery, [authorId], function (error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}
				else { res.sendStatus(204); }
			});
		}
	});
});

// // // Delete `Research_Papers_has_Authors` data.
app.delete("/delete-research_paper_author-ajax/", function (req, res, next) {
	let data = req.body;

	console.log(data);

	let researchPaperAuthorId = parseInt(data.id);
	let deleteResearchPapersHasAuthorsQuery =
		`DELETE FROM Research_Papers_has_Authors WHERE research_paper_author_id = ?`;

	db.pool.query(deleteResearchPapersHasAuthorsQuery, [researchPaperAuthorId],
		function (error, rows, fields) {
			if (error) { console.log(error); res.sendStatus(400); }
			else { res.sendStatus(204); }
		});
});

// // // Delete `Institutions` data.
app.delete("/delete-institution-ajax/", function (req, res, next) {
	let data = req.body;

	let institutionId = parseInt(data.id);

	let deleteInstitutionQuery = `DELETE FROM Institutions WHERE institution_id = ?`;

	db.pool.query(deleteInstitutionQuery, [institutionId], function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		} else {
			res.sendStatus(204);
		}
	});
});

// // // Delete `Disciplines` data.
app.delete("/delete-discipline-ajax/", function (req, res, next) {
	let data = req.body;
	let disciplineId = parseInt(data.id);

	let deleteResearchPapersHasAuthorsQuery = `DELETE FROM Research_Papers_has_Authors WHERE 
	paper_id IN (SELECT research_paper_id FROM Research_Papers WHERE discipline_id = ?)`;
	let deleteResearchPapersQuery = `DELETE FROM Research_Papers WHERE discipline_id = ?`;
	let deleteDisciplineQuery = `DELETE FROM Disciplines WHERE discipline_id = ?`;

	db.pool.query(deleteResearchPapersHasAuthorsQuery, [disciplineId], function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
		else {
			db.pool.query(deleteResearchPapersQuery, [disciplineId], function (error, rows, fields) {
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}
				else {
					db.pool.query(deleteDisciplineQuery, [disciplineId], function (error, rows, fields) {
						if (error) {
							console.log(error);
							res.sendStatus(400);
						}

						else { res.sendStatus(204); }
					});
				}
			});
		}
	});
});

// Listener
app.listen(PORT, function () {
	console.log("express active on http://localhost:" + PORT + "; Ctrl-C to stop");
});
