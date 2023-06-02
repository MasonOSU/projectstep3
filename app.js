// express
var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

PORT = 1991;

handlebars
var db = require("./database/db-connector");
const {engine} = require("express-handlebars");

var exphbs = require("express-handlebars");
app.engine(".hbs", engine({extname: ".hbs"}));
app.set("view engine", ".hbs");

// css
app.use(express.static("public"));

// get functions
app.get("/", function (req, res) {
	res.render("index");
});

app.get("/research_papers", function (req, res) {
	let query1 =
		"SELECT *, DATE_FORMAT(date_published, '%b. %e, %Y') AS date_published, (SELECT name FROM Institutions WHERE institution_id = Research_Papers.institution_id) AS institution_id, (SELECT field FROM Disciplines WHERE discipline_id = Research_Papers.discipline_id) AS discipline_id FROM Research_Papers;";
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
		res.render("authors", {data: rows});
	});
});

app.get("/institutions", function (req, res) {
	let query = "SELECT * FROM Institutions;";
	db.pool.query(query, function (error, rows, fields) {
		res.render("institutions", {data: rows});
	});
});

app.get("/disciplines", function (req, res) {
	let query1;
	if (req.query.field_name === undefined) {
		query1 = "SELECT * FROM Disciplines;";
	} else {
		query1 = `SELECT * FROM Disciplines WHERE field LIKE "${req.query.field_name}%"`;
	}
	db.pool.query(query1, function (error, rows, fields) {
		res.render("disciplines", {data: rows});
	});
});

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

// post functions
app.post("/add-research_paper-ajax", function (req, res) {
	let data = req.body;

	query1 = `INSERT INTO Research_Papers (title, date_published, doi, institution_id, discipline_id) 
	VALUES ('${data.title}', '${data.date_published}', '${data.doi}', '${data.institution_id}', '${data.discipline_id}');`;

	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		} else {
			query2 = `SELECT * FROM Research_Papers;`;
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

app.post("/add-institution-ajax", function (req, res) {
	let data = req.body;
	console.log("this is data", data);
	query1 = `INSERT INTO Institutions (name, address, country, website) VALUES ('${data.name}', '${data.address}', '${data.country}', '${data.website}')`;
	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		} else {
			query2 = `SELECT * FROM Institutions;`;
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

app.post("/add-discipline-ajax", function (req, res) {
	let data = req.body;
	query1 = `INSERT INTO Disciplines (field) VALUES ('${data.field}')`;
	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		} else {
			query2 = `SELECT * FROM Disciplines;`;
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

app.post("/add-citation-ajax", function (req, res) {
	let data = req.body;

	query1 = `INSERT INTO Citations (citing_paper_id, cited_paper_id) 
	VALUES ('${data.citing_paper_id}', '${data.cited_paper_id}');`;
	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		} else {
			query2 = `SELECT * FROM Citations;`;
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

// put functions
app.put("/put-research_paper-ajax", function (req, res, next) {
	let data = req.body;

	let research_paper_id = parseInt(data.research_paper_id);
	let title = data.title;
	let date_published = data.date_published;
	let doi = data.doi;
	let institution_id = data.institution_id;
	let discipline_id = data.discipline_id;

	let queryUpdateResearch_Paper = `UPDATE Research_Papers 
	SET title = ?, date_published = ?, doi = ?, institution_id = ?, discipline_id = ? 
	WHERE Research_Papers.research_paper_id = ?;`;

	db.pool.query(
		queryUpdateResearch_Paper,
		[
			title,
			date_published,
			doi,
			institution_id,
			discipline_id,
			research_paper_id,
		],
		function (error, rows, fields) {
			if (error) {
				console.log(error);
				res.sendStatus(400);
			} else {
				let updatedListResearch_Papers = `SELECT * FROM Research_Papers;`;
				db.pool.query(
					updatedListResearch_Papers,
					function (error, rows, fields) {
						if (error) {
							console.log(error);
							res.sendStatus(400);
						} else {
							res.send(rows);
						}
					}
				);
			}
		}
	);
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
				db.pool.query(
					updatedListAuthors,
					function (error, rows, fields) {
						if (error) {
							console.log(error);
							res.sendStatus(400);
						} else {
							res.send(rows);
						}
					}
				);
			}
		}
	);
});

app.put("/put-discipline-ajax", function (req, res, next) {
	let data = req.body;
	console.log("this is data", data);
	let disciplineId = parseInt(data.discipline_id);
	let field = data.field;
	let queryUpdateDiscipline = `UPDATE Disciplines SET field = ? WHERE Disciplines.discipline_id = ?;`;
	let selectUpdatedListDisciplines = `SELECT * FROM Disciplines;`;
	db.pool.query(
		queryUpdateDiscipline,
		[field, disciplineId],
		function (error, rows, fields) {
			if (error) {
				console.log(error);
				res.sendStatus(400);
			} else {
				db.pool.query(
					selectUpdatedListDisciplines,
					function (error, rows, fields) {
						if (error) {
							console.log(error);
							res.sendStatus(400);
						} else {
							res.send(rows);
						}
					}
				);
			}
		}
	);
});

app.put("/put-institution-ajax", function (req, res, next) {
	let data = req.body;

	let institutionID = parseInt(data.institution_id);
	let name = data.name;
	let address = data.address;
	let country = data.country;
	let website = data.website;

	let queryUpdateInstitution = `UPDATE Institutions SET name = ?, address = ?, country = ?, website = ? WHERE Institutions.institution_id = ?;`;
	let selectAllInstitutions = `SELECT * FROM Institutions;`;

	db.pool.query(
		queryUpdateInstitution,
		[name, address, country, website, institutionID],
		function (error, rows, fields) {
			if (error) {
				console.log(error);
				res.sendStatus(400);
			} else {
				db.pool.query(
					selectAllInstitutions,
					[institutionID],
					function (error, rows, fields) {
						if (error) {
							console.log(error);
							res.sendStatus(400);
						} else {
							res.send(rows);
						}
					}
				);
			}
		}
	);
});

// delete functions
app.delete("/delete-author-ajax/", function (req, res, next) {
	let data = req.body;

	console.log(data);

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

app.delete("/delete-discipline-ajax/", function (req, res, next) {
	let data = req.body;
	let disciplineID = parseInt(data.id);

	let deleteResearch_Papers_has_AuthorsQuery = `DELETE FROM Research_Papers_has_Authors WHERE 
	research_paper_id IN (SELECT research_paper_id FROM Research_Papers WHERE discipline_id = ?)`;
	let deleteResearch_PapersQuery = `DELETE FROM Research_Papers WHERE discipline_id = ?`;
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
					deleteResearch_PapersQuery,
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
			}
		}
	);
});

app.delete("/delete-institution-ajax/", function (req, res, next) {
	let data = req.body;
	let institutionID = parseInt(data.id);

	let deleteResearch_Papers_has_AuthorsQuery = `DELETE FROM Research_Papers_has_Authors WHERE 
	research_paper_id IN (SELECT research_paper_id FROM Research_Papers WHERE institution_id = ?)`;
	let deleteResearch_PapersQuery = `DELETE FROM Research_Papers WHERE institution_id = ?`;
	let deleteInstitutionQuery = `DELETE FROM Institutions WHERE institution_id = ?`;

	db.pool.query(
		deleteResearch_Papers_has_AuthorsQuery,
		[institutionID],
		function (error, rows, fields) {
			if (error) {
				console.log(error);
				res.sendStatus(400);
			} else {
				db.pool.query(
					deleteResearch_PapersQuery,
					[institutionID],
					function (error, rows, fields) {
						if (error) {
							console.log(error);
							res.sendStatus(400);
						} else {
							db.pool.query(
								deleteInstitutionQuery,
								[institutionID],
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
			}
		}
	);
});

app.delete("/delete-research-paper-ajax/", function (req, res, next) {
	let data = req.body;
	console.log("this is data", data);
	let researchPaperID = parseInt(data.id);
	let deleteResearch_Papers_has_AuthorsQuery = `DELETE FROM Research_Papers_has_Authors WHERE research_paper_id = ?`;
	let deleteResearchPaperQuery = `DELETE FROM Research_Papers WHERE research_paper_id = ?`;
	db.pool.query(
		deleteResearch_Papers_has_AuthorsQuery,
		[researchPaperID],
		function (error, rows, fields) {
			if (error) {
				console.log(error);
				res.sendStatus(400);
			} else {
				db.pool.query(
					deleteResearchPaperQuery,
					[researchPaperID],
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

// listen event
app.listen(PORT, function () {
	console.log(
		"express active on http://localhost:" + PORT + "; Ctrl-C to stop"
	);
});
