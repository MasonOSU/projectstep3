// get mysql instance to use
var mysql = require("mysql");

// init connection pool with credentials
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_blanform",
  password: "apple",
  database: "cs340_blanform",
});

// export for app use
module.exports.pool = pool;
