angular.module('istarcms').controller('OrganizationController', function ($scope, $rootScope, $state, OnboardingServices, $state) {
   /* $rootScope.setting.layout.pageWithoutHeader = true;
    $rootScope.setting.layout.paceTop = true;
    $rootScope.setting.layout.pageBgWhite = true;
*/
    $scope.doCreateUpdate = function () {
        var params = {
        	companyName:$scope.orgname,
            orgType:$scope.orgType,
            addressline1:$scope.addressline1,
            addressline2:$scope.addressline2,
            pincode:$scope.pincode,
            maxStudents:$scope.maxstudent
            
        };
        
        OnboardingServices.createOrganization(params).then(function(){
        	alert('created');
        })

    };
});