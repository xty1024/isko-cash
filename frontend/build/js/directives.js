(function() {
  var momentum;

  momentum = angular.module("Momentum.directives", []);

  momentum.directive('mmTabs', [
    function() {
      return {
        transclude: true,
        replace: true,
        scope: {},
        template: "<div class=\"tabbable\">\n  <ul class=\"nav nav-tabs\">\n    <li ng-repeat=\"tab in tabs\" ng-class=\"{active: tab.selected}\">\n      <a ng-click=\"select(tab)\">{{tab.title}}</a>\n    </li>\n  </ul>\n  <div class=\"tab-content\" ng-transclude></div>\n</div>",
        controller: [
          '$scope', function($scope) {
            $scope.tabs = [];
            $scope.select = function(tab) {
              var t, _i, _len, _ref;

              _ref = $scope.tabs;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                t = _ref[_i];
                t.selected = false;
              }
              return tab.selected = true;
            };
            this.register = function(tab) {
              if ($scope.tabs.length === 0) {
                $scope.select(tab);
              }
              return $scope.tabs.push(tab);
            };
            return null;
          }
        ]
      };
    }
  ]);

  momentum.directive('mmTab', [
    function() {
      return {
        require: '^mmTabs',
        transclude: true,
        replace: true,
        scope: {
          title: '@mmTab'
        },
        template: "<div class=\"tab-pane\" ng-class=\"{active: selected}\" ng-transclude></div>",
        link: function(scope, element, attrs, tabsCtrl) {
          return tabsCtrl.register(scope);
        }
      };
    }
  ]);

}).call(this);
