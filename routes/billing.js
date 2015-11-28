var ejs = require("ejs");
// var mysql = require('./mysql');
var mq_client = require('../rpc/client');


exports.generateBill = function(req, res) {
	var rideId = req.param("rideID");
	var distance = req.param("distance");
	var time = req.param("time");
	console.log("rideId :  "+ rideId);
	console.log("distance :  "+ distance);
	console.log("time :  "+ time);

	var msg_payload = {"rideId" : rideId,"distance" : distance,"time" : time};

	mq_client.make_request('uber_generateBill_queue',msg_payload,function(err, results) 
			{
						console.log(results);
						if (err) 
						{
							throw err;
						} 
						else 
						{
							if (results.code == 200) 
							{
								console.log("back to node: ride inserted successful");
								res.send(results);
							}
						}
					});
};

