let con = require('./con.js');

class Users {
    createTable() {
        // TODO: unique primary key
        let qry = "CREATE TABLE IF NOT EXISTS testschool.users (username varchar(40) PRIMARY KEY, password varchar(14));";
        con.query(qry);
    }
    deleteOldTable() {
        let qry = "DELETE FROM testschool.users;";
        con.query(qry);
    }
    addUser(username, password) {
        let qry = "ENTER INTO testschool.users VALUES ('" + username + "',  '" + password + "');";
        con.query(qry);
    }
    removeUser(username) {
        let qry = "DELETE FROM testschool.users WHERE username = '" + username + "';";
        con.query(qry);
    }
}


module.exports = Users;