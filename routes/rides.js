var ejs = require("ejs");
// var mysql = require('./mysql');
var mq_client = require('../rpc/client');


exports.createRide = function(req, res) {
	var pickup_address = req.param("pickup_address");
	var dropoff_address = req.param("dropoff_address");
	var pickupLat = req.param("pickupLat");
	var pickupLng = req.param("pickupLng");
	var dropoffLat = req.param("dropoffLat");
	var dropoffLng = req.param("dropoffLng");
	var customer_id = req.param("customer_id");
	var driver_id = req.param("driver_id");
	var pickup_location, dropoff_location;

	console.log(JSON.stringify(pickup_address));
	console.log(JSON.stringify(dropoff_address));
	console.log("pickup address" + pickup_address[0]);
	console.log("Street :  "+ pickup_address[0].address_components[0].long_name);
	console.log("Route :  "+ pickup_address[0].address_components[1].long_name);
	console.log("Locality :  "+ pickup_address[0].address_components[2].long_name);
	console.log("State :  "+ pickup_address[0].address_components[4].long_name);
	console.log("State :  "+ pickup_address[0].address_components[3].long_name);
	console.log("Country :  "+ pickup_address[0].address_components[5].long_name);
	console.log("Zip Code :  "+ pickup_address[0].address_components[6].long_name);

	var msg_payload = {"location" : pickup_address,"latitude" : pickupLat,"longitude" : pickupLng};

	mq_client.make_request('uber_createLocation_queue',msg_payload,function(err, results) 
			{
						console.log(results);
						if (err) 
						{
							throw err;
						} 
						else 
						{
							console.log("i'm here");
							if (results.code == 200) {
								console.log("back to node: pickup location inserted successful");
								pickup_location = results.value;
								console.log("pickup_location : "+ pickup_location);

								msg_payload = {"location" : dropoff_address,"latitude" : dropoffLat,"longitude" : dropoffLng};
								mq_client.make_request('uber_createLocation_queue',msg_payload,function(err, results_dropoff) 
										{
													console.log(results);
													if (err) 
													{
														throw err;
													} 
													else 
													{
														console.log("i'm here");
														if (results.code == 200) {
															console.log("back to node: dropoff location inserted successful");
															dropoff_location = results_dropoff.value;
															console.log("dropoff_location : "+ dropoff_location);

															msg_payload = {"pickup_location" : pickup_location,"dropoff_location" : dropoff_location,"customer_id" : customer_id,"driver_id" : driver_id};

															mq_client.make_request('uber_createRide_queue',msg_payload,function(err,results) 
																	{
																				console.log(results);
																				if (err) 
																				{
																					throw err;
																				}
																				else 
																				{
																					console.log("i'm here");
																					if (results.code == 200) 
																					{
																						console.log("back to node: ride inserted successful");
																						res.send(results);
																					}
																					else 
																					{
																						console.log("back to node: insert failed");
																						res.send("failed");
																					}
																				}
																			});

														} else {
															console.log("back to node: insert failed");
															// res.send("failed");
														}
													}
												});

								// res.send(results.value);
							} else {
								console.log("back to node: insert failed");
								res.send("failed");
							}
						}
					});
};

exports.editRide = function(req, res) {
	console.log("inside edit ride");
	var newdropoff_address = req.param("newdropoff_location");
	var newdropoffLat = req.param("newdropoffLat");
	var newdropoffLng = req.param("newdropoffLng");
	var customer_id = 12345;
	var msg_payload, newdropoff_location;

	console.log(newdropoff_address + "," + newdropoffLat + "," + newdropoffLng);

	console.log(JSON.stringify(newdropoff_address));
	console.log("newdrop off address");
	console.log("Street :  "+ newdropoff_address[0].address_components[0].long_name);
	console.log("Route :  "+ newdropoff_address[0].address_components[1].long_name);
	console.log("Locality :  "+ newdropoff_address[0].address_components[2].long_name);
	console.log("Admin area :  "+ newdropoff_address[0].address_components[3].long_name);
	console.log("State :  "+ newdropoff_address[0].address_components[4].long_name);
	console.log("Country :  "+ newdropoff_address[0].address_components[5].long_name);
	console.log("Zip Code :  "+ newdropoff_address[0].address_components[6].long_name);

	msg_payload = {
		"location" : newdropoff_address,
		"latitude" : newdropoffLat,
		"longitude" : newdropoffLng
	};
	mq_client.make_request('uber_createLocation_queue',msg_payload,function(err, results_newdropoff)
			{
						console.log(results_newdropoff);
						if (err) 
						{
							throw err;
						}
						else 
						{
							console.log("i'm here");
							if (results_newdropoff.code == 200) {
								console.log("back to node: new dropoff location inserted successful");
								newdropoff_location = results_newdropoff.value;
								console.log("new dropoff_location : "+ newdropoff_location);

								msg_payload = {
									"newdropoff_location" : newdropoff_location,
									"customer_id" : customer_id
								};

								mq_client.make_request('uber_editRide_queue',msg_payload,function(err, results) 
										{
													console.log(results);
													if (err) 
													{
														throw err;
													} 
													else 
													{
														console.log("i'm here");
														if (results.code == 200) {
															console.log("back to node: ride updated successful");
															res.send(results);
														} 
														else 
														{
															console.log("back to node: update failed");
															res.send("failed");
														}
													}
												});
							} else {
								console.log("back to node: insert location failed");
								//				res.send("failed");
							}
						}
					});
};


exports.deleteRide = function(req,res)
{
	console.log("inside delete ride");
	var customer_id = 12345;
	
	var msg_payload =  {
			"customer_id" : customer_id
		};
	mq_client.make_request('uber_deleteRide_queue',msg_payload,function(err, results) 
			{
				console.log(results);
				if (err)
				{
					throw err;
				} 
				else 
				{
					console.log("i'm here");
					if (results.code == 200) {
						console.log("back to node: ride deleted successful");
						res.send(results);
					} else {
						console.log("back to node: delete failed");
						res.send("failed");
					}
				}
			});

	
};