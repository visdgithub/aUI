angular.module('istarcms').controller('EditOrganizationController', function ($scope, OnboardingServices, $stateParams) {
    $scope.createoredit = "Edit";

    $scope.currentOrg = JSON.parse($stateParams.orgdetails);

    $scope.doCreateUpdate = function () {
        /*var params = {
            companyName:$scope.orgname,
            orgType:$scope.orgType,
            addressline1:$scope.addressline1,
            addressline2:$scope.addressline2,
            pincode:$scope.pincode,
            maxStudents:$scope.maxstudent

        };

        OnboardingServices.createOrganization(params).then(function(){
            alert('created');
        })*/

        alert('wired');

    };
});