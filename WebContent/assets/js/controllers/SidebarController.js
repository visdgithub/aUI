istarcms.controller('SidebarController', function($scope, $rootScope, $state, UserService) {
    App.initSidebar();

    $scope.userProfileData = UserService.userProfileData;
});