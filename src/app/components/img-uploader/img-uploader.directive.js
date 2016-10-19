(function() {
  angular.module('mp').directive('mpImgUploader', function(PATH, $uibModal, $timeout, Base, BaseService) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: PATH.componentsBase + 'img-uploader/img-uploader.html',
      scope: {
        ratio: '@',
        result: '=?'
      },
      link: function(scope, ele, attr) {
        scope.ratio = scope.ratio || 1;
        scope.width = scope.width || '100%';

        var fileInputEle = $(ele).find('#fileInput');

        var _openModal = function() {
          var modal = $uibModal.open({
            templateUrl: PATH.componentsBase + 'img-uploader/img-uploader-modal.html',
            windowClass: 'mp-img-uploader-modal',
            backdrop: 'static',
            controller: function($scope) {
              $scope.modal = modal;
              $scope.sourceImgObjUrl = scope.sourceImgObjUrl;
              $scope.confirm = function() {
                if ($scope.uploading) return;
                $scope.uploading = true;
                BaseService.showLoading();
                var resultCanvas = scope.cropperObj.cropper('getCroppedCanvas');
                resultCanvas.toBlob(function(blob) {
                  Base.upload(blob).then(function(res) {
                    scope.result = res.data.payload;
                    $scope.uploading = false;
                    BaseService.removeLoading();
                    $scope.modal.close();
                  }, function(err) {
                    BaseService.removeLoading();
                    TOASTR.error('图片上传失败');
                    $scope.uploading = false
                  });
                });
              };
            }
          });

          modal.rendered.then(function() {
            $timeout(function() {
              var sourceImgEle = $('.mp-img-uploader-modal #sourceImg');

              var prevFigureEle = $('.mp-img-uploader-modal #prevFigure');
              var prevImgEle = $('.mp-img-uploader-modal #prevImg');

              var scale;       //为了将裁剪区域图片放入预览区域，需要对原图进行缩放的比例
              var ratio = eval(scope.ratio);     //裁剪区域的宽高比
              scope.cropperObj = $(sourceImgEle).cropper({
                aspectRatio: ratio,
                build: function() {
                  /* 固定预览图区域的尺寸 */
                  $(prevFigureEle).width(scope.width);
                  $(prevFigureEle).height($(prevFigureEle).width() / ratio);
                },
                crop: function(e) {

                  var imageData = scope.cropperObj.cropper('getImageData');
                  scale = $(prevFigureEle).width() / e.width;

                  $(prevImgEle).css({
                    width: imageData.naturalWidth * scale,
                    marginLeft: -e.x * scale,
                    marginTop: -e.y * scale
                  });
                }
              });
            });
          });
        };

        $(fileInputEle).on('click', function() {
          this.value = '';
        });

        $(fileInputEle).on('change', function(e) {
          $timeout(function() {
            scope.file = e.target.files[0];

            if (scope.file.size > 3 * 1024 * 1024) TOASTR.error('图片大小不能超过3M');

            scope.sourceImgObjUrl = URL.createObjectURL(scope.file);
            _openModal();
          });
        });

        scope.pickImg = function() {
          $(fileInputEle).click();
        }
      }
    }
  });
})();
