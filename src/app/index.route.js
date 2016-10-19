(function() {
  'use strict';

  angular
    .module('mp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, PATH) {
    $stateProvider

      .state('orgLogin', {
        url: '/login/org',
        templateUrl: PATH.routerBase + 'login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        $role: 'org'
      })

      .state('adminLogin', {
        url: '/login/admin',
        templateUrl: PATH.routerBase + 'login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        $role: 'admin'
      })

      .state('org', {                        //组织的父state
        url: '/org',
        abstract: true,
        templateUrl: PATH.routerBase + 'dash.html',
        controller: 'DashController',
        controllerAs: 'dash'
      })
      .state('admin', {                      //管理员的父state
        url: '/admin',
        abstract: true,
        templateUrl: PATH.routerBase + 'dash.html',
        controller: 'DashController as dash',
      })

      /*  属于组织的页面  */
      .state('org.home', {
        url: '/home',
        templateUrl: PATH.orgBase + 'home/home.html',
        controller: 'OrgHomeController as vm',

        $name: '主页'
      })

      .state('org.activity', {
        url: '/activity',
        templateUrl: PATH.orgBase + 'activity/activity.html',
        controller: 'OrgActivityController as vm',
        $name: '活动列表',
        $parent: {name: '活动管理'}
      })
      .state('org.activity-create', {
        url: '/activity/create',
        templateUrl: PATH.orgBase + 'activity/detail/activity-detail.html',
        controller: 'OrgActivityDetailController as vm',
        $name: '发布活动',
        $parent: {name: '活动管理'}
      })
      .state('org.activity-detail', {
        url: '/activity/{id}/detail',
        templateUrl: PATH.orgBase + 'activity/detail/activity-detail.html',
        controller: 'OrgActivityDetailController as vm',
        $name: '活动详情',
        $parent: {state: 'org.activity'}
      })
      .state('org.activity-update', {
        url: '/activity/{id}/update',
        templateUrl: PATH.orgBase + 'activity/detail/activity-detail.html',
        controller: 'OrgActivityDetailController as vm',
        $name: '编辑活动',
        $parent: {state: 'org.activity'}
      })
      .state('org.activity-review', {         //活动回顾
        url: '/activity/{id}/review',
        templateUrl: PATH.orgBase + 'activity/review/activity-review.html',
        controller: 'OrgActivityReviewController as vm',

        $name: '活动回顾',
        $parent: {state: 'org.activity'}
      })
      .state('org.activity-information', {      //活动人员信息
        url: '/activity/{id}/information',
        templateUrl: PATH.orgBase + 'activity/information/activity-information.html',
        controller: 'activityInformationController as vm',

        $name: '报名人员信息',
        $parent: {state: 'org.activity'}
      })
      .state('org.volunteers', {
        url: '/volunteers',
        templateUrl: PATH.orgBase + 'volunteer/volunteers.html',
        controller: 'OrgVolunteersController as vm',

        $name: '志愿者清单',
        $parent: {name: '志愿者管理'}
      })
      .state('org.volunteer-detail', {
        url: '/volunteer/{id}',
        templateUrl: PATH.orgBase + 'volunteer/detail/volunteer-detail.html',
        controller: 'OrgVolunteerDetailController as vm',

        $name: '志愿者详情',
        $parent: {state: 'org.volunteers'}
      })
      .state('org.volunteer-overview', {
        url: '/volunteer-overview',
        templateUrl: PATH.orgBase + 'volunteer/volunteer-overview.html',
        controller: 'OrgVolunteerOverviewController as vm',

        $name: '志愿者总览',
        $parent: {name: '志愿者管理'}
      })

      /* $$$$$$$$$$$$$$ */


      /* 属于管理员的页面 */
      .state('admin.home', {
        url: '/home',
        templateUrl: PATH.adminBase + 'home/home.html',
        controller: 'AdminHomeController as vm',
        $name: '主页'
      })
      .state('admin.org', {
        url: '/org',
        templateUrl: PATH.adminBase + 'org/org.html',
        controller: 'AdminOrgController as vm',
        $name: '组织列表',
        $parent: {name: '组织管理'}
      })
      .state('admin.org-check', {
        url: '/org/:id/check',
        templateUrl: PATH.adminBase + 'org/detail/org-detail.html',
        controller: 'AdminOrgDetailController as vm',
        $name: '组织审核',
        $parent: {state: 'admin.org'}
      })
      .state('admin.activity', {
        url: '/activity',
        templateUrl: PATH.adminBase + 'activity/activity.html',
        controller: 'AdminActivityController as vm',
        $name: '活动列表',
        $parent: {name: '活动管理'}
      })
      .state('admin.activity-detail',{
        url: '/activity-detail/{id}',
        templateUrl: PATH.adminBase + 'activity/detail/activity-detail.html',
        controller: 'AdminActivityDetailController as vm',
        $name: '活动审核',
        $parent: {state: 'admin.activity'}
      })
      /* $$$$$$$$$$$$$$ */
    ;

    $urlRouterProvider.otherwise('/login/org');
  }

})();
