let con = require('./con.js');
let Users = require('./users.js');

let usertable = new Users();

class Admin  {
    // TODO: figure out how this works
    constructor(username) {
        this.username = username;
    }
    addTeacher(username, name) {
        usertable.addUser(username, password);
    }
    
}

module.exports = Admin;