angular.module('istarcms').controller('EntityListController', function ($scope, OnboardingServices, $state) {
    $scope.listOfUser = OnboardingServices.listOfUsers;
    $scope.listOfOrgs = OnboardingServices.listOfOrganizations;

    $scope.handleUserListEdit = function(index){
        var user = $scope.listOfUser[index];
        $state.go('app.main.manage.editUser', {
            userdetails: JSON.stringify(user)
        });

    }

    $scope.handleOrgListEdit = function(index){
        var org = $scope.listOfOrgs[index];
        $state.go('app.main.manage.editOrg', {
            orgdetails: JSON.stringify(org)
        });

    }


});