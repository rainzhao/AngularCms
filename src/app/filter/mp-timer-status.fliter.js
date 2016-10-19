(function () {
  angular
    .module('mp')
    .filter('mpTimerStatusFilter',mpTimerStatusFilter);

    function mpTimerStatusFilter ($filter) {
      return function (value) {
        if($filter("date")(value,"HH")>=12){
          value = "下午";
        }else{
          value = "上午";
        }
        return value;
      }
    }
})();
