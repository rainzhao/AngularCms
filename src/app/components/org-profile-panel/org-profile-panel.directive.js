(function() {
  angular.module('mp').directive('mpOrgProfilePanel', function(PATH, API, Base, ORG_TYPE, $timeout, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: PATH.componentsBase + 'org-profile-panel/org-profile-panel.html',
      scope: {
        type: '@',
        success: '&'
      },
      link: function(scope, ele, attr) {

        scope.type = scope.type || 'register';

        scope.$isCreate = function() {
          return scope.type === 'register' || scope.type === 'create';
        };

        scope.$isModify = function() {
          return scope.type === 'modify';
        };

        $timeout(function() {
          scope.showEditor = true;   //simditor样式bug
        });

        /* 三级地址相关 */
        Base.get(API.geo, {id: 0}, null, true).then(function(res) {
          scope.allGeoLevel1 = res.data.payload;
        });
        scope.$watch(function() {
          return scope.formData.geoLevel1;
        }, function(geoLevel1) {
          if (!geoLevel1) return;
          delete scope.formData.geoLevel3;
          Base.get(API.geo, {id: geoLevel1}, null, true).then(function(res) {
            scope.allGeoLevel2 = res.data.payload;
          });
        });
        scope.$watch(function() {
          return scope.formData.geoLevel2;
        }, function(geoLevel2) {
          if (!geoLevel2) return;
          Base.get(API.geo, {id: geoLevel2}, null, true).then(function(res) {
            scope.allGeoLevel3 = res.data.payload;
          });
        });
        /* --- */

        scope.certifications = [];


        scope.formData = {
          $isSociety: function() {
            return scope.formData.orgType === ORG_TYPE.society;
          },
          $isCampus: function() {
            return scope.formData.orgType === ORG_TYPE.campus;
          },
          orgType: ORG_TYPE.campus
        };

        if ($rootScope.getUser()) {
          scope.formData.oid = $rootScope.getUser().id;
          scope.formData.orgType = $rootScope.getUser().orgType;
          scope.formData.name = $rootScope.getUser().orgName;
          scope.formData.logoUrl = $rootScope.getUser().logoUrl;
          scope.formData.campusName = $rootScope.getUser().campusName;
          scope.formData.personInChargeName = $rootScope.getUser().personInChargeName;
          scope.formData.succ = $rootScope.getUser().succ;
          scope.formData.geoLevel1 = $rootScope.getUser().geoLevel1 && $rootScope.getUser().geoLevel1.id;
          scope.formData.geoLevel2 = $rootScope.getUser().geoLevel2 && $rootScope.getUser().geoLevel2.id;
          scope.formData.geoLevel3 = $rootScope.getUser().geoLevel3 && $rootScope.getUser().geoLevel3.id;
          scope.formData.address = $rootScope.getUser().address;
          scope.formData.personInContactName = $rootScope.getUser().personInContactName;
          scope.formData.personInContactCellphone = +$rootScope.getUser().personInContactCellphone;
          scope.formData.email = $rootScope.getUser().email;
          scope.formData.details = $rootScope.getUser().details;
          scope.certifications = $rootScope.getUser().certificatedInfo;
        }

        scope.$watchCollection('certifications', function(certifications) {
          scope.formData.certificatedInfo = certifications.join(',');
          scope.formData.certificatedInfo = scope.formData.certificatedInfo.substr(0, scope.formData.certificatedInfo.length - 1);
          if (certifications[certifications.length - 1] !== '') {
            certifications.push('');
          }
        });

        scope.submit = function(form, formData) {
          if (form.$invalid) {
            TOASTR.warning('尚有信息未正确填写');
            return;
          }

          /** 避开后台参数不全错误 */
          formData.geoLevel3 = formData.geoLevel3 || '';
          if (formData.$isCampus()) {
            //formData.personInChargeName = '';
            formData.succ = '';
          }
          if (formData.$isSociety()) {
            formData.campusName = ''
          }

          console.log(formData);

          if (scope.$isCreate() || scope.$isModify()) {

            /** 校验手机验证码 */
            Base.post(API.verifyMessageCode, null, {cellphone: formData.personInContactCellphone, code: scope.verifyCode, type: 101}).then(function() {
              /** 校验通过，发送注册或修改请求 */
              Base.post(API.orgApply, null, formData).then(function(res) {
                if (typeof scope.success === 'function') {
                  scope.success({data: formData});
                }
              }, function(err) {
                console.log(err);
                TOASTR.error(err.message);
              });
            }, function() {
              TOASTR.error('验证码错误');
            });
          }
        };

      }
    }
  });
})();