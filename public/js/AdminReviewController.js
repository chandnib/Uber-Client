UberPrototypeAdmin.controller('AdminReviewController',function($scope,$http,$location,$window,$routeParams){
	$scope.detailview = {};
	$scope.customers ={};
	$scope.drivers = {};
	$scope.profile = {};
	$scope.driverInfo = {};
	$scope.curuser = {};



	//Admin Detail Review Controller
	$scope.loadDriverDetail = function(){
		$scope.driverInfo = {};
		$scope.detailview.driverid = $routeParams.driverid;
		console.log("Driver id after navigating to the Page!!! " + $routeParams.driverid);
		$http({
			method: 'POST',
			url: '/loadDriverDetail',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({'ROW_ID' : $routeParams.driverid})
		}).then(function successCallback(response) {
			$scope.driverInfo = response.data[0];
			console.log("loadCustomerDetail ==> Response from Server ++ " + JSON.stringify($scope.driverInfo));	
		}, function errorCallback(response) {
			$scope.driverInfo.errorMessage = "There was an error retrieving the Customer Accounts Details";
			$scope.driverInfo.error = true;
			console.log("customers Error In request" + JSON.stringify(response));		
		});
	};

	
	
	$scope.loadCustomerDetail = function(){
		$scope.profile = {};
		$scope.detailview.customerid = $routeParams.custid;
		console.log("Customer id after navigating to the Page!!! " + $routeParams.custid);
		$http({
			method: 'POST',
			url: '/loadCustomerDetail',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({'ROW_ID' : $routeParams.custid})
		}).then(function successCallback(response) {
			$scope.profile = response.data[0];
			//console.log("loadCustomerDetail ==> Response from Server ++ " + JSON.stringify($scope.profile));	
		}, function errorCallback(response) {
			$scope.profile.errorMessage = "There was an error retrieving the Customer Accounts Details";
			$scope.profile.error = true;
			console.log("customers Error In request" + JSON.stringify(response));		
		});
	};
	
	$scope.currentRow = 0;
	$scope.customers = [];

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
			data: JSON.stringify({currentRow:$scope.currentRow})
		}).then(function successCallback(response) {
			for(var i in response.data){
				$scope.customers.push(response.data[i]) ;
			}
			//console.log("loadUnverifiedCustomers ==> Response from Server ++ " + JSON.stringify($scope.customers));	
		}, function errorCallback(response) {
			$scope.customers.errorMessage = "There was an error retrieving the Customer Accounts";
			$scope.customers.error = true;
			//console.log("customers Error In request" + JSON.stringify(response));		
		});
	};
	
	$scope.loadMoreCustomers = function(){
		$scope.currentRow += 100;
		$scope.loadUnverifiedCustomers();
	}


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
			//$scope.loadUnverifiedCustomers();
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
			//$scope.loadUnverifiedCustomers();
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
			//$scope.loadUnverifiedCustomers();
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
			//$scope.loadUnverifiedCustomers();
		}, function errorCallback(response) {
			console.log("rejectAllCustomer Error In request" + JSON.stringify(response));		
		});
	};
	
	$scope.currentDriverRow = 0;
	$scope.drivers = [];

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
			data: JSON.stringify({currentDriverRow:$scope.currentDriverRow})
		}).then(function successCallback(response) {
			for(var i in response.data){
				$scope.drivers.push(response.data[i]) ;
			}
			//$scope.drivers = response.data;
			//console.log("loadUnverifiedDrivers ==> Response from Server ++ " + JSON.stringify($scope.drivers));	
		}, function errorCallback(response) {
			$scope.drivers.errorMessage = "There was an error retrieving the Driver Accounts";
			$scope.drivers.error = true;
			//console.log("drivers Error In request" + JSON.stringify(response));		
		});
	};
	
	$scope.loadMoreDrivers= function(){
		$scope.currentDriverRow += 100;
		$scope.loadUnverifiedDrivers();
	}

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
			//$scope.loadUnverifiedDrivers();
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
			//$scope.loadUnverifiedDrivers();
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
			//$scope.loadUnverifiedDrivers();
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
			//$scope.loadUnverifiedDrivers();
		}, function errorCallback(response) {
			console.log("rejectAllDriver Error In request" + JSON.stringify(response));		
		});
	};

	$scope.logout = function()
	{

		$http({
			method: 'GET',
			url: '/Log_Out'
		}).then(function successCallback(response) {
			console.log("Logout Sucessfull!!");
			window.location.assign("/"); 
		}, function errorCallback(response) {
			console.log("Error in Logging Out !!!" + response)	
		});
	};




	$scope.routeToTemplate = function(routepath){
		$location.path(routepath); 
	};
});