(function() {
  var momentum;

  momentum = angular.module("Momentum", ["Momentum.controllers", "Momentum.directives", "Momentum.txncontrollers", "Momentum.lostcardcontrollers", "Momentum.balcontrollers", "Momentum.itemcontrollers"]);

  momentum.config([
    "$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
      $routeProvider.when("/home", {
        templateUrl: "/html/home.html",
        controller: 'BalController'
      });
      $routeProvider.when("/", {
        redirectTo: "/home"
      });
      $routeProvider.when("", {
        redirectTo: "/home"
      });
      $routeProvider.when("/acctprofile", {
        templateUrl: "/html/acctprofile.html",
        controller: 'TxnController'
      });
      $routeProvider.when("/transhist", {
        templateUrl: "/html/transhist.html",
        controller: 'TxnController'
      });
      $routeProvider.when("/reload", {
        templateUrl: "/html/reload.html",
        controller: 'TxnController'
      });
      $routeProvider.when("/lostcard", {
        templateUrl: "/html/lostcard.html",
        controller: 'LostCardController'
      });
      $routeProvider.when("/payment", {
        templateUrl: "/html/payment.html",
        controller: 'TxnController'
      });
      $routeProvider.when("/items", {
        templateUrl: "/html/items.html",
        controller: 'ItemController'
      });
      $routeProvider.when("/404", {
        templateUrl: "/html/404.html"
      });
      $routeProvider.otherwise({
        redirectTo: "/404"
      });
      $routeProvider.when("/message", {
        templateUrl: "/html/message.html",
        controller: 'MessageController'
      });
      return $locationProvider.html5Mode(false);
    }
  ]);

}).call(this);
