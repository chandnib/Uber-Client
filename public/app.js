var UberPrototypeCustomer = angular.module('UberPrototypeCustomer', ['ngRoute','ui.bootstrap']);
UberPrototypeCustomer.config(['$locationProvider', '$routeProvider', function($locationProvider,$routeProvider) {
	  $locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
  $routeProvider
  .when('/customerHome', {
    templateUrl: '/templates/BookaRide.html',
    controller: 'CustomerController'
  }) 
  .when('/EditProfile', {
	    templateUrl: '/templates/EditProfile.html'
	    //controller: 'CustomerController'
  })
  .when('/CustomerRideStarted', {
	    templateUrl: '/templates/CustomerRideStarted.html',
	    controller: 'CustRideStartedController'
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
