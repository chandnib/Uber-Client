var async = require('async');
var adminAccountOperations = require('./adminAccountOperations');
var requestId = 0;

function deligateMQAccessRequest(operation,data,req,res,requestId,rpc){

	console.log("handleDBRequest - " + operation +" with requestId : " + requestId);

	switch(operation){
	
		case "loadUnverifiedCustomers" :
			console.log("loadUnverifiedCustomers ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
				rpc.makeRequest("loadUnverifiedCustomers", data, function(err, response) {
					console.log("Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
						console.log(response);
						res.status(200).send(response.data);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");
					}
				});
			}
			else{
				adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
			}
		break;
		
		case "approveCustomer" :
			console.log("approveCustomer ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
				//data ==> contains Customer Info
				rpc.makeRequest("approveCustomer", data, function(err, response) {
					console.log("Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
						console.log(response);
						res.status(200).send(response.data);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");
					}
				});
			}
			else{
				adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
			}
			break;
			
		case "rejectCustomer" :
			console.log("rejectCustomer ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
				//data ==> contains Customer Info
				rpc.makeRequest("rejectCustomer", data, function(err, response) {
					console.log("Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
						console.log(response);
						res.status(200).send(response.data);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");
					}
				});
			}
			else{
				adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
			}
			break;
			
		case "approveAllCustomer" :
			console.log("approveAllCustomer ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
				//data ==> contains Customer Info
				rpc.makeRequest("approveAllCustomer", data, function(err, response) {
					console.log("Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
						console.log(response);
						res.status(200).send(response.data);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");
					}
				});
			}
			else{
				adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
			}
			break;
			
		case "rejectAllCustomer" :
			console.log("rejectAllCustomer ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
				//data ==> contains Customer Info
				rpc.makeRequest("rejectAllCustomer", data, function(err, response) {
					console.log("Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
						console.log(response);
						res.status(200).send(response.data);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");
					}
				});
			}
			else{
				adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
			}
			break;
			
		case "loadUnverifiedDrivers" :
			console.log("loadUnverifiedDrivers ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
				rpc.makeRequest("loadUnverifiedDrivers", data, function(err, response) {
					console.log("Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
						console.log(response);
						res.status(200).send(response.data);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");
					}
				});
			}
			else{
				adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
			}
		break;
		
		case "approveDriver" :
			console.log("approveDriver ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
				//data ==> contains Driver Info
				rpc.makeRequest("approveDriver", data, function(err, response) {
					console.log("Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
						console.log(response);
						res.status(200).send(response.data);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");
					}
				});
			}
			else{
				adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
			}
			break;
			
		case "rejectDriver" :
			console.log("rejectDriver ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
				//data ==> contains Driver Info
				rpc.makeRequest("rejectDriver", data, function(err, response) {
					console.log("Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
						console.log(response);
						res.status(200).send(response.data);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");
					}
				});
			}
			else{
				adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
			}
			break;
			
		case "approveAllDriver" :
			console.log("approveAllDriver ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){
				//data ==> contains Driver Info
				rpc.makeRequest("approveAllDriver", data, function(err, response) {
					console.log("Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
						console.log(response);
						res.status(200).send(response.data);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");
					}
				});
			}
			else{
				adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
			}
			break;
			
		case "rejectAllDriver" :
			console.log("rejectAllDriver ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){						
				//data ==> contains Driver Info
				rpc.makeRequest("rejectAllDriver", data, function(err, response) {
					console.log("Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
						console.log(response);
						res.status(200).send(response.data);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");																																																																																																																																																																
					}
				});
			}
			else{
				adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
			}
			break;
			
		case "loadCustomerDetail" :
			console.log("loadCustomerDetail ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){						
				//data ==> contains Driver Info
				rpc.makeRequest("loadCustomerDetail", data, function(err, response) {
					console.log("loadCustomerDetail Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
							console.log(response);
							res.status(200).send(response.data);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");																																																																																																						
					}
				});
			}
			else{
				adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
			}
			break;

		case "loadDriverDetail" :
			console.log("loadDriverDetail ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){						
				//data ==> contains Driver Info
				rpc.makeRequest("loadDriverDetail", data, function(err, response) {
					console.log("loadDriverDetail Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
							console.log(response);
							res.status(200).send(response.data);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");																																																																																																						
					}
				});
			}
			else{
				adminAccountOperations.userUnverified(res,"Your Session is no Longer Valid!! Please login again to Proceed.",{},req);
			}
			break;

		case "searchBill" :
			console.log("searchBill ==> " + operation);	
			if(req.session.passport.user.EMAIL != "" && req.session.passport.user.EMAIL != null){						
				//data ==> contains Driver Info
				rpc.makeRequest("searchBill", data, function(err, response) {
					console.log("searchBill Response from RabbitMQ Server ==> " + JSON.stringify(response));
					if (response){
						if(response.code == 200) {
							console.log(response);
							res.status(200).send(response);
						}else{
							res.status(404).send(response.err);
						}
					}else{
						res.status(404).send("error in Executing the operation!!");																																																																																																						
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
