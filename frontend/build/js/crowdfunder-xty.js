(function() {
  var momentum;

  momentum = angular.module("Momentum.controllers", []);

  momentum.controller("MessagesController", [
    '$scope', '$http', function($scope, $http) {
      return $http.get("/api/messages/").success(function(response) {
        return $scope.data.messages = response;
      }).error(function(e) {
        return alert("Something went wrong.");
      });
    }
  ]);

  momentum.controller("MessageController", [
    '$scope', '$http', function($scope, $http) {
      $scope.data = {
        id: "",
        message: ""
      };
      $scope.submitGet = function() {
        return $http.get("/api/messages/" + $scope.data.id).success(function(response) {
          return $scope.data.message = response;
        }).error(function(e) {
          return alert("Something went wrong. That ID may not exist.");
        });
      };
      $scope.submitPost = function() {
        return $http.post("/api/messages", {
          message: $scope.data.message
        }).success(function(response) {
          $scope.data.id = response;
          return alert("Successfully made a message!");
        });
      };
      $scope.submitPut = function() {
        return $http.put("/api/messages/" + $scope.data.id, {
          message: $scope.data.message
        }).success(function(response) {
          return alert("Successfully updated a message!");
        }).error(function(response) {
          return alert("Something went wrong.");
        });
      };
      return $scope.submitDelete = function() {
        return $http["delete"]("/api/messages/" + $scope.data.id).success(function(response) {
          $scope.data.id = "";
          $scope.data.message = "";
          return alert("Successfully deleted a message!");
        }).error(function(response) {
          return alert("Something went wrong. That ID may not exist.");
        });
      };
    }
  ]);

}).call(this);
