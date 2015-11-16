var amqp = require('amqp');
var connection = amqp.createConnection({host:'127.0.0.1'});
var rpc = new (require('../rpc/amqprpc'))(connection);

module.exports = {
		setup : function(){
			console.log("RabbitMQ Connection Setup!!");
		},
		verifyUserSession : function(user,req,res){
			var MQConnection = require('./mongoDBRequestBroker');
			MQConnection.handleDBRequest("verifyUserSession",user,req,res,rpc);
		},
		userUnverified : function(req,res){
			res.redirect("/invalidSessionAdminLogin");
		}
};

function userLogin(res,data,req){
	var userName = data.username;
	console.log("userName " + userName);
	if(req.session.username == "" || req.session.username == null){
		req.session.username = data.emailM;
		req.session.firstname = data.firstname;
		req.session.lastname = data.lastname;
		req.session.ROW_ID = data.ROW_ID;
		req.session.IMAGE_URL = data.IMAGE_URL;
		console.log("Session set" + req.session.username + "," + req.session.ROW_ID + "," + req.session.firstname + ", " + req.session.IMAGE_URL);
	}else
		console.log("Exisiting Session " + req.session.username + "," + req.session.ROW_ID + "," + req.session.firstname + ", " + req.session.IMAGE_URL);
	res.redirect("/home");//Default Action !!
	//res.status(200).send("Sucessful Login");
};