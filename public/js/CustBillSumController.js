UberPrototypeCustomer.controller('CustBillSumController' ,function($scope,$http,$location){
	
	$scope.getPageData = function(){
		
		
		 console.log("inside init func of CustBillSumController");
		 $scope.source = "190 Ryland Street, San Jose, CA 95110";
		 $scope.destination = "1 Washington Sq, San Jose, CA 95192";
		 $scope.pickupLocation = $scope.source;
			$scope.dropoffLocation = $scope.destination;
			$scope.tripDate = Date();
		 
		 $http({
				method : "GET",
				url : '/getBillSummary',
				params : {
					//"rideId" : $scope.rideId,
					"rideId" : 1,
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