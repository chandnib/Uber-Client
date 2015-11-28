UberPrototypeAdmin.controller('AdminReviewController',function($scope,$http,$location,$window){
	
		$scope.customers ={};
		$scope.drivers = {};
	
		//Customer Admin Operations
		$scope.loadUnverifiedCustomers = function(){
		$scope.customers.errorMessage = "";
		$scope.customers.error = false;
		console.log("loadUnverifiedCustomers==>");
		$http({
			  method: 'POST',
			  url: '/loadUnverifiedCustomers',
			  headers: {
				   'Content-Type': 'application/json'
			  },
			  data: {}
				}).then(function successCallback(response) {
					$scope.customers = response.data;
					console.log("loadUnverifiedCustomers ==> Response from Server ++ " + JSON.stringify($scope.customers));	
				}, function errorCallback(response) {
					$scope.customers.errorMessage = "There was an error retrieving the Customer Accounts";
					$scope.customers.error = true;
					console.log("customers Error In request" + JSON.stringify(response));		
			});
		};
	
		$scope.approveCustomer = function(customer){
		console.log("approveCustomer ==> ");
		$http({
			  method: 'POST',
			  url: '/approveCustomer',
			  headers: {
				   'Content-Type': 'application/json'
			  },
			  data: JSON.stringify(customer)
				}).then(function successCallback(response) {
					//$scope.customers = response.data;
					console.log("approveCustomer ==> Response from Server ++ " + JSON.stringify(response.data));
					$scope.loadUnverifiedCustomers();
				}, function errorCallback(response) {
					console.log("approveCustomer Error In request" + JSON.stringify(response));		
			});
		};
		
		$scope.rejectCustomer = function(customer){
		console.log("rejectCustomer ==> ");
		$http({
			  method: 'POST',
			  url: '/rejectCustomer',
			  headers: {
				   'Content-Type': 'application/json'
			  },
			  data: JSON.stringify(customer)
				}).then(function successCallback(response) {
					//$scope.customers = response.data;
					console.log("approveCustomer ==> Response from Server ++ " + JSON.stringify(response.data));
					$scope.loadUnverifiedCustomers();
				}, function errorCallback(response) {
					console.log("approveCustomer Error In request" + JSON.stringify(response));		
			});
		};
			
		$scope.approveAllCustomer = function(){
		console.log("approveAllCustomer ==> ");
		$http({
			  method: 'POST',
			  url: '/approveAllCustomer',
			  headers: {
				   'Content-Type': 'application/json'
			  },
			  data: {}
				}).then(function successCallback(response) {
					console.log("approveAllCustomer ==> Response from Server ++ " + JSON.stringify(response.data));
					$scope.loadUnverifiedCustomers();
				}, function errorCallback(response) {
					console.log("approveAllCustomer Error In request" + JSON.stringify(response));		
			});
		};
		
		$scope.rejectAllCustomer = function(){
			console.log("rejectAllCustomer() ==> ");
			$http({
				  method: 'POST',
				  url: '/rejectAllCustomer',
				  headers: {
					   'Content-Type': 'application/json'
				  },
				  data: {}
					}).then(function successCallback(response) {
						console.log("rejectAllCustomer ==> Response from Server ++ " + JSON.stringify(response.data));
						$scope.loadUnverifiedCustomers();
					}, function errorCallback(response) {
						console.log("rejectAllCustomer Error In request" + JSON.stringify(response));		
				});
			};
			
			//Driver Admin Operations
			$scope.loadUnverifiedDrivers = function(){
			$scope.drivers.errorMessage = "";
			$scope.drivers.error = false;
			console.log("loadUnverifiedDrivers==>");
			$http({
				  method: 'POST',
				  url: '/loadUnverifiedDrivers',
				  headers: {
					   'Content-Type': 'application/json'
				  },
				  data: {}
					}).then(function successCallback(response) {
						$scope.drivers = response.data;
						console.log("loadUnverifiedDrivers ==> Response from Server ++ " + JSON.stringify($scope.drivers));	
					}, function errorCallback(response) {
						$scope.drivers.errorMessage = "There was an error retrieving the Driver Accounts";
						$scope.drivers.error = true;
						console.log("drivers Error In request" + JSON.stringify(response));		
				});
			};
		
			$scope.approveDriver = function(customer){
			console.log("approveDriver ==> ");
			$http({
				  method: 'POST',
				  url: '/approveDriver',
				  headers: {
					   'Content-Type': 'application/json'
				  },
				  data: JSON.stringify(customer)
					}).then(function successCallback(response) {
						//$scope.drivers = response.data;
						console.log("approveDriver ==> Response from Server ++ " + JSON.stringify(response.data));
						$scope.loadUnverifiedDrivers();
					}, function errorCallback(response) {
						console.log("approveDriver Error In request" + JSON.stringify(response));		
				});
			};
			
			$scope.rejectDriver = function(customer){
			console.log("rejectDriver ==> ");
			$http({
				  method: 'POST',
				  url: '/rejectDriver',
				  headers: {
					   'Content-Type': 'application/json'
				  },
				  data: JSON.stringify(customer)
					}).then(function successCallback(response) {
						//$scope.drivers = response.data;
						console.log("approveDriver ==> Response from Server ++ " + JSON.stringify(response.data));
						$scope.loadUnverifiedDrivers();
					}, function errorCallback(response) {
						console.log("approveDriver Error In request" + JSON.stringify(response));		
				});
			};
				
			$scope.approveAllDriver = function(){
			console.log("approveAllDriver ==> ");
			$http({
				  method: 'POST',
				  url: '/approveAllDriver',
				  headers: {
					   'Content-Type': 'application/json'
				  },
				  data: {}
					}).then(function successCallback(response) {
						console.log("approveAllDriver ==> Response from Server ++ " + JSON.stringify(response.data));
						$scope.loadUnverifiedDrivers();
					}, function errorCallback(response) {
						console.log("approveAllDriver Error In request" + JSON.stringify(response));		
				});
			};
			
			$scope.rejectAllDriver = function(){
				console.log("rejectAllDriver() ==> ");
				$http({
					  method: 'POST',
					  url: '/rejectAllDriver',
					  headers: {
						   'Content-Type': 'application/json'
					  },
					  data: {}
						}).then(function successCallback(response) {
							console.log("rejectAllDriver ==> Response from Server ++ " + JSON.stringify(response.data));
							$scope.loadUnverifiedDrivers();
						}, function errorCallback(response) {
							console.log("rejectAllDriver Error In request" + JSON.stringify(response));		
					});
				};


	 
		$scope.routeToTemplate = function(routepath){
			$location.path(routepath); 
		};
});