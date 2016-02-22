angular.module('istarcms').controller('CreateOrganizationController', function ($scope, $rootScope, $state, OnboardingServices, $state) {
    $scope.createoredit = "Create";

    $scope.doCreateUpdate = function () {
        var params = {
            companyName:$scope.currentOrg.name,
            orgType:$scope.currentOrg.orgType,
            addressline1:$scope.currentOrg.address.addressline1,
            addressline2:$scope.currentOrg.address.addressline2,
            pincode:$scope.currentOrg.address.pincode,
            maxStudents:$scope.currentOrg.maxStudents
        };

        OnboardingServices.createOrganization(params).then(function(){
        });
    };
});