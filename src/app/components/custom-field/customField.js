(function () {
  angular.module('mp')
    .directive('customField',customField);

    function customField (PATH, Base, API, $rootScope) {
      return {
        restrict: 'E',
        transclude: true,
        templateUrl: PATH.componentsBase + 'custom-field/customField.html',
        scope:{
          access: '@'
        },
        link: function (scope){
          //添加自定义字段
          var oid = $rootScope.getUser().id;
          scope.whetherShow = false;
          scope.deleteShow = false;
          scope.mes = {
            textName: '',
            radioName: '',
            radioInputValOne: '',
            radioInputValTwo: '',
            checkBoxName: '',
            numberName: '',
            selectName: '',
            selectOptions: [{name:''}]
          };
          scope.selectChange = function () {

          };
          //上传自定义字段
          scope.uploadMes = function () {
            var fieldType = scope.selected.value;
            var constraints = "{\'required\': true}";
            if(fieldType == 'TEXT'){
              Base.post(API.addSignUpField,{oid:oid},{name: scope.mes.textName,fieldType: fieldType,constraints:constraints}).then(function(){
                TOASTR.success('创建成功！');
              },function () {
                TOASTR.error('创建失败！');
              });
            }
          };
          //添加自定义字段弹出事件
          scope.chooseType = function (access) {
            if(access == 'add'){
              scope.whetherShow = true;
              scope.deleteShow = false;
            }
            if(access == 'delete'){
              scope.whetherShow = false;
              scope.deleteShow = true;
              Base.get(API.getSignUpFields,{id: oid},'').then(function (data) {
                scope._signUpRequiredFieldIds = data.data.payload;
              });
            }
          };
          //取消选择
          scope.cancelShow = function () {
            scope.whetherShow = !scope.whetherShow;
          };
          //菜单可选值
          scope.options = [
            {
              id: 1,
              name: '文本',
              value: 'TEXT'
            },
            {
              id: 2,
              name: '单选框',
              value: 'RADIO'
            },
            {
              id: 3,
              name: '多选框',
              value: 'CHECKBOX'
            },
            {
              id: 4,
              name: '数字',
              value: 'NUMBER'
            },
            {
              id: 5,
              name: '出生日期',
              value: 'DOB'
            },
            {
              id: 6,
              name: '下拉菜单',
              value: 'SELECT'
            }
          ];
          scope.selected = scope.options[0];

          //删除自定义字段
          scope.deleteFun = function (fid) {
            Base.post(API.deleteSignUpField,{oid:oid,fid:fid}).then(function () {
              TOASTR.success('成功删除！');
            }, function () {
              TOASTR.error('删除失败！');
            })
          };
          scope.exitDelete = function () {
            scope.deleteShow = false;
          };

        }
      }
    }

})();
