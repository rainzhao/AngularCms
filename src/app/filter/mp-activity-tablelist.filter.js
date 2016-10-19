(function () {
  angular
    .module('mp')
    .filter('activityStatusFilter',activityStatusFilter);

    function activityStatusFilter () {
      return function (value, newValue) {
        switch(value){
          case 'EDITING': newValue = '正在编辑中';break;
          case 'AUDITING': newValue = '等待审核';break;
          case 'AUDIT_FAILED': newValue = '审核失败';break;
          case 'ACTIVE': newValue = '活动招募中';break;
          case 'INACTIVE': newValue = '活动报名截止';break;
          case 'ONGOING': newValue = '活动进行中';break;
          case 'FINISHED': newValue = '活动结束';break;
          case 'CANCELLED': newValue = '活动取消';break;
          case 'DELETED': newValue = '活动删除';break;
        }
        return newValue;
      }
    }
})();
