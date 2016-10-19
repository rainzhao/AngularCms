(function() {
  angular.module('mp').directive('mpCanvasLoginBg', function() {
    return {
      restrict: 'A',
      link: function(scope, ele) {
        var canvas = ele[0];
        var ctx = canvas.getContext("2d");

        window.addEventListener('resize', resizeCanvas, false);

        function resizeCanvas() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight - 4;

          drawStuff();
        }
        resizeCanvas();

        function drawStuff() {

        }
      }
    }
  })
})();