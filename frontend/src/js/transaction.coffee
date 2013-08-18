
momentum = angular.module "Momentum.txncontrollers", []

momentum.controller "TxnsController", ['$scope', '$http', ($scope, $http) ->
  # We'll use $resource later.
  $http.get("/api/transaction")
  .success (response) ->
    $scope.data.messages = response
  .error (e) ->
    alert "Something went wrong."
]

momentum.controller "TxnController", ['$scope', '$location', '$http', ($scope, $location, $http) ->

  $scope.data =
    txnid: ""
    studentid: "201354321"
    vendorid: "2"
    txntype: ""
    txnitem: ""
    txnquantity: ""
    txnunitprice: ""
    txntotalamount: ""

  $scope.itemsavailable = [
    itemid: ""
    itemname: ""
    itemdesc: ""
    itemunitprice: ""
    itemunitmeasure: ""
  ]

  $scope.items = [
    txnitem: ""
    txnquantity: ""
    txnunitprice: ""
    txntotalamount: ""
  ]

  $scope.changeTxnUnitPrice = ->
    $scope.data.txntotalamount = $scope.data.txnunitprice * $scope.data.txnquantity

  $scope.addItem = ->
    $scope.items.push
      txnitem: $scope.data.txnitem
      txnquantity: $scope.data.txnquantity
      txnunitprice: $scope.data.txnunitprice
      txntotalamount: $scope.data.txntotalamount
    $scope.data.txnitem = ""
    $scope.data.txnquantity = ""
    $scope.data.txnunitprice = ""
    $scope.data.txntotalamount = ""

  $scope.submitGetAvailableItems = ->
    $http.get("/api/transaction/#{$scope.data.vendorid}")
    .success (response) ->
      $scope.itemsavailable = response
    .error (e) ->
      alert "Something went wrong.\n" + e

  $scope.submitGetTxn = ->
    $http.get("/api/transaction/#{$scope.data.txnid}")
    .success (response) ->
      $scope.data.studentid = response
    .error (e) ->
      alert "Something went wrong. That Transaction ID may not exist.\n" + e

  $scope.submitPostTxn = ->
    submitTxn = confirm "Do you want to submit the transaction?"
    if submitTxn      
      $http.post("/api/transaction",
        studentid: $scope.data.studentid
        vendorid: $scope.data.vendorid
        txntype: $scope.data.txntype
        txnitem: $scope.data.txnitem
        txnquantity: $scope.data.txnquantity
        txnunitprice: $scope.data.txnunitprice
        txntotalamount: $scope.data.txntotalamount
      ).success (response) ->
        if response.length > 20      
          alert "Cannot complete transaction. \n" + response
        else
          alert "Successfully completed transaction! \nYour balance is now: Php " + response
    else
      alert "Did not submit transaction."
    $location.path("/home").replace()

  $scope.submitPutTxn = ->
    $http.put("/api/reload/#{$scope.data.id}",
      message: $scope.data.message
    ).success (response) ->
      alert "Successfully updated a message!"
    .error (response) ->
      alert "Something went wrong."

  $scope.submitDeleteTxn = ->
    $http.delete("/api/reload/#{$scope.data.id}")
    .success (response) ->
      $scope.data.id = ""
      $scope.data.message = ""
      alert "Successfully deleted a message!"
    .error (response) ->
      alert "Something went wrong. That ID may not exist."
]
