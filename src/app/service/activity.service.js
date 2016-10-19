(function () {
  angular
    .module('mp')
    .service('activityService',activityService);

  function activityService(){
    var self = this;
    this.enhance = function (activity) {
      activity.$operateChoose = function (data,type) {
        if(type == 'lhcEdite'){
          if(data == "EDITING" || data == "AUDIT_FAILED"){
            return true;
          }
        }
        if(type == 'lhcDelete'){
          if(data == 'EDITING' || data == 'AUDIT_FAILED' || data == 'DELETED'){
            return true;
          }
        }
        if(type == 'lhcDetail'){
          if(data == 'AUDITING' || data == 'ACTIVE'|| data == 'INACTIVE' || data == 'ONGOING'|| data == 'FINISHED' || data == 'CANCELLED' ){
            return true;
          }
        }
        if(type == 'lhcCancel'){
          if(data == 'ACTIVE'|| data == 'INACTIVE' ){
            return true;
          }
        }
        if(type == 'lhcSignMes'){
          if(data == 'ACTIVE'|| data == 'INACTIVE' || data == 'ONGOING'|| data == 'FINISHED' ){
            return true;
          }
        }
        if(type == 'lhcBackHead'){
          if(data == 'FINISHED' ){
            return true;
          }
        }
        if(type == 'lhcCancelReason'){
          if(data == 'CANCELLED'){
            return true;
          }
        }
      };
      activity.$operateChoosePlat = function (status,type) {
        if(type == 'lhcViewInfomations'){
          if(status !== 'AUDIT_FAILED'){
            return true;
          }else{
            return false;
          }
        }
        if(type == 'lhcCheck'){
          if(status == 'AUDITING'){
            return true;
          }else{
            return false;
          }
        }
      };
      return activity;
    };
    this.enhances = function (activitys){
      if(activitys !== undefined){
        return activitys.map(function (activity) {
          return self.enhance(activity);
        });
      }
    };
  }
})();
