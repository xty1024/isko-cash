(function() {
  $scope.addItem = function() {
    $scope.items.push({
      itemname: $scope.data.itemname,
      itemdesc: $scope.data.itemdesc,
      itemunitprice: $scope.data.itemunitprice,
      itemunitmeasure: $scope.data.itemunitmeasure
    });
    $scope.data.itemname = "";
    $scope.data.itemdesc = "";
    $scope.data.itemunitprice = "";
    return $scope.data.itemunitmeasure = "";
  };

}).call(this);
