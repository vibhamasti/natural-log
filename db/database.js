 let con = require('./con.js');
 const CronJob = require("cron").CronJob;

 // table classes
 let DailyTable = require('./dailytable.js');
 let Users = require('./users.js');


 // create school database
 // TODO: check if databases are necessary
 con.query("CREATE DATABASE IF NOT EXISTS testschool;", (err, res) => {
    if (err) throw err;
    console.log(res);
});


// create table every day
let todayTable = new CronJob({
  cronTime: '00 01 00 * * 1-6',
  //cronTime: '* * * * * *', // every second (for testing)
  onTick: () => {
    let today = new DailyTable();
    today.refresh();
    today.createTable();
    //console.log("Created!!");
    /*
     * Runs every working day (Monday through Saturday)
     * at 12:01:00 AM. It does not run on Sunday.
     */
  },
  start: false,
  timeZone: 'Asia/Calcutta'
});

// TODO: fix errors
let usersTable = new CronJob ({
    cronTime: '00 01 00 1 6 0',
    //cronTime: '* * * * * *', // every second (for testing)
    onTick: () => {
        let users = new Users();
        users.deleteOldTable();
        users.createTable();
        //console.log("Deleted and created!!!");
    /*
     * Runs every 1st of June.
     */
    },
    start: false,
    timeZone: 'Asia/Calcutta'
});


// start the job
todayTable.start();
usersTable.start();
