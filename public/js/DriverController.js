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

UberPrototypeCustomer.controller('DriverController',function($scope,$http,$location,$window){
	$scope.curuser = {};
	$window.localStorage.category = "D";
	
	$scope.initData = function(){
		$window.localStorage.category = "D";
		$window.localStorage.driverId =  $scope.curuser.ROW_ID;
	};
	
	$http.get('http://localhost:3000/DriverEditProfile').success(function(data) {
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
	
	$scope.editProfile = function(firstName,lastName,address,city,state,zip,carModel,carColor,carYear,email,language,phoneNumber,password) {
		$http({
			method : "POST",
			url : '/updateDriverProfile',
			data: {	
				"firstName" : firstName,
				"lastName" : lastName,
				"address" : address,
				"city" : city,
				"state": state,
				"zip" : zip,
				"carModel": carModel,
				"carColor": carColor,
				"carYear": carYear,
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
				window.location.assign('/driverLoginPage');
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
		  
	  };
});
