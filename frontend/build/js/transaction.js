(function() {
  var momentum;

  momentum = angular.module("Momentum.txncontrollers", []);

  momentum.controller("TxnsController", [
    '$scope', '$http', function($scope, $http) {
      return $http.get("/api/transaction").success(function(response) {
        return $scope.data.messages = response;
      }).error(function(e) {
        return alert("Something went wrong.");
      });
    }
  ]);

  momentum.controller("TxnController", [
    '$scope', '$location', '$http', function($scope, $location, $http) {
      $scope.data = {
        txnid: "",
        studentid: "201354321",
        vendorid: "2",
        txntype: "",
        txnitem: "",
        txnquantity: "",
        txnunitprice: "",
        txntotalamount: ""
      };
      $scope.itemsavailable = [
        {
          itemid: "",
          itemname: "",
          itemdesc: "",
          itemunitprice: "",
          itemunitmeasure: ""
        }
      ];
      $scope.itemsorder = [
        {
          txnitem: "",
          txnunitprice: "",
          txnquantity: "",
          txnunitmeasure: "",
          txntotalamount: ""
        }
      ];
      $scope.changeTxnUnitPrice = function() {
        return $scope.data.txntotalamount = $scope.data.txnunitprice * $scope.data.txnquantity;
      };
      $scope.addItemOrder = function(txnitem, txnunitprice, txnunitmeasure) {
        alert(txnitem);
        $scope.itemsorder.txnquantity = 1;
        $scope.itemsorder.txntotalamount = $scope.itemsorder.txnquantity * txnunitprice;
        $scope.itemsorder.push({
          txnitem: txnitem,
          txnunitprice: txnunitprice,
          txnquantity: $scope.itemsorder.txnquantity,
          txnunitmeasure: txnunitmeasure,
          txntotalamount: $scope.itemsorder.txntotalamount
        });
        $scope.data.txnitem = "";
        $scope.data.txnquantity = "";
        $scope.data.txnunitprice = "";
        return $scope.data.txntotalamount = "";
      };
      $scope.submitGetAvailableItems = function() {
        return $http.get("/api/transaction/" + $scope.data.vendorid).success(function(response) {
          return $scope.itemsavailable = response;
        }).error(function(e) {
          return alert("Something went wrong.\n" + e);
        });
      };
      $scope.submitGetTxn = function() {
        return $http.get("/api/transaction/" + $scope.data.txnid).success(function(response) {
          return $scope.data.studentid = response;
        }).error(function(e) {
          return alert("Something went wrong. That Transaction ID may not exist.\n" + e);
        });
      };
      $scope.submitPostTxn = function() {
        var submitTxn;

        submitTxn = confirm("Do you want to submit the transaction?");
        if (submitTxn) {
          $http.post("/api/transaction", {
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
        return $http.put("/api/reload/" + $scope.data.id, {
          message: $scope.data.message
        }).success(function(response) {
          return alert("Successfully updated a message!");
        }).error(function(response) {
          return alert("Something went wrong.");
        });
      };
      return $scope.submitDeleteTxn = function() {
        return $http["delete"]("/api/reload/" + $scope.data.id).success(function(response) {
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
