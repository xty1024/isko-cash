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
        vendorid: "2",
        itemname: "",
        itemdesc: "",
        itemunitprice: "",
        itemunitmeasure: "",
        availabletoday: ""
      };
      $scope.items = [
        {
          itemid: "",
          itemname: "",
          itemdesc: "",
          itemunitprice: "",
          itemunitmeasure: "",
          availabletoday: ""
        }
      ];
      $scope.submitGetItem = function() {
        return $http.get("/api/item/" + $scope.data.txnid).success(function(response) {
          return $scope.data.studentid = response;
        }).error(function(e) {
          return alert("Something went wrong. That Transaction ID may not exist.\n" + e);
        });
      };
      $scope.submitGetItems = function() {
        return $http.get("/api/item/" + $scope.data.vendorid).success(function(response) {
          return $scope.items = response;
        }).error(function(e) {
          return alert("Something went wrong. The Vendor ID may not exist.\n" + e);
        });
      };
      $scope.submitPostItem = function() {
        var submitTxn;

        submitTxn = confirm("Do you want to add the item to your Master List?");
        if (submitTxn) {
          return $http.post("/api/item", {
            vendorid: $scope.data.vendorid,
            itemname: $scope.data.itemname,
            itemdesc: $scope.data.itemdesc,
            itemunitprice: $scope.data.itemunitprice,
            itemunitmeasure: $scope.data.itemunitmeasure
          }).success(function(response) {
            return alert("Successfully completed adding item to your Master List!");
          }).error(function(response) {
            return alert("Something went wrong." + response);
          });
        }
      };
      $scope.submitPutItemsToday = function($event, itemid) {
        var availabletoday;

        availabletoday = $event.target.checked;
        alert(itemid + " " + availabletoday);
        return $http.put("/api/item/" + itemid, {
          availabletoday: availabletoday
        }).success(function(response) {
          return alert("Successfully added/removed " + response + " to Today's Available Items!");
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
