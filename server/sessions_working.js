var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sess;

app.get('/', function (req, res) {
    sess = req.session;
    if (sess.email) {
        res.redirect('/admin');
    }
    else {
        res.sendfile(__dirname + '/public/index.html');
    }
});

app.post('/login', function (req, res) {
    sess = req.session;
    sess.email = req.body.user;
    res.end('done');
});

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
app.listen(3000, function () {
    console.log("App Started on PORT 3000");
});