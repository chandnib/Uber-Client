var ejs = require("ejs");
// var mysql = require('./mysql');
var mq_client = require('../rpc/client');


exports.saveCustomerRating = function(req, res) {
	var customerId = req.param("customerId");
	var rideId = req.param("rideId");
	var driverId = req.param("driverId");
	var rating = req.param("rating");
	console.log("rideId :  "+ rideId);
	console.log("customerId :  "+ customerId);
	console.log("rating :  "+ rating);
	console.log("driverId :  "+ driverId);
	var msg_payload = {"customerId" : customerId,"rideId" : rideId,"rating" : rating};

	mq_client.make_request('uber_saveCustomerRating_queue',msg_payload,function(err, results) 
			{
						console.log(results);
						if (results.code != 200) 
						{
							console.log(results.value);
							
						} 
						else 
						{
							if (results.code === 200) 
							{
								console.log("back to node: Customer Rating saved succesfully");
								res.send(results);
							}
						}
					});
};


exports.saveDriverRating = function(req, res) {
	var customerId = req.param("customerId");
	var rideId = req.param("rideId");
	var driverId = req.param("driverId");
	var rating = req.param("rating");
	console.log("rideId :  "+ rideId);
	console.log("customerId :  "+ customerId);
	console.log("rating :  "+ rating);
	console.log("driverId :  "+ driverId);
	var msg_payload = {"customerId" : customerId,"rideId" : rideId,"rating" : rating};

	mq_client.make_request('uber_saveDriverRating_queue',msg_payload,function(err, results) 
			{
						console.log(results);
						if (results.code != 200) 
						{
							console.log(results.value);
							res.send(null);
							
						} 
						else 
						{
							if (results.code === 200) 
							{
								console.log("back to node: Driver Rating saved succesfully");
								res.send(results);
							}
						}
					});
};


exports.getDriverRating = function(req, res) {
	var driverId = req.param("driverId");
	console.log("driverId :  "+ driverId);
	var msg_payload = {"driverId" : driverId};

	mq_client.make_request('uber_getDriverRating_queue',msg_payload,function(err, results) 
			{
						console.log(results);
						if (results.code != 200) 
						{
							console.log(results.value);
							res.send(null);
							
						} 
						else 
						{
							if (results.code === 200) 
							{
								console.log("back to node: Driver Rating saved succesfully");
								res.send(results);
							}
						}
					});
};

exports.getCustomerRating = function(req, res) {
	var customerId = req.param("customerId");
	console.log("customerId :  "+ customerId);
	var msg_payload = {"customerId" : customerId};

	mq_client.make_request('uber_getCustomerRating_queue',msg_payload,function(err, results) 
			{
						console.log(results);
						if (results.code != 200) 
						{
							console.log(results.value);
							res.send(null);
							
						} 
						else 
						{
							if (results.code === 200) 
							{
								console.log("back to node: Driver Rating saved succesfully");
								res.send(results);
							}
						}
					});
};
