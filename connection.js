var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bobo_1995",
    database: "employee_trackerDB"
});

connection.connect((err) => {
    if (err) throw err;
    //console.log("\n" + "connected as id " + connection.threadId + "\n");
});

module.exports = connection;