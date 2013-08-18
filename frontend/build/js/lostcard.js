(function() {
  var momentum;

  momentum = angular.module("Momentum.lostcardcontrollers", []);

  momentum.controller("LostCardController", [
    '$scope', '$location', '$http', function($scope, $location, $http) {
      $scope.data = {
        studentid: "",
        status: "Lost"
      };
      $scope.submitGetCardStatus = function() {
        return $http.get("/api/lostcard/" + $scope.data.studentid).success(function(response) {
          return alert("The status of your card (with Student ID " + $scope.data.studentid + ") is: " + response);
        }).error(function(e) {
          return alert("Something went wrong. That Consumer may not exist.\n" + e);
        });
      };
      return $scope.submitPutLostCard = function() {
        return $http.put("/api/lostcard/" + $scope.data.studentid, {
          status: $scope.data.status
        }).success(function(response) {
          alert("Successfully tagged your account with Student ID " + $scope.data.studentid + " as " + response + "! \nPlease proceed to the Registrar's Office to acquire a new ID.");
          $location.path("/home").replace();
          return $scope.$apply();
        }).error(function(response) {
          return alert("Something went wrong." + response);
        });
      };
    }
  ]);

}).call(this);
