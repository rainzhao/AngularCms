(function () {
  angular
    .module('mp')
    .controller('activityInformationController',activityInformationController);

    function activityInformationController ($stateParams, AuthService, Base, API, $rootScope, EVENT, $scope) {
      var vm = this;
      vm.params = {
        oid: AuthService.getUser().id,
        aid: $stateParams.id,
        status: '',
        keyword: ''
      };

      //活动筛选

      vm.searchKeyWords = function () {
        if(vm.params.status == ""){
          delete vm.params.status;
        }
        if(vm.params.keyword == ""){
          delete vm.params.keyword;
        }
        $scope.$watch(function () {
          return vm.params.keyword;
        },function () {
          $scope.$broadcast(EVENT.refreshPagination);
        });
        $scope.$broadcast(EVENT.refreshPagination);
        return false;
      };

      vm.statusFilter = function () {
        if(vm.params.keyword == ""){
          delete vm.params.keyword;
        }
        if(vm.params.status == ""){
          delete vm.params.status;
        }
        $scope.$broadcast(EVENT.refreshPagination);
      };

      Base.get(API.getActivitySignUpRecords,{oid:vm.params.oid,aid: vm.params.aid}).then(function(data) {
        vm.showDownloadSignBtn = true;
        if(data.data.payload.results.length == 0){
          vm.showDownloadSignBtn = false;
          TOASTR.warning('尚未有人报名该活动');
        }
      });
      Base.get(API.getOneActivity,{aid: vm.params.aid}).then(function (data) {
        vm.oneActivityMes = data.data.payload;
      });

      //导出报名人员信息
      vm.downloadSignPeopleMes = function () {
        Base.get(API.exportActivitySignUpRecords,{oid: vm.params.oid,aid: vm.params.aid}).then(function(data){
          var mes = data.data.payload;
          var blob = base64toBlob(mes.data,'application/x-xls');
          saveAs(blob,mes.fileName);
          TOASTR.success('导出成功！');
        });
      };

      //获取活动二维码
      vm.getQrcode = function (codeType) {
        var aid = $stateParams.id;
        Base.get(API.getActivityQrCode,{oid:vm.params.oid,aid:vm.params.aid,type: codeType},'').then(function (data) {
          var codeData = data.data.payload;
          if(codeType == 1){
            var blob = base64toBlob(codeData.data,'image/png');
            saveAs(blob, codeData.fileName);
          }
          if(codeType == 2){
            var blob = base64toBlob(codeData.data,'image/png');
            saveAs(blob, codeData.fileName);
          }
          if(codeType == 3){
            var blob = base64toBlob(codeData.data,'image/png');
            saveAs(blob, codeData.fileName);
          }
        })
      };

    }
})();
