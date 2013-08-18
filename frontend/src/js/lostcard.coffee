
momentum = angular.module "Momentum.lostcardcontrollers", []

momentum.controller "LostCardController", ['$scope', '$location', '$http', ($scope, $location, $http) ->

  $scope.data =
    studentid: ""
    status: "Lost"

  $scope.submitGetCardStatus = ->
    $http.get("/api/lostcard/#{$scope.data.studentid}")
    .success (response) ->
      alert "The status of your card (with Student ID " + $scope.data.studentid + ") is: " + response
    .error (e) ->
      alert "Something went wrong. That Consumer may not exist.\n" + e

  $scope.submitPutLostCard = ->
    $http.put("/api/lostcard/#{$scope.data.studentid}",
      status: $scope.data.status
    ).success (response) ->
      alert "Successfully tagged your account with Student ID " + $scope.data.studentid + " as " + response + "! \nPlease proceed to the Registrar's Office to acquire a new ID."
      $location.path("/home").replace()
      $scope.$apply()
    .error (response) ->
      alert "Something went wrong." + response
]
