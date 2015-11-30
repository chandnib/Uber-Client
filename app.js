var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, admin= require('./routes/admin')
, customer = require('./routes/customer')
, driver = require ('./routes/driver')
, billing = require ('./routes/billing')
, rides = require ('./routes/rides')
, rating = require ('./routes/rating')
, index = require('./routes/index');

//Passport login for 
var amqp = require('amqp');
var connection = amqp.createConnection({host:'127.0.0.1'});
var rpc = new (require('./rpc/amqprpc'))(connection);

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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

//all environments
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

//development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

//Passport Admin Local Strategy
passport.use('admin-local',new LocalStrategy({ usernameField: 'username',
	passwordField: 'password'},
	function(username, password, done) {
		console.log("username : "+ username + "  password :  " + password);
		process.nextTick(function () {
			var data = {};
			data.EMAIL = username;
			data.PASSWORD = password;
			rpc.makeRequest("verifyAdmin", data,
					function(err, user) {
				console.log("User : "+ JSON.stringify(user));
				if(err){
					return done(null, false);
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
			});

		});
	}
));
//END


//Passport Customer Local Strategy
passport.use('customer-local', new LocalStrategy({ usernameField: 'username',
	passwordField: 'password'},
	function(username, password, done) {
		console.log("customer ==> username : "+ username + "  password :  " + password);
		process.nextTick(function () {
			var data = {};
			data.EMAIL = username;
			data.PASSWORD = password;
			rpc.makeRequest("verifyCustomer", data,
					function(err, user) {
				console.log("User : "+ JSON.stringify(user));
				if(err){
					return done(null, false);
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
			});
		});
	}
));

//Passport Driver Local Strategy
passport.use('driver-local',new LocalStrategy({ usernameField: 'username',
	passwordField: 'password'},
	function(username, password, done) {
		console.log("username : "+ username + "  password :  " + password);
		process.nextTick(function () {
			var data = {};
			data.EMAIL = username;
			data.PASSWORD = password;
			rpc.makeRequest("verifyDriver", data,
					function(err, user) {
				console.log("User : "+ JSON.stringify(user));
				if(err){
					return done(null, false);
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
							console.log("Login Failed !!!!!!")
							return done(null, false);
						}

					}
				}
			});

		});
	}
));
//END

//passport Login Functions
app.post('/loginAdmin', 
		passport.authenticate('admin-local', {
			successRedirect: '/adminHome',
			failureRedirect: '/invalidAdminLogin'}));
app.post('/loginCustomer', 
		passport.authenticate('customer-local', {
			successRedirect: '/customerHome',
			failureRedirect: '/invalidCustomerLogin'}));
app.post('/loginDriver', 
		passport.authenticate('driver-local', {
			successRedirect: '/driverHome',
			failureRedirect: '/invalidDriverLogin'}));

//General
app.get('/', index.home);
app.get('/Log_In', index.login);
app.get('/Log_Out', index.logout);

//Admin
app.get('/adminLoginPage',admin.adminLoginPage);
app.get('/customerLoginPage',customer.customerLoginPage);
app.get('/driverLoginPage',driver.driverLoginPage);
app.get('/adminHome',admin.adminHome);
app.get('/invalidAdminLogin',admin.invalidAdminLogin);
app.get('/invalidSessionAdminLogin',admin.invalidSessionAdminLogin);
app.post('/loadUnverifiedCustomers', admin.loadUnverifiedCustomers);
app.post('/approveCustomer',admin.approveCustomer);
app.post('/rejectCustomer',admin.rejectCustomer);
app.post('/approveAllCustomer',admin.approveAllCustomer);
app.post('/rejectAllCustomer',admin.rejectAllCustomer);
app.post('/loadUnverifiedDrivers', admin.loadUnverifiedDrivers);
app.post('/approveDriver',admin.approveDriver);
app.post('/rejectDriver',admin.rejectDriver);
app.post('/approveAllDriver',admin.approveAllDriver);
app.post('/rejectAllDriver',admin.rejectAllDriver);
app.post('/loadCustomerDetail',admin.loadCustomerDetail);
app.post('/loadDriverDetail',admin.loadDriverDetail);

//Customer
app.get('/invalidCustomerLogin',customer.invalidCustomerLogin);
app.get('/invalidSessionCustomerLogin',customer.invalidSessionCustomerLogin);
app.get('/signUpCustomer', customer.signUpCustomer);
app.get('/customerHome', customer.customerHome);
app.get('/CustomerEditProfile', customer.infoCustomer)
app.get('/deleteCustomer', customer.deleteCustomer);
app.post('/addCustomer', customer.customerSignUp);
app.post('/updateProfile', customer.updateProfile);
app.post('/uploadProfilePic',customer.uploadProfilePic);
app.post('/CreateCustomer',customer.CreateCustomer);

//Driver
app.get('/invalidSessionDriverLogin',driver.invalidSessionDriverLogin);
app.get('/invalidDriverLogin',driver.invalidDriverLogin);
app.get('/signUpDriver', driver.signUpDriver);
app.get('/driverHome', driver.driverHome);
app.get('/deleteDriver', driver.deleteDriver);
app.get('/DriverEditProfile', driver.infoDriver);
app.post('/addDriver', driver.driverSignUp);
app.post('/updateProfile', customer.updateProfile);
app.post('/updateDriverProfile', driver.updateProfile);
app.post('/uploadProfilePicDriver',driver.uploadProfilePicDriver);

app.post('/CreateDrivers',driver.CreateDrivers);
//Rekha
app.post('/showDriverin10Mile', driver.showDriverin10Mile);


//Rides
app.post('/createRide',rides.createRide);
app.post('/editRide',rides.editRide);
app.post('/deleteRide',rides.deleteRide);
app.post('/startRide',rides.startRide);
app.post('/cancelRide',rides.cancelRide);
app.post('/endRide',rides.endRide);
app.get('/fetchRideStatus',rides.fetchRideStatus);
app.get('/getRideCreated',rides.getRideCreated);
app.get('/getCustomerTripSummary',rides.getCustomerTripSummary);


//Billing call by Parteek
app.get('/getBillSummary',billing.generateBill);
app.get('/getFareEstimate',billing.getFareEstimate);

//Rating call by Parteek
app.post('/saveCustomerRating',rating.saveCustomerRating);
app.post('/saveDriverRating',rating.saveDriverRating);
app.get('/getDriverRating',rating.getDriverRating);
app.get('/getCustomerRating',rating.getCustomerRating);

//Server
/*mongo.connect(mongoSessionConnectURL, function() {
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Uber server listening on port ' + app.get('port'));
	});
});*/

//Clustering
	mongo.connect(mongoSessionConnectURL, function() { 
		app.listen(app.get('port'), function() {
			process.send({ cmd: 'notifyRequest' });
	console.log("Uber Cluster Server running at PORT ==> " + app.get('port'));
	});
})
