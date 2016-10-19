(function() {
  angular.module('mp').directive('mpSideMenu', function(PATH, BaseService, $state, $rootScope, $state, AuthService) {

    function _inactiveAllItem(menu) {
      if (!angular.isArray(menu)) return;
      angular.forEach(menu, function(item) {
        if (!item.$isFolder) {
          item.$active = false;
        }
        _inactiveAllItem(item.items);
      });
    }

    function _shrinkAllFolder(menu) {
      if (!angular.isArray(menu)) return;
      angular.forEach(menu, function(item) {
        if (item.$isFolder) {
          item.$expand = false;
        }
        _shrinkAllFolder(item.items);
      });
    }

    function _expandFolder(item) {
      if (!item || !item.$isFolder) return;
      item.$expand = true;
      _expandFolder(item.$parent);
    }

    function _expandActiveParent(menu) {
      if (!angular.isArray(menu)) return;
      angular.forEach(menu, function(item) {
        if (item.$active) {
          _expandFolder(item.$parent);
          return;
        }
        _expandActiveParent(item.items);
      })
    }

    function enhanceItem(item, menu, itemActiveCallback) {

      itemActiveCallback = angular.isFunction(itemActiveCallback) ? itemActiveCallback : angular.noop;

      item.$level = item.$level || 2;

      item.$click = function() {
        if (item.$isFolder) {
          if (item.$expand) {
            _shrinkAllFolder(menu);
            _expandFolder(item);
            item.$expand = false;
          } else {
            _shrinkAllFolder(menu);
            _expandFolder(item);
          }
          //_expandActiveParent(menu);
        } else {
          _inactiveAllItem(menu);
          _shrinkAllFolder(menu);
          _expandFolder(item.$parent);
          item.$active = true;
          itemActiveCallback(item);
        }
      };

      if (angular.isArray(item.items)) {
        item.$isFolder = true;
        angular.forEach(item.items, function(subItem) {
          subItem.$level = item.$level + 1;
          subItem.$parent = item;
          enhanceItem(subItem, menu, itemActiveCallback);
        });
      }
    }

    function activityItemByState(menu, state) {
      angular.forEach(menu, function(item) {
        if (item.state === state) {
          item.$click();
          return;
        }
        activityItemByState(item.items, state);
      });
    }

    return {
      restrict: 'E',
      templateUrl: PATH.componentsBase + 'side-menu/side-menu.html',
      scope: {
        menu: '=?'
      },
      link:function(scope) {
        var invisibleItem = false;    //为true代表相应的路由在菜单中没有对应的条目
        var itemActiveCallback = function(item) {
          if (item.state) {
            if (invisibleItem) {
              invisibleItem = false;
              return;
            }
            $state.go(item.state);
          }
        };

        BaseService.funcEach(enhanceItem, scope.menu, scope.menu, itemActiveCallback);
        scope.item = {items: scope.menu, $level: 1};

        scope.$watch(function() {       //路由变化需要触发相应的菜单条目高亮
          return $state.current.name;
        }, function(state) {
          if (!state) return;
          if ($state.current.$parent && $state.current.$parent.state) {
            state = $state.current.$parent.state;
            invisibleItem = true;
          }
          activityItemByState(scope.menu, state);
        });
        scope.getUser = function() {
          return AuthService.getUser();
        };
      }
    }
  });

  angular.module('mp').directive('mpMenuItem', function(PATH, $compile) {

    function _compile(element, link) {
      var contents = element.contents().remove();
      var compiledContents;
      return {
        pre: null,
        post: function(scope, ele) {
          if (!compiledContents) compiledContents = $compile(contents);
          compiledContents(scope, function(clone) {
            ele.append(clone);
          });
          if (angular.isFunction(link)) {
            link.apply(null, arguments);
          }
        }
      }
    }

    return {
      restrict: 'E',
      scope: {
        item: '=?'
      },
      templateUrl: PATH.componentsBase + 'side-menu/menu-item.html',
      compile: function(element) {
        return _compile(element, function(scope, ele, attrs) {

        })
      }
    }

  })
})();
