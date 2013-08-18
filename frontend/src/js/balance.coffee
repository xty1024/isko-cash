
momentum = angular.module "Momentum.balcontrollers", []

momentum.controller "BalController", ['$scope', '$location', '$http', ($scope, $location, $http) ->

  $scope.data =
    txnid: ""
    studentid: ""
    vendorid: ""
    txntype: ""
    txnitem: ""
    txnquantity: ""
    txnunitprice: ""
    txntotalamount: ""
    balance: ""

  $scope.submitGetBal = ->
    $scope.data.studentid = "201354321"
    $http.get("/api/balance/#{$scope.data.studentid}")
    .success (response) ->
      $scope.data.balance = response
    .error (e) ->
      alert "Something went wrong. That Student ID may not exist.\n" + e
]
