istarcms.controller('HeaderController', function($scope, $rootScope, $state, UserService) {
 $scope.doLogout = function () {
     UserService.doLogout().then(function (data) {
         $state.go('member.login');
     })
 }

 $scope.userProfileData = UserService.userProfileData;
});