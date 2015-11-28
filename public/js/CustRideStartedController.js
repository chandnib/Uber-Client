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



UberPrototypeCustomer.controller('CustRideStartedController' ,function($scope,$http,$location){
	 
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
		 $scope.source = "190 Ryland Street, San Jose, CA 95110";
		 $scope.destination = "1 Washington Sq, San Jose, CA 95192";
		// var directionsService = new google.maps.DirectionsService();
		 
		 getTimeDest();
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
		 $scope.destination = document.getElementById("destLocation").value;
		 console.log("check "+ document.getElementById("destLocation").value);
		// $scope.destination = "1 Polk Street, San Francisco, CA, United States";
		 console.log("$scope.destination" + $scope.destination);
		 var dropoff_location = $scope.destLocation;
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address' : dropoff_location},
					function(results, status)
					{
						if (status == google.maps.GeocoderStatus.OK) 
						{
							$scope.dropoffLat = results[0].geometry.location.lat();
							dropoffLng = results[0].geometry.location.lng();
							var latlng = {lat : parseFloat(dropoffLat),lng : parseFloat(dropoffLng)};
							
							geocoder.geocode({'location' : latlng},function(dropoffaddress,status)
									{if (status === google.maps.GeocoderStatus.OK) 
									{
										/*$window.localStorage.dropoff_address = dropoffaddress;
										$window.localStorage.dropoffLat = dropoffLat;
										$window.localStorage.dropoffLng = dropoffLng;*/
										$scope.destPosition = {lat : dropoffLat,
												lng : dropoffLng};
										
										$scope.newdropoff_address = dropoffaddress;
										$scope.newdropoff_lat = dropoffLat;
										$scope.newdropoff_lng = dropoffLng;
										console.log(dropoffaddress + dropoffLat);
										console.log(dropoffLng);

									} else{
										console.log( "Invalid Destination Address");
									}
								});
						}
					});
		 getTimeDest();
	 };
	 
	 $scope.cancelEditRide = function(){
		 $scope.editRide = false;
		 $scope.getPageData();
	 };
	
	 $scope.editTheRide = function(){
		 $scope.editRide = true;
	 };
	 
	 $scope.newRouteSubmit = function() {
			$http({
				method : "POST",
				url : '/editRide',
				data : {
					"newdropoffLat" : $scope.newdropoff_lat,
					"newdropoffLng" : $scope.newdropoff_lng,
					"newdropoff_location": $scope.dropoffaddress
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode == 200) {
					$location.path('/CustomerBillSummary'); 
				}
				else{
					//Making a get call to the '/CustomerBillSummary' page
					console.log("Error in updating the destination location");
				}
			}).error(function(error) {
				console.log("Error in updating the destination location");
			});
		};
});