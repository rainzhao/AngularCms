(function() {
  angular.module('mp').controller('DashController', function(AuthService) {
    var vm = this;
    var role = AuthService.getRole();
    if (role === 'org') {
      vm.menu = [
        {
          title: '主页',
          icon: 'glyphicon glyphicon-home',
          state: 'org.home'
        },
        {
          title: '活动管理',
          icon: 'glyphicon glyphicon-flag',
          items: [
            {
              title: '发布活动',
              state: 'org.activity-create'
            },
            {
              title: '活动列表',
              state: 'org.activity'
            }
          ]
        },
        {
          title: '志愿者管理',
          icon: 'glyphicon glyphicon-user',
          items: [
            {
              title: '志愿者总揽',
              state: 'org.volunteer-overview'
            },
            {
              title: '志愿者清单',
              state: 'org.volunteers'
            }
          ]
        },
        //{
        //  title: '设置',
        //  icon: 'glyphicon glyphicon-cog'
        //}
      ];
    } else {
      vm.menu = [
        {
          title: '主页',
          icon: 'glyphicon glyphicon-home',
          state: 'admin.home'
        },
        {
          title: '组织管理',
          icon: 'glyphicon glyphicon-th-large',
          items: [
            {
              title: '组织列表',
              state: 'admin.org'
            }
          ]
        },
        {
          title: '活动管理',
          icon: 'glyphicon glyphicon-flag',
          items: [
            {
              title: '活动列表',
              state: 'admin.activity'
            }
          ]
        }
      ]
    }

  });
})();