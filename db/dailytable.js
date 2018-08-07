let con = require('./con.js');

// daily tables created for classroom entries
class DailyTable {
    constructor() {
        let today = new Date();
        this.day = (today.getDate() < 10? '0': '') + today.getDate();
        this.month = (today.getMonth() < 10? '0': '') + today.getMonth();
        this.year = today.getFullYear();
        this.tablename = this.day + this.month + this.year;
    }
    
    // cleans up old tables
    refresh() {
        // TODO: fix this
        let today = new Date();
        let fifteen = new Date(today.getTime() - (15 * 24 * 60 * 60 * 1000));
        console.log(fifteen.getDate + fifteen.getMonth + fifteen.getFullYear);
    }

    createTable() {
        let qry = "CREATE TABLE IF NOT EXISTS testschool." + this.tablename + " (username varchar(40), class varchar(4), period varchar(2), des varchar(150));";
        con.query(qry);
    }

    getTableName() {
        return this.tablename;
    }
    
    // for today
    makeEntry(username, cls, period, des) {
        // TODO: check for testschool necessity
        let qry = "ENTER INTO testschool." + this.tablename + " VALUES ('" + username + "',  '" + cls + "', '" + period + "', '" + des + "');";
        con.query(qry);
    }    

    // for days prior to today
    makeEntry(username, cls, period, des, table_name) {
        // checks if table exists and enters data into it
        let qry = "IF (SELECT count(*)FROM information_schema.tables WHERE table_schema ='testschool'AND table_name ='" + table_name + "') > 0\
        THEN\
        ENTER INTO testschool." + table_name + 
        " VALUES ('" + username + "',  '" + cls + "', '" + period + "', '" + des + "')\
        END IF";

        con.query(qry);
    }

}

module.exports = DailyTable;