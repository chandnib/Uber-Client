var async = require('async');
var adminAccountOperations = require('./adminAccountOperations');
var requestId = 0;

function deligateMQAccessRequest(operation,data,req,res,requestId,rpc){

	console.log("handleDBRequest - " + operation +" with requestId : " + requestId);

	switch(operation){
	case "verifyUserSession" :
		console.log("verifyUserSession ==> " + operation);	
		if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
			data = {};
			data.EMAIL =  req.session.passport.user.EMAIL;
			data.PASSWORD = req.session.passport.user.PASSWORD;
			data.ROW_ID = req.session.passport.user.ROW_ID;
			rpc.makeRequest(verifyUserSession, data, function(err, response) {
				console.log("Response from RabbitMQ Server ==> " + JSON.stringify(response));
				if (!response || response.code == 200) {
					
				}else{
					adminAccountOperations.userUnverified(req, res)
				}
			});
		}
		else{
			adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
		}
		break;

	default:
		break;
	}
}



module.exports = {
	handleDBRequest : function(operation,data,req,res,rpc){
		console.log("handleDBRequest got the Request to '" + operation +"' and its handled with RequestId : " + requestId);
		deligateMQAccessRequest(operation,data,req,res,requestId,rpc);
		requestId++;
	}
};
