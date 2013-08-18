(function() {
  var momentum;

  momentum = angular.module("Momentum.itemcontrollers", []);

  momentum.controller("ItemsController", [
    '$scope', '$http', function($scope, $http) {
      return $http.get("/api/transaction").success(function(response) {
        return $scope.data.messages = response;
      }).error(function(e) {
        return alert("Something went wrong.");
      });
    }
  ]);

  momentum.controller("ItemController", [
    '$scope', '$location', '$http', function($scope, $location, $http) {
      $scope.data = {
        itemid: "",
        itemname: "",
        itemdesc: "",
        itemunitprice: "",
        itemunitmeasure: ""
      };
      $scope.items = [
        {
          itemname: "",
          itemdesc: "",
          itemunitprice: "",
          itemunitmeasure: ""
        }
      ];
      $scope.addItem = function() {
        $scope.items.push({
          txnitem: $scope.data.txnitem,
          txnquantity: $scope.data.txnquantity,
          txnunitprice: $scope.data.txnunitprice,
          txntotalamount: $scope.data.txntotalamount
        });
        $scope.data.txnitem = "";
        $scope.data.txnquantity = "";
        $scope.data.txnunitprice = "";
        return $scope.data.txntotalamount = "";
      };
      $scope.submitGetTxn = function() {
        return $http.get("/api/item/" + $scope.data.txnid).success(function(response) {
          return $scope.data.studentid = response;
        }).error(function(e) {
          return alert("Something went wrong. That Transaction ID may not exist.\n" + e);
        });
      };
      $scope.submitPostTxn = function() {
        var submitTxn;

        submitTxn = confirm("Do you want to submit the transaction?");
        if (submitTxn) {
          $http.post("/api/item", {
            studentid: $scope.data.studentid,
            vendorid: $scope.data.vendorid,
            txntype: $scope.data.txntype,
            txnitem: $scope.data.txnitem,
            txnquantity: $scope.data.txnquantity,
            txnunitprice: $scope.data.txnunitprice,
            txntotalamount: $scope.data.txntotalamount
          }).success(function(response) {
            if (response.length > 20) {
              return alert("Cannot complete transaction. \n" + response);
            } else {
              return alert("Successfully completed transaction! \nYour balance is now: Php " + response);
            }
          });
        } else {
          alert("Did not submit transaction.");
        }
        return $location.path("/home").replace();
      };
      $scope.submitPutTxn = function() {
        return $http.put("/api/item/" + $scope.data.id, {
          message: $scope.data.message
        }).success(function(response) {
          return alert("Successfully updated a message!");
        }).error(function(response) {
          return alert("Something went wrong.");
        });
      };
      return $scope.submitDeleteTxn = function() {
        return $http["delete"]("/api/item/" + $scope.data.id).success(function(response) {
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
