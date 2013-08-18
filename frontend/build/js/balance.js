(function() {
  var momentum;

  momentum = angular.module("Momentum.balcontrollers", []);

  momentum.controller("BalController", [
    '$scope', '$location', '$http', function($scope, $location, $http) {
      $scope.data = {
        txnid: "",
        studentid: "",
        vendorid: "",
        txntype: "",
        txnitem: "",
        txnquantity: "",
        txnunitprice: "",
        txntotalamount: "",
        balance: ""
      };
      return $scope.submitGetBal = function() {
        $scope.data.studentid = "201354321";
        return $http.get("/api/balance/" + $scope.data.studentid).success(function(response) {
          return $scope.data.balance = response;
        }).error(function(e) {
          return alert("Something went wrong. That Student ID may not exist.\n" + e);
        });
      };
    }
  ]);

}).call(this);
