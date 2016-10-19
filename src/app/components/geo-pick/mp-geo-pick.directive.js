(function () {
  angular
    .module('mp')
    .directive('mpGeoPick',mpGeoPick);

    function mpGeoPick (PATH, Base, API, $timeout) {
      return {
        restrict: 'E',
        scope: {
          geoLevel1: "=?",
          geoLevel2: "=?",
          geoLevel3: "=?"
        },
        templateUrl: PATH.componentsBase + 'geo-pick/mp-geo-pick.html',
        link: function (scope) {

          //初始化数据
          scope.level3Show = false;
          Base.get(API.geo,{id: 0,activity:true}).then(function (data) {
            scope.level1 = data.data.payload;
          });
          scope.$watch(function () {
            return scope.geoLevel1;
          }, function(geoId) {

            if(!geoId || typeof geoId === 'object'){return;}
            Base.get(API.geo,{id: geoId}).then(function (data) {
              scope.level2 = data.data.payload;
            });
          });
          scope.$watch(function () {
            return scope.geoLevel2;
          }, function (geoId) {
            if(!geoId || typeof geoId === 'object'){return;}
            Base.get(API.geo,{id: geoId}).then(function (data) {
              if(data.data.payload.length == 0){
                return;
              }
              scope.level3Show = true;
              scope.level3 = data.data.payload;
            });
          });

          //当select change时执行
          scope.level1Change = function () {
            scope.level3Show = false;
            Base.get(API.geo,{id: scope.geoLevel1}).then(function (data) {
              scope.level2Show = true;
              scope.level2 = data.data.payload;
            });
          };
          scope.level2Change = function () {
            Base.get(API.geo,{id: scope.geoLevel2}).then(function (data) {
              if(data.data.payload.length > 0){
                scope.level3Show = true;
                scope.level3 = data.data.payload;
              }
            });
          }

        }
      }
    }
})();
