(function() {
  angular.module('mp').controller('OrgActivityDetailController', function($state, $q, $log, Base, API, AuthService, $stateParams) {
    var vm = this;
    var oid = AuthService.getUser().id;
    vm.stateName = $state.current.name;

    if($state.current.$name == "编辑活动"){
      vm.panelLeft = false;
    }else{
      vm.panelLeft = true;
    }
    vm.showMesNotAllowOperate = function () {
      TOASTR.warning('活动处于不可编辑状态');
    };

    //样式初始化
    vm.lhcActivityStyle = {
      "expense": false,
      "tags": {},
      "categoryId": {},
      "countLimit": false,
      "signUpRequiredFieldIds": {}
    };

    //数据初始化
    vm.startTime = new Date();
    vm.endTime = new Date();
    vm.signUpDeadline = new Date();
    vm.checkInStartTime = new Date();
    vm.checkInEndTime = new Date();

    vm.lhcActivityPublishData = {
      "name": "",
      "tagIds": [],
      "categoryId": 1,
      "offlineSignUp": false,
      "startTime": new Date(),
      "endTime": new Date(),
      "signUpDeadline": new Date(),
      "checkInStartTime": new Date(),
      "checkInEndTime": new Date(),
      "needAudit": false,
      "signUpRequiredFieldIds": [],
      "signUpOptionalFieldIds": [],
      "countLimit": "",
      "expense": "",
      "details": "",
      "coverUrl": "",
      "coverThumbUrl": "",
      "discussQrCodeUrl": "",
      "personInChargeName": "",
      "personInChargeCellphone": "",
      "fixedPhone": "",
      "geoLevel1": "",
      "geoLevel2": "",
      "geoLevel3": "",
      "address": "",
      "status": ""
    };
    //获取活动二维码
    vm.getQrcode = function (codeType) {
      var aid = $stateParams.id;
      Base.get(API.getActivityQrCode,{oid:oid,aid:aid,type: codeType},'').then(function (data) {
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
    //上传讨论组二维码
    vm.uploadDiscussQrCode = function () {
      var aid = $stateParams.id;
      var url = vm.lhcActivityPublishData.discussQrCodeUrl;
      if(url == ""){
        TOASTR.error('图片尚未选择,请重新选择！');
        return;
      }
      Base.post(API.postUploadDiscussQrcodde,{oid:oid,aid:aid},{discussQrCodeUrl: url}).then(function(){
        TOASTR.success('上传成功！');
      });
    };
    //获取活动性质列表
    Base.get(API.getMetaDataTags,'','').then(function (data) {
      vm.lhcActivityStyle.tags = data.data.payload;
    });

    //获取活动分类
    Base.get(API.getCategories,'','').then(function (data) {
      vm.lhcActivityStyle.categoryId = data.data.payload;
    });

    //获取活动必填字段
    Base.get(API.getSignUpFields,{id: oid},'').then(function (data) {
      vm.lhcActivityStyle.signUpRequiredFieldIds = data.data.payload;
    });

    vm.submitAuditBtn = true;//审核按钮不可用


    //编辑活动
    if($state.current.$name == "编辑活动"){
      commonDeal();
    }
    //活动详情
    if($state.current.$name == "活动详情"){
      commonDeal();

    }
    //commonDeal
    function commonDeal() {
      var aid = $stateParams.id;
      Base.get(API.getOneActivity,{aid:aid}).then(function (data) {
        vm.lhcActivityPublishData = data.data.payload;
        vm.startTime = new Date(vm.lhcActivityPublishData.startTime);
        vm.endTime = new Date(vm.lhcActivityPublishData.endTime);
        vm.signUpDeadline = new Date(vm.lhcActivityPublishData.signUpDeadline);
        vm.checkInStartTime = new Date(vm.lhcActivityPublishData.checkInStartTime);
        vm.checkInEndTime = new Date(vm.lhcActivityPublishData.checkInEndTime);
        vm.startDate = new Date(vm.lhcActivityPublishData.startTime);
        vm.endDate = new Date(vm.lhcActivityPublishData.endTime);
        vm.signUpDeadDate = new Date(vm.lhcActivityPublishData.signUpDeadline);
        vm.checkInStartDate = new Date(vm.lhcActivityPublishData.checkInStartTime);
        vm.checkInEndDate = new Date(vm.lhcActivityPublishData.checkInEndTime);
        vm.lhcActivityPublishData.geoLevel1 = vm.lhcActivityPublishData.geoLevel1 && vm.lhcActivityPublishData.geoLevel1.id;
        vm.lhcActivityPublishData.geoLevel2 = vm.lhcActivityPublishData.geoLevel2 && vm.lhcActivityPublishData.geoLevel2.id;
        vm.lhcActivityPublishData.geoLevel3 = vm.lhcActivityPublishData.geoLevel3 && vm.lhcActivityPublishData.geoLevel3.id;
        vm.lhcActivityPublishData.categoryId = vm.lhcActivityPublishData.category.id;
        vm.lhcActivityPublishData.expense = vm.lhcActivityPublishData.expense &&  vm.lhcActivityPublishData.expense/ 100;
        if(vm.lhcActivityPublishData.expense > 0){
          vm.lhcActivityStyle.expense = true;
        }
        if(vm.lhcActivityPublishData.countLimit > 0){
          vm.lhcActivityStyle.countLimit = true;
        }
        angular.forEach(vm.lhcActivityPublishData.tags,function (data){
          angular.forEach(vm.lhcActivityStyle.tags,function(styleData){
            if(styleData.id == data.id){
              styleData.$checked = true;
            }
          })
        });
      });
    }
    vm.formValid = function (form,data) {
      form = form || {};
      //活动性质处理
      vm.lhcActivityPublishData.tagIds = [];
      angular.forEach(vm.lhcActivityStyle.tags,function (item) {
        if(item.$checked){
          vm.lhcActivityPublishData.tagIds.push(item.id);
        }
      });
      var tagArr = data.tagIds;

      var tagValid = function () {

        return angular.isArray(tagArr) && tagArr.length > 0;
      };
      var detailsValid = function () {
        return !!data.details;
      };
      //console.log(form.$valid,vm.activeTimerValidate(),vm.activePictureValid(),tagValid(),detailsValid());
      return form.$valid && vm.activeTimerValidate() && vm.activePictureValid() && tagValid() && detailsValid();

    };
    //表单提交

    vm.submitActivity = function () {
      vm.activeDataDeal();
      vm.lhcActivityPublishData.status = 'EDITING';
      vm.lhcActivityPublishData.aid = vm.lhcActivityPublishData.id;
      Base.post(API.saveActivity,{oid:oid},vm.lhcActivityPublishData,'').then(function (data) {
        vm.lhcActivityPublishData = data.data.payload;
        vm.submitAuditBtn = false;
        TOASTR.success('保存成功');
        $state.go('org.activity');
      },function () {
        TOASTR.error('提交失败请检查');
      });
    };
    //提交审核
    vm.submitAduit = function () {

      vm.activeDataDeal();

      vm.lhcActivityPublishData.status = 'EDITING';
      vm.lhcActivityPublishData.aid = vm.lhcActivityPublishData.id;
      Base.post(API.saveActivity,{oid:oid},vm.lhcActivityPublishData,'').then(function (data) {
        vm.lhcActivityPublishData = data.data.payload;
        vm.submitAuditBtn = false;

        vm.lhcActivityPublishData.status = 'AUDITING';
        var aid = vm.lhcActivityPublishData.id;
        Base.post(API.auditActivity,{oid:oid,aid:aid},vm.lhcActivityPublishData,'').then(function (data){
          /*SWEETALERT.swal({
           title: '提交审核成功',
           confirmButtonText: '确定',
           type: 'success'
           });*/
          TOASTR.success('提交审核成功');
          $state.go('org.activity');
          //vm.lhcActivityPublishData = data.data.payload;
        },function (error){
          /*SWEETALERT.swal({
           title: '提交审核失败请检查',
           confirmButtonText: '确定',
           type: 'error'
           });*/
          TOASTR.error(error.message);
        });

      },function () {
        TOASTR.error('提交失败请检查');
      });


    };
    //数据处理
    vm.activeDataDeal = function () {

      vm.addErrorTag(vm.lhcActivityStyle.tags);
      vm.activePictureValidate();
      vm.activeDetailValidate();
      vm.activeTimerValidate();

      //费用处理
      if(!vm.lhcActivityStyle.expense){
        vm.lhcActivityPublishData.expense = 0;
      }

      //报名人数处理
      if(!vm.lhcActivityStyle.countLimit){
        vm.lhcActivityPublishData.countLimit = 0;
      }

      //报名方式处理
      vm.lhcActivityPublishData.signUpRequiredFieldIds = [];
      angular.forEach(vm.lhcActivityStyle.signUpRequiredFieldIds,function (item){
        if(item.$checked || item.isDefault && item.name!="留言"){
          vm.lhcActivityPublishData.signUpRequiredFieldIds.push(item.id);
        }
      });

      //活动性质处理
      vm.lhcActivityPublishData.tagIds = [];
      angular.forEach(vm.lhcActivityStyle.tags,function (item) {
        if(item.$checked){
          vm.lhcActivityPublishData.tagIds.push(item.id);
        }
      });

      //活动时间处理
      vm.activeTimerDeal();

    };

    //活动时间处理
    vm.activeTimerDeal = function () {
      vm.lhcActivityPublishData.startTime = new Date(vm.lhcActivityPublishData.startTime).setSeconds(0);
      vm.lhcActivityPublishData.endTime = new Date(vm.lhcActivityPublishData.endTime).setSeconds(0);
      vm.lhcActivityPublishData.signUpDeadline = new Date(vm.lhcActivityPublishData.signUpDeadline).setSeconds(0);
      vm.lhcActivityPublishData.checkInStartTime = new Date(vm.lhcActivityPublishData.checkInStartTime).setSeconds(0);
      vm.lhcActivityPublishData.startTime = new Date(Math.floor(vm.lhcActivityPublishData.startTime/1000)*1000);
      vm.lhcActivityPublishData.endTime = new Date(Math.floor(vm.lhcActivityPublishData.endTime/1000)*1000);
      vm.lhcActivityPublishData.signUpDeadline = new Date(Math.floor(vm.lhcActivityPublishData.signUpDeadline/1000)*1000);
      vm.lhcActivityPublishData.checkInStartTime = new Date(Math.floor(vm.lhcActivityPublishData.checkInStartTime/1000)*1000);
      vm.lhcActivityPublishData.startTime = new Date(vm.lhcActivityPublishData.startTime).getTime();
      vm.lhcActivityPublishData.endTime = new Date(vm.lhcActivityPublishData.endTime).getTime();
      vm.lhcActivityPublishData.signUpDeadline = new Date(vm.lhcActivityPublishData.signUpDeadline).getTime();
      vm.lhcActivityPublishData.checkInStartTime = new Date(vm.lhcActivityPublishData.checkInStartTime).getTime();
      if(!vm.lhcActivityPublishData.offlineSignUp){//不支持
        vm.lhcActivityPublishData.checkInEndTime = vm.lhcActivityPublishData.endTime;
      }else{//支持
        vm.lhcActivityPublishData.checkInEndTime = vm.lhcActivityPublishData.endTime;
        vm.lhcActivityPublishData.signUpDeadline = vm.lhcActivityPublishData.endTime;
      }
    };

    //时间初始化
    vm.hstep = 1;
    vm.mstep = 1;
    vm.ismeridian = true;
    vm.toggleMode = function() {
      vm.ismeridian = ! vm.ismeridian;
    };

    vm.changed = function () {
      vm.lhcActivityPublishData.startTime = new Date(vm.lhcActivityPublishData.startTime);
      vm.lhcActivityPublishData.endTime = new Date(vm.lhcActivityPublishData.endTime);
      vm.lhcActivityPublishData.signUpDeadline = new Date(vm.lhcActivityPublishData.signUpDeadline);
      vm.lhcActivityPublishData.checkInStartTime = new Date(vm.lhcActivityPublishData.checkInStartTime);
      vm.lhcActivityPublishData.startTime.setHours(new Date(vm.startTime).getHours());
      vm.lhcActivityPublishData.startTime.setMinutes(new Date(vm.startTime).getMinutes());
      vm.lhcActivityPublishData.endTime.setHours(new Date(vm.endTime).getHours());
      vm.lhcActivityPublishData.endTime.setMinutes(new Date(vm.endTime).getMinutes());
      vm.lhcActivityPublishData.signUpDeadline.setHours(new Date(vm.signUpDeadline).getHours());
      vm.lhcActivityPublishData.signUpDeadline.setMinutes(new Date(vm.signUpDeadline).getMinutes());
      vm.lhcActivityPublishData.checkInStartTime.setHours(new Date(vm.checkInStartTime).getHours());
      vm.lhcActivityPublishData.checkInStartTime.setMinutes(new Date(vm.checkInStartTime).getMinutes());
      vm.activeTimerValidate();

    };

    //日期初始化
    vm.today = function() {
      vm.startDate = new Date();
      vm.endDate = new Date();
      vm.signUpDeadDate = new Date();
      vm.checkInStartDate = new Date();
    };
    vm.today();
    vm.clear = function() {
      vm.startDate = null;
      vm.endDate = null;
      vm.signUpDeadDate = null;
      vm.checkInStartDate = null;
    };
    vm.activeDateChange = function (){
      vm.lhcActivityPublishData.startTime = new Date(vm.lhcActivityPublishData.startTime);
      vm.lhcActivityPublishData.endTime = new Date(vm.lhcActivityPublishData.endTime);
      vm.lhcActivityPublishData.signUpDeadline = new Date(vm.lhcActivityPublishData.signUpDeadline);
      vm.lhcActivityPublishData.checkInStartTime = new Date(vm.lhcActivityPublishData.checkInStartTime);
      vm.lhcActivityPublishData.startTime.setFullYear(new Date(vm.startDate).getFullYear());
      vm.lhcActivityPublishData.startTime.setMonth(new Date(vm.startDate).getMonth());
      vm.lhcActivityPublishData.startTime.setDate(new Date(vm.startDate).getDate());
      vm.lhcActivityPublishData.endTime.setFullYear(new Date(vm.endDate).getFullYear());
      vm.lhcActivityPublishData.endTime.setMonth(new Date(vm.endDate).getMonth());
      vm.lhcActivityPublishData.endTime.setDate(new Date(vm.endDate).getDate());
      vm.lhcActivityPublishData.signUpDeadline.setFullYear(new Date(vm.signUpDeadDate).getFullYear());
      vm.lhcActivityPublishData.signUpDeadline.setMonth(new Date(vm.signUpDeadDate).getMonth());
      vm.lhcActivityPublishData.signUpDeadline.setDate(new Date(vm.signUpDeadDate).getDate());
      vm.lhcActivityPublishData.checkInStartTime.setFullYear(new Date(vm.checkInStartDate).getFullYear());
      vm.lhcActivityPublishData.checkInStartTime.setMonth(new Date(vm.checkInStartDate).getMonth());
      vm.lhcActivityPublishData.checkInStartTime.setDate(new Date(vm.checkInStartDate).getDate());
      vm.activeTimerValidate();
    };
    vm.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2050, 5, 22),
      minDate: new Date(2015, 5, 20),
      startingDay: 1
    };

    vm.startTimeOpen = function () {
      vm.startTimePopup.opened = true;
    };

    vm.endTimeOpen = function() {
      vm.endTimePopup.opened = true;
    };

    vm.signUpDeadlineOpen = function () {
      vm.signUpDeadlinePopup.opened = true;
    };

    vm.checkInStartTimeOpen = function () {
      vm.checkInStartTimePopup.opened = true;
    };

    vm.startTimePopup = {
      opened: false
    };

    vm.endTimePopup = {
      opened: false
    };

    vm.signUpDeadlinePopup = {
      opened: false
    };

    vm.checkInStartTimePopup = {
      opened: false
    };

    //tag活动性质样式处理
    vm.addErrorTag = function (tags) {
      var arr = [];
      angular.forEach(tags,function (item) {
        if(item.$checked){
          angular.forEach(angular.element('._active-form-item-tag'),function (inner) {
            $(inner).removeClass('_error');
          });
        }else{
          arr.push(1);
        }
      });
      if(arr.length>7){
        angular.forEach(angular.element('._active-form-item-tag'),function (inner) {
          $(inner).addClass('_error');
        });
      }
    };

    //封面图片验证样式处理
    vm.activePictureValid = function () {
      var result = true;
      if(vm.lhcActivityPublishData.coverUrl == ''){
        result = false;
      }else{
      }
      if(vm.lhcActivityPublishData.coverThumbUrl == ''){
        result = false;
      }else{
      }
      return result;
      /*if(vm.lhcActivityPublishData.discussQrCodeUrl == ''){
       angular.element('._active-discuss-picture').addClass('_error');
       }else{
       angular.element('._active-discuss-picture').removeClass('_error');
       }*/
    };
    vm.activePictureValidate = function () {
      var result = true;
      if(vm.lhcActivityPublishData.coverUrl == ''){
        angular.element('._active-big-picture').addClass('_error');
        result = false;
      }else{
        angular.element('._active-big-picture').removeClass('_error');
      }
      if(vm.lhcActivityPublishData.coverThumbUrl == ''){
        angular.element('._active-small-picture').addClass('_error');
        result = false;
      }else{
        angular.element('._active-small-picture').removeClass('_error');
      }
      return result;
      /*if(vm.lhcActivityPublishData.discussQrCodeUrl == ''){
        angular.element('._active-discuss-picture').addClass('_error');
      }else{
        angular.element('._active-discuss-picture').removeClass('_error');
      }*/
    };
    //活动详情验证
    vm.activeDetailValidate = function () {
      if(vm.lhcActivityPublishData.details == ''){
        angular.element('.simditor').addClass('_error');
      }else{
        angular.element('.simditor').removeClass('_error');
      }
    };

    //日期时间验证
    vm.activeTimerValidate = function () {
      var result = true;
      vm.lhcActivityPublishData.startTime = new Date(vm.lhcActivityPublishData.startTime);
      vm.lhcActivityPublishData.endTime = new Date(vm.lhcActivityPublishData.endTime);
      vm.lhcActivityPublishData.signUpDeadline = new Date(vm.lhcActivityPublishData.signUpDeadline);
      vm.lhcActivityPublishData.checkInStartTime = new Date(vm.lhcActivityPublishData.checkInStartTime);
      if(!vm.lhcActivityPublishData.offlineSignUp){
        if(vm.lhcActivityPublishData.startTime.getTime()<new Date().getTime()){
          vm.startTimeErrorMes = "活动开始时间不能早于当前时间";
          result = false;
        }else{
          vm.startTimeErrorMes = "";
        }
        if(vm.lhcActivityPublishData.endTime.getTime()<vm.lhcActivityPublishData.startTime.getTime()){
          vm.endTimeErrorMes = "活动结束时间不能早于活动开始时间";
          result = false;
        }else{
          vm.endTimeErrorMes = "";
        }
        if(vm.lhcActivityPublishData.signUpDeadline.getTime()>vm.lhcActivityPublishData.startTime){
          vm.signUpDeadlineErrorMes = "报名截止时间应早于活动开始时间";
          result = false;
        }else{
          if(vm.lhcActivityPublishData.signUpDeadline.getTime()>vm.lhcActivityPublishData.checkInStartTime.getTime()){
            vm.signUpDeadlineErrorMes = "报名截止时间应早于签到开始时间";
            result = false;
          }else{
            vm.signUpDeadlineErrorMes = "";
          }
        }
        if(vm.lhcActivityPublishData.checkInStartTime.getTime()>vm.lhcActivityPublishData.startTime.getTime()){
          vm.checkInStartTimeErrorMes = "签到开始时间应早于活动开始时间";
          result = false;
        }else{
          vm.checkInStartTimeErrorMes = "";
        }
      }else{
        if(vm.lhcActivityPublishData.startTime.getTime()<new Date().getTime()){
          vm.startTimeErrorMes = "活动开始时间不能早于当前时间";
          result = false;
        }else{
          vm.startTimeErrorMes = "";
        }
        if(vm.lhcActivityPublishData.endTime.getTime()<vm.lhcActivityPublishData.startTime.getTime()){
          vm.endTimeErrorMes = "活动结束时间不能早于活动开始时间";
          result = false;
        }else{
          vm.endTimeErrorMes = "";
        }
        if(vm.lhcActivityPublishData.checkInStartTime.getTime()>vm.lhcActivityPublishData.startTime.getTime()){
          vm.checkInStartTimeErrorMes = "签到开始时间应早于活动开始时间";
          result = false;
        }else{
          vm.checkInStartTimeErrorMes = "";
        }
      }
      return result;
    };

    vm.activeStyleDeal = function () {
      if(vm.lhcActivityPublishData.status == 'EDITING'){
        return '';
      }
      if(/create/.test($state.current.url)){
        vm.panelLeft = false;
        return '';
      }else{
        return 'marksActive';
      }
    }
  })
})();
