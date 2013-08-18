(function() {
  var momentum;

  momentum = angular.module("Momentum", ["Momentum.controllers", "Momentum.directives"]);

  momentum.config([
    "$routeProvider", function($routeProvider) {
      $routeProvider.when("/home", {
        templateUrl: "/html/messages.html",
        controller: 'MessagesController'
      });
      $routeProvider.when("/message", {
        templateUrl: "/html/message.html",
        controller: 'MessageController'
      });
      $routeProvider.when("/404", {
        templateUrl: "/html/404.html"
      });
      $routeProvider.when("/", {
        redirectTo: "/home"
      });
      $routeProvider.when("", {
        redirectTo: "/home"
      });
      return $routeProvider.otherwise({
        redirectTo: "/404"
      });
    }
  ]);

}).call(this);
