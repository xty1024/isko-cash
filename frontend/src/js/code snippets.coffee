

  $scope.addItem = ->
    $scope.items.push
      itemname: $scope.data.itemname
      itemdesc: $scope.data.itemdesc
      itemunitprice: $scope.data.itemunitprice
      itemunitmeasure: $scope.data.itemunitmeasure
    $scope.data.itemname = ""
    $scope.data.itemdesc = ""
    $scope.data.itemunitprice = ""
    $scope.data.itemunitmeasure = ""


.then = (result) ->
      if (result)
        alert "Dialog closed with result: " + result

			div
				button.btn#additemtoday-btn(ng-click='submitPutItemsToday(user, $event)') Update Checked Items for Today's Available Items

