UberPrototypeCustomer.directive('googledestination', function() {
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


UberPrototypeCustomer.controller('CustRideCreatedController' ,function($scope,$http,$location,$window){
	 
	console.log("inside my controller");
	$scope.src;
	 $scope.dest;
	 
	 
	 var getTimeDest = function(){
		 console.log("inside time n dist calculation " + $scope.source + $scope.destination);
		    var request = {
		        origin: $scope.source,
		        destination: $scope.destination,
		        travelMode: google.maps.TravelMode.DRIVING
		    };
		    //Calculate distance and time needed to travel form source to destination
		    var service = new google.maps.DistanceMatrixService();
		    service.getDistanceMatrix({
		        origins: [$scope.source],
		        destinations: [$scope.destination],
		        travelMode: google.maps.TravelMode.DRIVING,
		        unitSystem: google.maps.UnitSystem.METRIC,
		        avoidHighways: false,
		        avoidTolls: false
		    }, function (response, status) {
		        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
		            $scope.distance = response.rows[0].elements[0].distance.text;
		            $scope.duration = response.rows[0].elements[0].duration.text;
		            
		            $scope.distance = $scope.distance.split(" ",1);
		            $scope.distance = $scope.distance * 0.62 + " miles";
		            console.log("distance : " + $scope.distance);
		            console.log("duration : " + $scope.duration);
		            //$scope.time = $scope.time.split(" ",1);
		        } else {
		            console.log("Unable to find the distance via road.");
		        }
		    });
	 };
	 
	 
	 
	 /*$scope.sourcePosition = {lat : 37.340848,
			lng : -121.898409};
	 $scope.destPosition = {lat : 37.335142,
				lng : -121.881276};
	 $scope.positions = [ {
			lat : 37.335719,
			lng : -121.886708
		} ];*/
	 
	 $scope.getPageData = function(){
		 console.log("inside init func");
		 $scope.editRide = false;
		 $scope.canceled = false;
		 
		 if($window.localStorage.category == "C"){
			 var RideStatus = setInterval(function(){ getRideStatus() }, 5000);
			 $scope.source = "190 Ryland Street, San Jose, CA 95110";
			 $scope.destination = "1 Washington Sq, San Jose, CA 95192";
			// var directionsService = new google.maps.DirectionsService();
			 
			 getTimeDest();
		 }
		 
		 if($window.localStorage.category == "D"){
			 var RideStatus = setInterval(function(){ getRideStatus() }, 5000);
			 
			 $http({
					method : "POST",
					url : '/getRideCreated',
					params : {
						"driver_id" : $scope.driverId
					}
				}).success(function(data) {
					//checking the response data for statusCode
					if (data.code == 200) {
						$scope.source = "190 Ryland Street, San Jose, CA 95110";
						 $scope.destination = "1 Washington Sq, San Jose, CA 95192";
						console.log(JSON.stringify(data.value));
						// var directionsService = new google.maps.DirectionsService();
						 
						 getTimeDest();
					}
					else{
						//Making a get call to the '/CustomerBillSummary' page
						console.log("Error in starting the ride");
					}
				}).error(function(error) {
					console.log("Error in starting the ride");
				});
		 }
		 

		 /* var directionsService = new google.maps.DirectionsService();
		    var request = {
		        origin: source,
		        destination: destination,
		        travelMode: google.maps.TravelMode.DRIVING
		    };
		    directionsService.route(request, function (response, status) {
		        if (status == google.maps.DirectionsStatus.OK) {
		            directionsDisplay.setDirections(response);
		        }
		    });*/
		    
	 };
	 
	 $scope.getNewRoute = function(){
		 var newdropoff_lat,newdropoff_lng;
		 $scope.destination = document.getElementById("destLocation").value;
		 console.log("check "+ document.getElementById("destLocation").value);
		// $scope.destination = "1 Polk Street, San Francisco, CA, United States";
		 console.log("$scope.destination" + $scope.destination);
		 var dropoff_location = $scope.destination;
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address' : dropoff_location},
					function(results, status)
					{
						if (status == google.maps.GeocoderStatus.OK) 
						{
							$scope.dropoffLat = results[0].geometry.location.lat();
							$scope.dropoffLng = results[0].geometry.location.lng();
							var latlng = {lat : parseFloat($scope.dropoffLat),lng : parseFloat($scope.dropoffLng)};
							
							geocoder.geocode({'location' : latlng},function(dropoffaddress,status)
									{if (status === google.maps.GeocoderStatus.OK) 
									{
										/*$window.localStorage.dropoff_address = dropoffaddress;
										$window.localStorage.dropoffLat = dropoffLat;
										$window.localStorage.dropoffLng = dropoffLng;*/
										$scope.destPosition = {lat : $scope.dropoffLat,
												lng : $scope.dropoffLng};
										
										$scope.newdropoff_address = dropoffaddress;
										newdropoff_lat = $scope.dropoffLat;
										newdropoff_lng = $scope.dropoffLng;
										console.log(dropoffaddress + $scope.dropoffLat);
										console.log($scope.dropoffLng);
										$http({
											method : "POST",
											url : '/editRide',
											data : {
												"newdropoffLat" : $scope.dropoffLat,
												"newdropoffLng" : $scope.dropoffLng,
												"newdropoff_location": $scope.destination
											}
										}).success(function(data) {
											//checking the response data for statusCode
											if (data.code == 200) {
												getTimeDest();
												//$scope.isDisabled = false;
											}
											else{
												//Making a get call to the '/CustomerBillSummary' page
												console.log("Error in updating the destination location");
											}
										}).error(function(error) {
											console.log("Error in updating the destination location");
										});

									} else{
										console.log( "Invalid Destination Address");
									}
								});
						}
					});
	 };
	 
	 $scope.cancelEditRide = function(){
		 $scope.editRide = false;
		 $scope.getPageData();
	 };
	
	 $scope.editTheRide = function(){
		 //$scope.isDisabled = true;
		 $scope.editRide = true;
	 };
	 
	 $scope.cancelTheRide = function(){
		 $http({
				method : "POST",
				url : '/cancelRide',
				data : {
					"ride_id" : $scope.rideId
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.code == 200) {
					$scope.canceled = true;
				}
				else{
					//Making a get call to the '/CustomerBillSummary' page
					console.log("Error in cancelling the ride");
				}
			}).error(function(error) {
				console.log("Error in cancelling the ride");
			});
	 };
	 $scope.startTheRide = function(){
		 $http({
				method : "POST",
				url : '/startRide',
				data : {
					"ride_id" : $scope.rideId
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.code == 200) {
					$location.path('/DriverRideStarted'); 
				}
				else{
					//Making a get call to the '/CustomerBillSummary' page
					console.log("Error in starting the ride");
				}
			}).error(function(error) {
				console.log("Error in starting the ride");
			});
	 };
	 
	 var getRideStatus = function(){
		 $http({
				method : "GET",
				url : '/fetchRideStatus',
				params : {
					"ride_id" : $scope.rideId
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.code == 200) {
					if (data.status == "S"){
						$location.path('/CustomerRideStarted'); 
					}else if(data.status == "CA"){
						$scope.canceled = true;
					}
				}
				else{
					//Making a get call to the '/CustomerBillSummary' page
					console.log("The ride not started or canceled yet");
				}
			}).error(function(error) {
				console.log("The ride not started or canceled yet");
			});
	 };
});