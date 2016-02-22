angular.module('istarcms').controller('adminProfileController', function($scope, UserService) {
    $scope.userProfileData = UserService.userProfileData;
});