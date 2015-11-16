var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , admin= require('./routes/admin');

//Passport login for 
var amqp = require('amqp');
var connection = amqp.createConnection({host:'127.0.0.1'});
var rpc = new (require('./rpc/amqprpc'))(connection);

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var connection = mysql.createConnection({
	multipleStatements: true,
	host : 'localhost',
	user : 'root',
	password : 'YyX26VXPxLHAGQK8',
	database: 'uberdb',
	connectTimeout: 6000,
	waitForConnections: true,
	pool: false,
});
var mongoose = require('mongoose/');
mongoose.connect('mongodb://localhost:27017/authentication');

//MongoSession
var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo"); // Database configuration file

var app = express();

//Sessions handling in mongodb
app.use(expressSession({
	secret : 'uberApplicationPrototype',
	resave : true,
	saveUninitialized : false,
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({ url: mongoSessionConnectURL })
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon("/images/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);

//Exposing the public folder to be accessed
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + "/public"));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Admin Related
//Passport Login function
app.get('/adminLoginPage',admin.adminLoginPage);
app.get('/adminHome',admin.adminHome);
app.get('/invalidAdminLogin',admin.invalidAdminLogin);
app.get('/invalidSessionAdminLogin',admin.invalidSessionAdminLogin);
app.post('/loginAdmin', 
passport.authenticate('local', {
	successRedirect: '/adminHome',
	failureRedirect: '/invalidAdminLogin'
}));

//Passport Login for admin
var Schema = mongoose.Schema;

var UserDetail = new Schema({
	"EMAIL" : String,
	"PASSWORD" : String
}, {collection: 'USERS'});

var UserDetails = mongoose.model('USERS',UserDetail);

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

//Passport Login Local Strategy
passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log("username : "+ username + "  password :  " + password);
		process.nextTick(function () {
			//UserDetails.findOne({'EMAIL':username},
			//connection.query("select * from ADMIN where EMAIL = '"+username+"'",
			var data = {};
			data.EMAIL = username;
			data.PASSWORD = password;
			rpc.makeRequest("verifyUser", data,
			function(err, user) {
				console.log("User : "+ JSON.stringify(user));
				if(err){
					return done(err);
				}
				else{
					if(user == null || user == "" || user == {}){
						return done(null, false);
					}
					else{
						if(user.code == "200"){
							console.log("Everthing is fine!!!")
							return done(null, user);
						}else{
							return done(null, false);
						}
						
					}
				}
				/*if (err) {//Activate for non MQPassport Auth 
					return done(err);
				}else{
					if (user == [] || user == "" || user == null || user == {}) {
						return done(null, false); 
					}else{
						//if (!bcrypt.compareSync(password,user.PASSWORD)) {
						if (password != user[0].PASSWORD) {
							return done(null, false); 
						}
						else{
							return done(null, user[0]);
						}
					}
				}*/
			});
		});
	}
));
//END

app.get('/', function(req, res){
	  res.render('home', { title: 'HOME' });
	});

mongo.connect(mongoSessionConnectURL, function() {
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Uber server listening on port ' + app.get('port'));
	});
});
