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
	 var RideStatus;
	 
	 
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
		            
		            var dist = $scope.distance.split(" ",1);
		            dist = dist * 0.62 + " miles";
		            $scope.distance = dist.toFixed(2)+ " miles";
		            console.log("distance : " + $scope.distance);
		            console.log("duration : " + $scope.duration);
		        } else {
		            console.log("Unable to find the distance via road.");
		        }
		    });
	 };
	
	 
	 $scope.getPageData = function(){
		// $window.localStorage.clear();
		 console.log("chalo "+RideStatus)
		 console.log("inside init func");
		 $scope.editRide = false;
		 $scope.canceled = false;
		 $scope.rideStarted = false;
//		 $window.localStorage.category = "C";
		 
		 if($window.localStorage.category.localeCompare("C") == 0){
			 $scope.rideId = $window.localStorage.rideId
			 RideStatus = setInterval(function(){ getRideStatus() }, 5000);
			// clearInterval(RideStatus);
			 $scope.source = $window.localStorage.pickup_address;
			 $scope.destination = $window.localStorage.dropoff_address;
			// var directionsService = new google.maps.DirectionsService();
			 
			 getTimeDest();
		 }
		 
		 if($window.localStorage.category.localeCompare("D") == 0){			 
			 $http({
					method : "GET",
					url : '/getRideCreated',
					params : {
						//"driver_id" : $scope.driverId
						"driver_id" : $window.localStorage.driverId
					}
				}).success(function(data) {
					//checking the response data for statusCode
					if (data.code == 200) {
						/*$scope.source = "190 Ryland Street, San Jose, CA 95110";
						 $scope.destination = "1 Washington Sq, San Jose, CA 95192";*/
						if(data.value.length>0){
							$scope.rideStarted = true;
							//console.log("pickup " + data.value.pickup_location);
							console.log("array " + data.value[0].PICKUP_LOCATION);
							$scope.rideId = data.value[0].ROW_ID;
							$scope.customerId = data.value[0].FIRST_NAME + " " + data.value[0].LAST_NAME
							$scope.source = data.value[0].PICKUP_LOCATION;
							 $scope.destination = data.value[0].DROPOFF_LOCATION;
							// var directionsService = new google.maps.DirectionsService();
							RideStatus = setInterval(function(){ getRideStatus() }, 5000);
							 //clearInterval(RideStatus);
							 getTimeDest();
						}
						
					}
					else{
						console.log("Error in starting the ride");
					}
				}).error(function(error) {
					console.log("Error in starting the ride");
				});
		 }
		 
 };
	 
	 $scope.getNewRoute = function(){
		 var newdropoff_lat,newdropoff_lng;
		 $scope.destination = document.getElementById("destLocation").value;
		 $window.localStorage.dropoff_address = $scope.destination;
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
												"newdropoff_location": $scope.destination,
												"ride_id" : $scope.rideId
											}
										}).success(function(data) {
											//checking the response data for statusCode
											if (data.code == 200) {
												$scope.rideStarted = true;
												getTimeDest();
												//$scope.isDisabled = false;
											}
											else{
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
					$scope.rideStarted = false;
				}
				else{
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
					console.log("data " +JSON.stringify(data));
					if (data.value[0].STATUS == "S"){
						if($window.localStorage.category.localeCompare("C") == 0){
							clearInterval(RideStatus);
							$location.path('/CustomerRideStarted'); 
						}
						
					}else if(data.value[0].STATUS == "CA"){
						clearInterval(RideStatus);
						$scope.canceled = true;
						$scope.rideStarted = false;
					}
				}
				else{
					console.log("The ride not started or canceled yet");
				}
			}).error(function(error) {
				console.log("The ride not started or canceled yet");
			});
	 };
});