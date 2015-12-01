UberPrototypeCustomer.controller('CustBillSumController' ,function($scope,$http,$location){
// for git testing	
	$scope.getPageData = function(){
		
		
		 console.log("inside init func of CustBillSumController");
		 $scope.source = $window.localStorage.pickup_address;
		 $scope.destination = $window.localStorage.dropoff_address;
		 $scope.pickupLocation = $scope.source;
			$scope.dropoffLocation = $scope.destination;
			$scope.tripDate = Date().substring(0, 15);
		 
		 $http({
				method : "GET",
				url : '/getBillSummary',
				params : {
					//"rideId" : $scope.rideId,
					"rideId" : $window.localStorage.rideId,
					"distance" : 10,
					"time" : 10
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.code == 200) {
					console.log("data"+JSON.stringify(data));
					$scope.amount = data.bill_amount;
					$scope.baseFare = data.base_fare;
					$scope.timeFare = data.time_fare;
					$scope.distfare = data.distance_fare;
					//$location.path('/CustomerBillSummary'); 
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