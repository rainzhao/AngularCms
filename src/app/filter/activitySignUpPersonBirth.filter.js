(function () {
  angular
    .module('mp')
    .filter('activitySignUpPersonBirthFilter',activitySignUpPersonBirthFilter);

    function activitySignUpPersonBirthFilter () {
      return function (value,newval) {
        var year = value.substring(0,4);
        var month = value.substring(4,6);
        newval = year + '/' + month ;
        return newval;
      }
    }
})();
