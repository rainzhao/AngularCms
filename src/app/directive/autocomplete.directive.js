(function() {
  angular.module('mp').directive('mpAutocomplete', function($compile, $timeout, Base) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, ele, attr, ngModal) {

        var conf = scope.$eval(attr.mpAutocomplete);

        var subScope = scope.$new();

        scope.getInputValue = function() {
          return ngModal.$viewValue;
        };

        Base.get(conf.api).then(function(res) {
          subScope.data = res.data.payload;
        });

        var inputEle = ele[0];

        var autocompleteWpEle = document.createElement('div');
        autocompleteWpEle.className = 'mp-autocomplete-wrapper';
        autocompleteWpEle.innerHTML =
          '<ul class="_autocomplete-helper" ng-show="showHelper">' +
            '<li ng-repeat="words in data | filter: getInputValue()" ng-click="clickWords(words)">{{words}}</li>' +
          '</ul>';
          //'<mp-loading-spanner-a ng-show="false"></mp-loading-spanner-a>';

        $compile(angular.element(autocompleteWpEle).contents())(subScope);

        inputEle.parentNode.insertBefore(autocompleteWpEle, inputEle);
        autocompleteWpEle.insertBefore(inputEle, autocompleteWpEle.firstChild);

        var helperElem = autocompleteWpEle.querySelector('._autocomplete-helper');


        inputEle.onfocus = function() {
          $timeout(function() {
            subScope.showHelper = true;
          });
        };

        var hideHelper = function() {
          $timeout(function() {
            subScope.showHelper = false;
          });
        };
        window.onclick = hideHelper;

        $('[role=dialog]').on('click', function() {
          hideHelper();
        });

        autocompleteWpEle.onclick = function() {
          event.stopPropagation();
        };

        subScope.clickWords = function(words) {
          $timeout(function() {
            //console.log(words, ngModal);
            ngModal.$setViewValue(words);
            ngModal.$render();
            subScope.showHelper = false;
          });
        };
      }
    }
  });
})();