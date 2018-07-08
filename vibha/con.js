const mysql = require("mysql");


// create a connection
let con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    // REQUIRED FOR MAC USERS
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
  });
  
  // connect
  con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    
  });

module.exports = con;
