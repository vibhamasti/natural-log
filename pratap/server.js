var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');

var app = express();
var mysql = require('mysql');
var md5 = require('md5');

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.engine('html', mustacheExpress());  // set mustache render engine stuff
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var sess;

var con = mysql.createConnection({      //set the sql username and password so that our server can connect to the sql database
  host: "localhost",
  user: "root",
  password: "",
  database: "natural_log"
});


function oauth(req,res)                 // authorization function which authenticates the user
{
    sess = req.session;
    if (sess.oauth)
    {
        res.redirect('/app');
    }
    else if (req.body.user == 'pratap' || req.body.user == 'vibha' || req.body.user == 'aaina')
    {
        
        sess.usr = req.body.user;       //if authorized then store a cookie(<3<3) 
        sess.oauth = true;              //store that they are authorized user
        res.redirect('/app');           //redirect to the actual page
    }
    else
    {
        res.send("username not found");
    }
}

app.get('/', function (req, res) {      //checks to see if the user has alredy logged in or no. if they have, then redirect to the main page else to login
    sess = req.session;
    if (sess.usr) {
        res.redirect('/app');
    }
    else {
        res.sendfile(__dirname + '/public/index.html');
    }
});

app.get('/register', function (req, res) {      //registeration form
	res.sendfile(__dirname + '/public/register.html');
});

app.post('/reg', function (req, res) {          //stores the registeration form into a sql server
    var username = req.body.usr;
    var password = md5(req.body.psswrd);
    var firstname = req.body.fname;             //extracts the user form data and stores it into discrete individual variables
    var lastname = req.body.lname;
    var position = req.body.pos;

    con.connect(function(err) {                 //connect to database
        if (err) throw err;
        console.log("Connected!");
        con.query("insert into users values ("+"'"+username+"'"+","+"'"+password+"'"+","+"'"+position+"'"+","+"'"+firstname+"'"+","+"'"+lastname+"'"+")", function (err, result) {      //the query
            if (err) {
                console.log(err.code);
                if(err.code == "ER_DUP_ENTRY")      //check if there are any duplicate entries
                    res.sendfile(__dirname + '/public/fail.html');
            }
            else {
                console.log("values inserted");
                res.sendfile(__dirname + '/public/success.html');
            }
        });
    });
   
});

app.post('/login', oauth);

app.get('/logout', function (req, res) {

    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });

});

app.get('/app', function (req, res) {
    sess = req.session;
    if (sess.oauth)
        res.render('index', { text: sess.usr });
    else
        res.redirect('/');

});

app.listen(3000, function () {
    console.log("App Started on PORT 3000");
});