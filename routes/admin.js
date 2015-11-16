var adminAccountOperations = require('./adminAccountOperations');

exports.adminLoginPage = function(req, res){
	if(req.session.passport != null && req.session.passport != ""){
		console.log("Existing Session on Passport !!! ==>  " + JSON.stringify(req.session));
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			res.render('adminHome', {user:JSON.stringify(req.session.passport.user)});
		}
		else
			res.render('loginadmin', {user:JSON.stringify({})});
	}
	else
		res.render('loginadmin', {user:JSON.stringify({})});
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

