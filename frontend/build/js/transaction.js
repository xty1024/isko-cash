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
        txnitemid: "",
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
          txnitemid: "",
          txnitemname: "",
          txnunitprice: "",
          txnquantity: "",
          txnunitmeasure: "",
          txntotalamount: ""
        }
      ];
      $scope.changeTxnUnitPrice = function() {
        return $scope.data.txntotalamount = $scope.data.txnunitprice * $scope.data.txnquantity;
      };
      $scope.submitGetAvailableItems = function() {
        return $http.get("/api/transaction/" + $scope.data.vendorid).success(function(response) {
          return $scope.itemsavailable = response;
        }).error(function(e) {
          return alert("Something went wrong.\n" + e);
        });
      };
      $scope.addItemOrder = function(txnitemid, txnitemname, txnunitprice, txnunitmeasure) {
        var txnquantity, txntotalamount;

        txnquantity = prompt("Enter Quantity for '" + txnitemname + "' : ");
        txntotalamount = txnquantity * txnunitprice;
        return $scope.itemsorder.push({
          txnitemid: txnitemid,
          txnitemname: txnitemname,
          txnunitprice: txnunitprice,
          txnquantity: txnquantity,
          txnunitmeasure: txnunitmeasure,
          txntotalamount: txntotalamount
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
        var orderListEmpty, submitTxn;

        submitTxn = confirm("Do you want to submit the transaction?");
        orderListEmpty = $scope.itemsorder.length;
        if (submitTxn) {
          if (orderListEmpty = 1) {
            alert("List empty.");
            return $http.post("/api/transaction", {
              studentid: $scope.data.studentid,
              vendorid: $scope.data.vendorid,
              txntype: $scope.data.txntype,
              txnitemid: $scope.data.txnitemid,
              txnquantity: $scope.data.txnquantity,
              txnunitprice: $scope.data.txnunitprice,
              txntotalamount: $scope.data.txntotalamount
            }).success(function(response) {
              if (response.length > 20) {
                return alert("Cannot complete reload. \n" + response);
              } else {
                alert("Successfully completed reload! \n" + $scope.data.studentid + " remaining balance is now: Php " + response);
                return $location.path("/home").replace();
              }
            });
          } else {
            alert("List not empty.");
            return $scope.itemsorder.forEach(function(itemorder) {
              if (itemorder.txnitemid > 0) {
                return $http.post("/api/transaction", {
                  studentid: $scope.data.studentid,
                  vendorid: $scope.data.vendorid,
                  txntype: $scope.data.txntype,
                  txnitemid: itemorder.txnitemid,
                  txnquantity: itemorder.txnquantity,
                  txnunitprice: itemorder.txnunitprice,
                  txntotalamount: itemorder.txntotalamount
                }).success(function(response) {
                  if (response.length > 20) {
                    return alert("Cannot complete transaction. \n" + response);
                  } else {
                    alert("Successfully completed transaction! \n" + $scope.data.studentid + " remaining balance is now: Php " + response);
                    return $location.path("/home").replace();
                  }
                });
              }
            });
          }
        } else {
          return alert("Did not submit transaction.");
        }
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
