var adminAccountOperations = require('./adminAccountOperations');
adminAccountOperations.setup();

//Changes Made
exports.adminLoginPage = function(req, res){
	if(req.session.passport != null && req.session.passport != ""){
		console.log("Existing Session on Passport !!! ==>  " + JSON.stringify(req.session));
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			res.redirect("/adminHome");
		}
		else
			res.render('loginAdmin', {user:JSON.stringify({})});
	}
	else
		res.render('loginAdmin', {user:JSON.stringify({})});
};

exports.adminHome = function(req, res){
	console.log("Session Set by Passport !!! ==>  " + JSON.stringify(req.session));
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			res.render('adminHome', {user:JSON.stringify(req.session.passport.user)});
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

//Changes Made
exports.invalidAdminLogin = function(req, res){
	var user = {};
	user.errorInloginForm = true;
	user.errorMessage = "Invalid Username or password!! Please Try again.."
	res.render('loginAdmin', {user:JSON.stringify(user)});
};

//Changes Made
exports.invalidSessionAdminLogin = function(req, res){
	var user = {};
	user.errorInloginForm = true;
	user.errorMessage = "Invalid Session!! Please login again to proceed!!"
	res.render('loginAdmin', {user:JSON.stringify(user)});
};

//Changes Made
exports.loadUnverifiedCustomers = function(req,res){
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			adminAccountOperations.loadUnverifiedCustomers({},req,res);
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

//Changes Made
exports.approveCustomer = function(req,res){
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			adminAccountOperations.approveCustomer(req.body,req,res);
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

exports.rejectCustomer = function(req,res){
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			adminAccountOperations.rejectCustomer(req.body,req,res);
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

exports.approveAllCustomer = function(req,res){
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			adminAccountOperations.approveAllCustomer(req.body,req,res);
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

exports.rejectAllCustomer = function(req,res){
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			adminAccountOperations.rejectAllCustomer(req.body,req,res);
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

//Changes Made
exports.loadUnverifiedDrivers = function(req,res){
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			adminAccountOperations.loadUnverifiedDrivers({},req,res);
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

//Changes Made
exports.approveDriver = function(req,res){
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			adminAccountOperations.approveDriver(req.body,req,res);
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

exports.rejectDriver = function(req,res){
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			adminAccountOperations.rejectDriver(req.body,req,res);
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

exports.approveAllDriver = function(req,res){
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			adminAccountOperations.approveAllDriver(req.body,req,res);
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

exports.rejectAllDriver = function(req,res){
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			adminAccountOperations.rejectAllDriver(req.body,req,res);
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

exports.loadCustomerDetail = function(req,res){
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			adminAccountOperations.loadCustomerDetail(req.body,req,res);
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

exports.loadDriverDetail = function(req,res){
	if(req.session.passport != null && req.session.passport != ""){
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			adminAccountOperations.loadDriverDetail(req.body,req,res);
		}
		else
			res.redirect("/invalidSessionAdminLogin");
	}
	else
		res.redirect("/invalidSessionAdminLogin");
};

