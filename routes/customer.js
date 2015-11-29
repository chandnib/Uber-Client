var adminAccountOperations = require('./adminAccountOperations');
var amqp = require('amqp');
var connection = amqp.createConnection({
	host : '127.0.0.1'
});
var rpc = new (require('../rpc/amqprpc'))(connection);

exports.signUpCustomer = function(req, res){
	res.render('Sign_up_Customer', { title: 'HOME' });
}

exports.customerHome = function(req, res){
	console.log("Session Set by Passport !!! ==>  " + JSON.stringify(req.session));
	if (req.session.passport != null && req.session.passport != "") {
		if (req.session.passport.user.EMAIL != ""	&& req.session.passport.user.EMAIL != null) {
			res.render('customerHome', {
				user : JSON.stringify(req.session.passport.user)
			});
		} else
			res.redirect("/invalidCustomerLogin");
	} else
		res.redirect("/invalidCustomerLogin");
}

exports.customerLoginPage = function(req, res) {
	if (req.session.passport != null && req.session.passport != "") {
		console.log("Existing Session on Passport !!! ==>  "
				+ JSON.stringify(req.session));
		if (req.session.passport.user.EMAIL != ""
			&& req.session.passport.user.EMAIL != null) {
			res.redirect('/customerHome');
		} else
			res.render('loginCustomer', {
				user : JSON.stringify({})
			});
	} else
		res.render('loginCustomer', {
			user : JSON.stringify({})
		});
};

exports.adminHome = function(req, res) {
	console.log("Session Set by Passport !!! ==>  "
			+ JSON.stringify(req.session));
	if (req.session.passport != null && req.session.passport != "") {
		if (req.session.passport.user.EMAIL != ""
			&& req.session.passport.user.EMAIL != null) {
			res.render('customerHome', {user : JSON.stringify(req.session.passport.user)});
		} else
			res.redirect("/invalidSessionCustomerLogin");
	} else
		res.redirect("/invalidSessionCustomerLogin");
};

exports.customerSignUp = function(req, res) {
	console.log("Request for Account Creation ==> " + JSON.stringify(req.body));
	var data = {};
	if (req.param("email") && req.param("password") && req.param("firstName")
			&& req.param("lastName") && req.param("mobileNumber")
			&& req.param("language") && req.param("creditCardNumber")
			&& req.param("cvv") && req.param("month") && req.param("year")
			&& req.param("address") && req.param("city") && req.param("state")
			&& req.param("zipCode")) {
		var zipCodeCheck = /^\d{5}(?:[-]\d{4})?$/;	
		if(zipCodeCheck.test(req.param("zipCode")))
			{
		data.EMAIL = req.param("email");
		data.PASSWORD = req.param("password");
		data.FIRSTNAME = req.param("firstName");
		data.LASTNAME = req.param("lastName");
		data.MOBILENUMBER = req.param("mobileNumber");
		data.LANGUAGE = req.param("language");
		data.CREDITCARDNUMBER = req.param("creditCardNumber");
		data.CVV = req.param("cvv");
		data.MONTH = req.param("month");
		data.YEAR = req.param("year");
		data.ADDRESS = req.param("address");
		data.CITY = req.param("city");
		data.STATE = req.param("state");
		data.ZIPCODE = req.param("zipCode");
		rpc.makeRequest("addCustomer", data, function(err, user) {
			console.log("User : " + JSON.stringify(user));
			if (err) {
				res.redirect("/customerSignUp");
			} else {
				if (user.code == "200") {
					console.log("Everthing is fine!!!");
					res.redirect("/Log_In");
				} else {
					res.redirect("/customerSignUpError");
				}
			}
		});
	}
	else {
		res.send({
			"statusCode" : 401
		});
	}
	} else {
		res.send({
			"statusCode" : 401
		});
	}
};

exports.updateProfile = function(req, res) {
	var data = {};

	data.EMAIL = req.param("email");
	data.OLDEMAIL = req.session.passport.user.EMAIL;
	data.PASSWORD = req.param("password");
	data.FIRSTNAME = req.param("firstName");
	data.LASTNAME = req.param("lastName");
	data.CITY = req.param("city");
	data.ZIPCODE = req.param("zip");
	data.PHONENUMBER = req.param("phoneNumber");
	rpc.makeRequest("updateCustomer", data, function(err, user) {
		console.log("User : " + JSON.stringify(user));
		if (err) {
			res.send({"statusCode" : 401});
		} else {
			if (user.code == "200") {
				console.log("Everthing is fine!!!");
				res.send({"statusCode" : 200});
			} else {
				res.send({"statusCode" : 401});
			}
		}
	});

};

exports.deleteCustomer = function(req, res) {
	var data = {};
	data.EMAIL = req.session.passport.user.EMAIL
	rpc.makeRequest("deleteCustomer", data, function(err, user) {
		console.log("User : " + JSON.stringify(user));
		if (err) {
			alert("There is an error: " + err);
		} else {
			if (user.code == "200") {
				console.log("Everthing is fine!!!");
				req.logout();
				req.session.destroy();
				res.redirect("/");
			} else {
				alert("Did not delete. Try again");
			}
		}
	});
};

exports.infoCustomer = function(req, res) {
	var data = {};
	data.EMAIL = req.session.passport.user.EMAIL
	rpc.makeRequest("aboutUser", data, function(err, user) {
		console.log("User : " + JSON.stringify(user));
		if (err) {
			console.log("There is an error: " + err);
		} else {
			if (user.code == "200") {
				console.log("Everthing is fine!!!");
				res.send(user);
			} else {
				console.log("Did not delete. Try again");
			}
		}
	});
};

exports.invalidCustomerLogin = function(req, res) {
	var user = {};
	user.errorInloginForm = true;
	user.errorMessage = "Invalid Username or password!! Please Try again.."
		res.render('loginCustomer', {user : JSON.stringify(user)
		});
};

exports.invalidSessionCustomerLogin = function(req, res) {
	var user = {};
	user.errorInloginForm = true;
	user.errorMessage = "Invalid Session!! Please login again to proceed!!"
		res.render('loginCustomer', {user : JSON.stringify(user)
		});
};

exports.uploadProfilePic = function(req,res){
	if (req.session.passport != null && req.session.passport != "") {
		if (req.session.passport.user.EMAIL != ""	&& req.session.passport.user.EMAIL != null) {
			console.log(req);
			var fs = require('fs');
			fs.readFile(req.files.pofilepic.path, function (err, data) {
				fs.exists(req.files.pofilepic.path)
				var newPath = "/home/rakshithk/workspace/UberServer/public/uploads/"+req.files.pofilepic.name;
				console.log("File newPath " + "");
				fs.writeFile(newPath, data, function (err) {
					data = {IMAGE_URL: "/public/uploads/"+req.files.pofilepic.name,ROW_ID:req.session.passport.user.ROW_ID}
					console.log("File Uploaded" + err);
					rpc.makeRequest("uploadProfilePic", data, function(err, user) {
						console.log("User : " + JSON.stringify(user));
						if (err) {
							console.log("There is an error: " + err);
							res.redirect('/customerHome');
						} else {
							if (user.code == "200") {
								req.session.passport.user.IMAGE_URL = "/public/uploads/"+req.files.pofilepic.name;
								console.log("Everthing is fine!!!");
								res.redirect('/customerHome');
							} else {
								console.log("Did not Upload. Try again");
								res.redirect('/customerHome');
							}
						}
					});
				});
			});

		} else
			res.redirect("/invalidSessionCustomerLogin");
	} else
		res.redirect("/invalidSessionCustomerLogin");
};


exports.CreateCustomer = function(req,res){
	var data = req.body;	
	rpc.makeRequest("CreateCustomer", data, function(err, user) {
		console.log("User : " + JSON.stringify(user));
		if (err) {
			console.log("There is an error: " + err);
		} else {
			if (user.code == "200") {
				console.log("Everthing is fine!!!");
				res.status(200).send(user);
			} else {
				console.log("Did not delete. Try again");
				res.status(404).send("Error");
			}
		}
	});
};
