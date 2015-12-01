UberPrototypeAdmin.controller('searchBillController',function($scope,$http,$location,$window,$routeParams){
	$scope.BillList = {};
	$scope.searchInit =function(){
     	$scope.fromdate="";
		$scope.toDate="";
	}
     $scope.searchBill =function(){
    	 console.log("yes i am working");
    	 console.log("toDate"+$scope.toDate);
    	 console.log("fromdate"+$scope.fromdate);
    	 console.log("custEmailId"+$scope.custEmailId);
    	 console.log("driverEmailId"+$scope.driverEmailId);
    	 var fromDate1 = new Date($scope.fromdate);
    	 var toDate1 = new Date($scope.toDate);
    	 if(fromDate1.getTime()-toDate1.getTime())
    	 $http({
				method : "POST",
				url : '/searchBill',
				headers: {
					'Content-Type': 'application/json'
				},
				data : {
					toDate : $scope.toDate,
					fromdate : $scope.fromdate,
					custEmailId : $scope.custEmailId,
					driverEmailId : $scope.driverEmailId
				}
			}).success(function(data) {
				console.log("data"+JSON.stringify(data));
				//checking the response data for statusCode
				if (data.code == '200') {
					console.log("data"+data.data[0].ROW_ID);
					$scope.BillList = data.data;
					$scope.showTable=true;
				}
				else{
					console.log("Error in getting the bills");
				}
			}).error(function(error) {
				console.log("Error in getting the bills");
			});
     };
     });
	