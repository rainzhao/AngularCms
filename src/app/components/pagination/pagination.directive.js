(function() {
  angular.module('mp').directive('mpPagination', function(PATH, Base, $rootScope, EVENT) {
    return {
      restrict: 'E',
      templateUrl: PATH.componentsBase + 'pagination/pagination.html',
      scope: {
        api: '@',
        size: '@',
        id: '@',
        params: '=?',
        results: '=?',
        total: '=?'
      },
      link: function(scope) {

        if (scope.id) {  /* 路由跳转后，记住页码 */
          $rootScope[scope.id] =  $rootScope[scope.id] || {};
          $rootScope[scope.id].page = $rootScope[scope.id].page || 1;
          scope.page = $rootScope[scope.id].page;
        } else {
          scope.page = scope.page || 1;
        }

        scope.size = +scope.size || 10;     //默认一页显示10条记录

        scope.pageCountPerView = scope.pageCountPerView || 5;      //每页显示的页码个数

        var _loadData = function() {
          var params = angular.extend({}, scope.params);

          params.size = scope.size;
          params.offset = (scope.page - 1) * scope.size;

          Base.get(scope.api, params).then(function(res) {
            scope.results = res.data.payload.results;
            scope.total = res.data.payload.totalCount;
          });
        };

        _loadData();

        var _doPageChange = function(page) {
          var lastPage = scope.getLastPage();
          if (page < 1 || page > lastPage) return;
          scope.page = page;
          if (scope.id) {
            $rootScope[scope.id].page = page;
          }
          _loadData();
        };

        scope.getLastPage = function() {      //末页页码
          scope.total = scope.total || 0;
          return Math.ceil(scope.total / scope.size);
        };

        scope.$watch(function() {
          return scope.getLastPage();
        }, function(lastPage) {
          if (scope.page > lastPage) {   //若末页只有一条记录，且该记录被删除
            _doPageChange(lastPage);
          }
        });

        scope.getPages = function() {          //当前需要展示的页码
          var pages = [];
          var begin = Math.floor((scope.page - 1) / scope.pageCountPerView) * scope.pageCountPerView + 1;
          var end = begin + (scope.pageCountPerView - 1);
          var lastPage = scope.getLastPage();
          end = end <= lastPage ? end : lastPage;
          for (var page = begin; page <= end; page++) {
            pages.push(page);
          }
          return pages;
        };

        scope.prev = function() {
          _doPageChange(scope.page - 1);
        };

        scope.next = function() {
          _doPageChange(scope.page + 1);
        };

        scope.goTo = function(page) {
          _doPageChange(page);
        };


        scope.$watchCollection(function() {
          return scope.params;
        }, function() {
          _doPageChange(1);
        });

        scope.$on(EVENT.refreshPagination, function() {
          _loadData();
        });

      }
    }
  })
})();
