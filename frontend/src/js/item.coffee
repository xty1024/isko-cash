
momentum = angular.module "Momentum.itemcontrollers", []

momentum.controller "ItemsController", ['$scope', '$http', ($scope, $http) ->
  # We'll use $resource later.
  $http.get("/api/transaction")
  .success (response) ->
    $scope.data.messages = response
  .error (e) ->
    alert "Something went wrong."
]

momentum.controller "ItemController", ['$scope', '$location', '$http', ($scope, $location, $http) ->

  $scope.data =
    itemid: ""
    vendorid: "2"
    itemname: ""
    itemdesc: ""
    itemunitprice: ""
    itemunitmeasure: ""
    availabletoday: ""

  $scope.items = [
    itemid: ""
    itemname: ""
    itemdesc: ""
    itemunitprice: ""
    itemunitmeasure: ""
    availabletoday: ""
  ]

  $scope.submitGetItem = ->
    $http.get("/api/item/#{$scope.data.txnid}")
    .success (response) ->
      $scope.data.studentid = response
    .error (e) ->
      alert "Something went wrong. That Transaction ID may not exist.\n" + e

  $scope.submitGetItems = ->
    $http.get("/api/item/#{$scope.data.vendorid}")
    .success (response) ->
      $scope.items = response
    .error (e) ->
      alert "Something went wrong. The Vendor ID may not exist.\n" + e

  $scope.submitPostItem = ->
    submitTxn = confirm "Do you want to add the item to your Master List?"
    if submitTxn      
      $http.post("/api/item",
        vendorid: $scope.data.vendorid
        itemname: $scope.data.itemname
        itemdesc: $scope.data.itemdesc
        itemunitprice: $scope.data.itemunitprice
        itemunitmeasure: $scope.data.itemunitmeasure
      ).success (response) ->
        alert "Successfully completed adding item to your Master List!"
      .error (response) ->
        alert "Something went wrong." + response

  $scope.submitPutItemsToday = ($event, itemid) ->
    availabletoday = $event.target.checked
    alert itemid + " " + availabletoday 
    $http.put("/api/item/#{itemid}",
      availabletoday: availabletoday
    ).success (response) ->
      alert "Successfully added/removed " + response + " to Today's Available Items!"
    .error (response) ->
      alert "Something went wrong."

  $scope.submitDeleteTxn = ->
    $http.delete("/api/item/#{$scope.data.id}")
    .success (response) ->
      $scope.data.id = ""
      $scope.data.message = ""
      alert "Successfully deleted a message!"
    .error (response) ->
      alert "Something went wrong. That ID may not exist."
]
