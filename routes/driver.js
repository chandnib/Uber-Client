var adminAccountOperations = require('./adminAccountOperations');
var amqp = require('amqp');
var connection = amqp.createConnection({host:'127.0.0.1'});
var rpc = new (require('../rpc/amqprpc'))(connection);

exports.driverLoginPage = function(req, res){
	if(req.session.passport != null && req.session.passport != ""){
		console.log("Existing Session on Passport !!! ==>  " + JSON.stringify(req.session));
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			res.render('adminHome', {user:JSON.stringify(req.session.passport.user)});
		}
		else
			res.render('loginDriver', {user:JSON.stringify({})});
	}
	else
		res.render('loginDriver', {user:JSON.stringify({})});
};

exports.adminHome = function(req, res){
	console.log("Session Set by Passport !!! ==>  " + JSON.stringify(req.session));
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			res.render('adminHome', {user:JSON.stringify(req.session.passport.user)});
		}
		else
			res.redirect("/invalidAdminLogin");
	}
	else
		res.redirect("/invalidAdminLogin");
};

exports.driverSignUp = function(req, res){
	var data = {};
	if(req.param("email") && req.param("password") && req.param("firstName") && req.param("lastName") && req.param("mobileNumber") && req.param("carModel") && req.param("carColor") && req.param("carYear") && req.param("address") && req.param("city") && req.param("state") && req.param("zipCode"))
		{
	data.EMAIL = req.param("email");
	data.PASSWORD = req.param("password");
	data.FIRSTNAME = req.param("firstName");
	data.LASTNAME = req.param("lastName");
	data.MOBILENUMBER = req.param("mobileNumber");
	data.CARMODEL = req.param("carModel");
	data.CARCOLOR = req.param("carColor");
	data.CARYEAR = req.param("carYear");
	data.ADDRESS = req.param("address");
	data.CITY = req.param("city");
	data.STATE = req.param("state");
	data.ZIPCODE = req.param("zipCode");
		rpc.makeRequest("addDriver", data,
				function(err, user) {
			console.log("User : "+ JSON.stringify(user));
			if(err){
				res.redirect("/customerSignUp");
			}
			else{
					if(user.code == "200"){
						console.log("Everthing is fine!!!");
						res.redirect("/Log_In");					
						}
					else{
						res.redirect("/customerSignUpError");
					}
			}
		});
		}
	else
		{
		res.send({"statusCode" : 401});
		}
};

exports.invalidAdminLogin = function(req, res){
	var user = {};
	user.errorInloginForm = true;
	user.errorMessage = "Invalid Username or password!! Please Try again.."
	res.render('loginadmin', {user:JSON.stringify(user)});
};

exports.invalidSessionAdminLogin = function(req, res){
	var user = {};
	user.errorInloginForm = true;
	user.errorMessage = "Invalid Session!! Please login again to proceed!!"
	res.render('loginadmin', {user:JSON.stringify(user)});
};

