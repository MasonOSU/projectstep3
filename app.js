var express = require('express');
var app = express();
PORT = 1991;

var db = require('./database/db-connector');

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

app.get('/', function(req, res){
    res.render('index');
});

app.get('/research_papers', function(req, res){
    let query1 = "SELECT * FROM Research_Papers;";
    db.pool.query(query1, function(error, rows, fields){
        res.render('research_papers', {data: rows});
        });
});

app.get('/citations', function(req, res){
    let query = "SELECT * FROM Citations;";
    db.pool.query(query, function(error, rows, fields){
        res.render('citations', {data: rows});
        });
});

app.get('/authors', function(req, res){
    let query = "SELECT * FROM Authors;";
    db.pool.query(query, function(error, rows, fields){
        res.render('authors', {data: rows});
        });
});

app.get('/research_papers_authors', function(req, res){
    let query = "SELECT * FROM Research_Papers_has_Authors;";
    db.pool.query(query, function(error, rows, fields){
        res.render('research_papers_authors', {data: rows});
        });
});

app.get('/institutions', function(req, res){
    let query = "SELECT * FROM Institutions;";
    db.pool.query(query, function(error, rows, fields){
        res.render('institutions', {data: rows});
        });
});

app.get('/disciplines', function(req, res){
    let query = "SELECT * FROM Disciplines;";
    db.pool.query(query, function(error, rows, fields){
        res.render('disciplines', {data: rows});
        });
});

app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});