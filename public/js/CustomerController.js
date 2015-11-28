UberPrototypeCustomer.directive('googlesource', function() {
	//directive for Google Auto complete option for source
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.src = new google.maps.places.Autocomplete(element[0], options);
            google.maps.event.addListener(scope.src, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});

UberPrototypeCustomer.directive('googledestination', function() {
	//directive for Google Auto complete option for destination
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.dest = new google.maps.places.Autocomplete(element[0], options);
            google.maps.event.addListener(scope.dest, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});

UberPrototypeCustomer.controller('CustomerController',function($scope,$http,$location,$window){
	 
	$http.get('http://localhost:3000/CustomerEditProfile').success(function(data) {
		//checking the response data for statusCode
		if (data.statusCode == 401) {
		}
		else
			{
			$scope.profile = data;
			}
	}).error(function(error) {
		$scope.invalid_login = true;
	});
	
	$scope.editProfile = function(firstName,lastName,city,zip,email,password,phoneNumber) {
		$http({
			method : "POST",
			url : '/updateProfile',
			data: {	
				"firstName" : firstName,
				"lastName" : lastName,
				"city" : city,
				"zip" : zip,
				"email" : email,
				"phoneNumber" : phoneNumber,
				"password" : password,
				  }
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
			}
			else{
				console.log("after everything checking if i made it here");
				//Making a get call to the '/about' API
				window.location.assign('/customerLoginPage');
			}
		}).error(function(error) {
			$scope.invalid_login = true;
		});
	};
	
	$scope.routeToTemplate = function(routepath){
		 $location.path(routepath); 
	 };
	 
	 $scope.logout = function()
	 {
		 $http.get('http://localhost:3000/Log_Out').success(function(data) {
				//checking the response data for statusCode
				window.location.assign("/"); 
			}).error(function(error) {
				$scope.invalid_login = true;
			});
	 }
	 
	 $scope.initBookaRide = function(){
		 $scope.src;
		 $scope.dest;
		 $scope.HideFareEstimate = true;
		 $scope.hideinvaliddestination = true;
		 $scope.hideinvalidsource = true;
	 };
	 
	 $scope.FareEstimate = function(){	
		 
		    var directionsService = new google.maps.DirectionsService();
		    var source = $scope.source;
		    var destination = $scope.destination;
		 
		    var request = {
		        origin: $scope.source,
		        destination: $scope.destination,
		        travelMode: google.maps.TravelMode.DRIVING
		    };
		    //Calculate distance and time needed to travel form source to destination
		    var service = new google.maps.DistanceMatrixService();
		    service.getDistanceMatrix({
		        origins: [source],
		        destinations: [destination],
		        travelMode: google.maps.TravelMode.DRIVING,
		        unitSystem: google.maps.UnitSystem.METRIC,
		        avoidHighways: false,
		        avoidTolls: false
		    }, function (response, status) {
		        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
		            $scope.distance = response.rows[0].elements[0].distance.text;
		            $scope.time = response.rows[0].elements[0].duration.text;
		            
		            $scope.distance = $scope.distance.split(" ",1);
		            $scope.distance = $scope.distance * 0.62;
		            //$scope.time = $scope.time.split(" ",1);
		        } else {
		            console.log("Unable to find the distance via road.");
		        }
		    });
		    
		    var pickupLat, pickupLng, dropoffLat, dropoffLng;
		    
		    var pickup_location = $scope.source;
			var dropoff_location = $scope.destination;
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address' : pickup_location},
							function(results, status)
							{
								if (status == google.maps.GeocoderStatus.OK) 
								{
									pickupLat = results[0].geometry.location.lat();
									pickupLng = results[0].geometry.location.lng();
								}

								geocoder.geocode({'address' : dropoff_location},
												function(results,status) 
												{
													if (status == google.maps.GeocoderStatus.OK) 
													{
														dropoffLat = results[0].geometry.location.lat();
														dropoffLng = results[0].geometry.location.lng();
														var latlng = {lat : parseFloat(pickupLat),lng : parseFloat(pickupLng)};
														geocoder.geocode({'location' : latlng},function(pickupaddress,status)
																{if (status === google.maps.GeocoderStatus.OK) 
																{
																				var latlng = {lat : parseFloat(dropoffLat),lng : parseFloat(dropoffLng)};
																				geocoder.geocode({'location' : latlng},function(dropoffaddress,status) 
																						{
																							if (status === google.maps.GeocoderStatus.OK) 
																							{ 
																									$window.localStorage.pickup_address = pickupaddress;
																									$window.localStorage.dropoff_address = dropoffaddress;
																									$window.localStorage.pickupLat = pickupLat;
																									$window.localStorage.pickupLng = pickupLng;
																									$window.localStorage.dropoffLat = dropoffLat;
																									$window.localStorage.dropoffLng = dropoffLng;
																									
																									$scope.HideFareEstimate = false;
																									$scope.distanceinmiles = $scope.distance+" miles";
																									$scope.fareestimate = $scope.distance * 18;
																									
																									console.log(pickupLat);
																									console.log(pickupLng);
																									console.log(dropoffLat);
																									console.log(dropoffLng);

																							} else {
																								$scope.invaliddestination = "Invalid Destination Address";
																								$scope.hideinvaliddestination = false;
																							}
																						 });

																} else{
																	$scope.invalidsource = "Invalid Source Address";
																	$scope.hideinvalidsource = false;
																}
															});
													}

													else {
														alert("Geocode was not successful for the following reason: "
																+ status);
													}
												});
							});
	  };
	  
	  $scope.RequestUberX = function(){
		  $location.path('/RequestUber');
	  };
	  
	  
	  
	  $scope.showAllCooridnates = function() {
		  
		  var pos = { };

		     map = new google.maps.Map(document.getElementById('map'), {
		     center: {lat: -33.8688, lng: 151.2195},
		     zoom: 14,
		     mapTypeId: google.maps.MapTypeId.ROADMAP
		   });

		  var southWest = new google.maps.LatLng(37.3860517, -122.0838511);
		  var northEast = new google.maps.LatLng(37.1911821, -121.70814540000003);
		  var lngSpan = northEast.lng() - southWest.lng();
		  var latSpan = northEast.lat() - southWest.lat();
		  for (var i = 0; i < 1000; i++) {
			    var x = southWest.lat() + latSpan * Math.random();
			    var y = southWest.lng() + lngSpan * Math.random();
			    console.log(x + "," + y); 
		  }
	  }
	

	  
	  $scope.LoadDrivers = function(){
		  
		 // $scope.showAllCooridnates();
		  var pickupLat = Number($window.localStorage.pickupLat);
		  var pickupLng = Number($window.localStorage.pickupLng);
		  var centerpoint = new google.maps.LatLng(pickupLat,pickupLng);
		  
		  console.log("pickupLat "+pickupLat);
		  geocoder = new google.maps.Geocoder();
		  directionsService = new google.maps.DirectionsService();
		  var pos = { };
		  
		     var map = new google.maps.Map(document.getElementById('map'), {
		     center: {lat:pickupLat,lng:pickupLng},
		     zoom: 14,
		     mapTypeId: google.maps.MapTypeId.ROADMAP
		   });
		     
		   var marker = new google.maps.Marker({
		      position: {lat: pickupLat, lng: pickupLng},
		      map: map
		   });
		     
		     //hardcoding driver current location  37.3427555  -121.87057349999998
		     var res = [
		                {
		                	"lat":37.3427553,
		                	"lng":-121.87057349999999,
		                	"desc":0001,
		                	"title":"driver1"
		                },
		                
		                {
		                	"lat":37.3427553,
		                	"lng":-121.87057349999998,
		                	"desc":0002,
		                	"title":"driver2"
		                },
		                
		                {
		                	"lat":37.3333552,
		                	"lng":-121.88453520000002,
		                	"desc":0003,
		                	"title":"driver3"
		                },
		                
		                {
		                	"lat":37.3290044,
		                	"lng":-121.90548669999998,
		                	"desc":0004,
		                	"title":"driver4"
		                }
		                
		                ]
		   
		    var infoWindow = new google.maps.InfoWindow({
		    	content: '<a href="https://www.youtube.com/watch?v=mp74xotRMVs">Introduction</a>'
		    });
		     for (var i = 0, length = res.length; i < length; i++) {
					var data = res[i],
						latLng = new google.maps.LatLng(data.lat,data.lng);
						console.log("latlng "+latLng);
					// Creating a marker and putting it on the map
					    marker = new google.maps.Marker({
						position: latLng,
						map: map,
						title: data.title,
						icon:'../images/car.png'
					});
					(function(marker, data) {
						var sample = '<a href="https://www.youtube.com/watch?v=mp74xotRMVs">Introduction</a>';
						// Attaching a click event to the current marker
						google.maps.event.addListener(marker, "click", function(e) {
							//infoWindow.setContent(data.toString());
						    infoWindow.setContent(sample);
							infoWindow.open(map, marker);
						});


					})(marker, data);

				}
		     
	  };
	  
	  $scope.initMyTrips = function(){
		  
		 $scope.TripDetails = true;
		 $scope.mytrips = [ {
			 	 RideId : "0001",
				 Pickup : "11/20/2015",
				 Driver : "James",
				 Fare : "$27",
				 Car : "UberX",
				 City : "San Jose",
				 Payment : "1123",
				 Source : "190 Ryland Street",
				 Destination : "Dr.MLK Library",
				 Pickuptime : "2:30PM",
				 Dropofftime : "2:45PM" 
		 },
		 {
			 RideId : "0002",
			 Pickup : "11/25/2015",
			 Driver : "Joey",
			 Fare : "$32",
			 Car : "UberX",
			 City : "San Jose",
			 Payment : "1123",
			 Source : "Bassett Street",
			 Destination : "Dr.MLK Library",
			 Pickuptime : "5:30PM",
			 Dropofftime : "5:45PM" 
		 }
		 ];
		 
		 $scope.toggleMyTrips = function(){
			 $scope.TripDetails = $scope.TripDetails === false ? true: false;
		 };
		 
		 
		 
	  };
});

