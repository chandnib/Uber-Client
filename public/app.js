var UberPrototypeCustomer = angular.module('UberPrototypeCustomer', ['ngRoute','ui.bootstrap','ngMap']);
UberPrototypeCustomer.config(['$locationProvider', '$routeProvider', function($locationProvider,$routeProvider) {
	  $locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
  $routeProvider
  .when('/customerHome', {
    templateUrl: '/templates/MyTrips.html',
    controller: 'CustomerController'
  }) 
  .when('/BookaRide', {
    templateUrl: '/templates/BookaRide.html',
    controller: 'CustomerController'
  }) 
  .when('/CustomerEditProfile', {
	    templateUrl: '/templates/CustomerEditProfile.html'
	    //controller: 'CustomerController'
  })
  .when('/DriverEditProfile', {
	    templateUrl: '/templates/DriverEditProfile.html'
	    //controller: 'CustomerController'
  })
  .when('/CustomerRideCreated', {
	    templateUrl: '/templates/CustomerRideCreated.html',
	    controller: 'CustRideCreatedController'
  })
  .when('/DriverRideCreated', {
	    templateUrl: '/templates/DriverRideCreated.html',
	    controller: 'CustRideCreatedController'
  })
  .when('/CustomerRideStarted', {
	    templateUrl: '/templates/CustomerRideStarted.html',
	    controller: 'CustRideStartedController'
  })
  .when('/DriverRideStarted', {
	    templateUrl: '/templates/DriverRideStarted.html',
	    controller: 'CustRideStartedController'
  })
  .when('/RequestUber', {
	    templateUrl: '/templates/RequestUber.html',
	    controller: 'CustomerController'
})
 .when('/CustomerBillSummary', {
	    templateUrl: '/templates/CustomerBillSummary.html',
	    controller: 'CustBillSumController'
  })
  .when('/DriverBillSummary', {
	    templateUrl: '/templates/DriverBillSummary.html',
	    controller: 'CustBillSumController'
  })
  /*.when('/BookaRide', {
    templateUrl: '/templates/BookaRide.html',
    controller: 'CustomerController'
  })
   .when('/ConfirmRide', {
    templateUrl: '/templates/ConfirmRideCustomer.html',
    controller: 'CustomerController'
  })
  .when('/CustomerPayment', {
    templateUrl: '/templates/CustomerPayment.html',
    controller: 'CustomerController'
  })
  .when('/CustomerTripSummary', {
    templateUrl: '/templates/CustomerTripSummary.html',
    controller: 'CustomerController'
  })*/
  .otherwise({
    redirectTo: '/'
  });
}]);

