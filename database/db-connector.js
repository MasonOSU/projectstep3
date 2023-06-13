// `db-connector.js` sets up a connection pool for connecting to a MySQL database.
// Code citation:
// // Dr. Michael Curry. 2022. "Step 1 - Connecting to a MySQL Database".
// // [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app/. URL

// Lines 8-21 (Curry)
// Get a MySQL instance.
var mysql = require("mysql");

// Create a connection pool with credentials.
var pool = mysql.createPool

	// Set the maximum allowed pool connections.
	({connectionLimit: 10,
		host: "classmysql.engr.oregonstate.edu",
		user: "*",
		password: "*",
		database: "*",});

// Export the connection pool to be used by other modules.
module.exports.pool = pool;
