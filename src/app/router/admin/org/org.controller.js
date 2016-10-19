(function() {
  angular.module('mp').controller('AdminOrgController', function() {
    var vm = this;
    vm.doCheck = function(org) {
      console.log(org);
    };
  });
})();