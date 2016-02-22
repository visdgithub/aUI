angular.module('istarcms').controller('LoginPageController', function ($scope, $rootScope, $state, BackendService, UserService, $state) {
   /* $rootScope.setting.layout.pageWithoutHeader = true;
    $rootScope.setting.layout.paceTop = true;
    $rootScope.setting.layout.pageBgWhite = true;
*/
    $scope.doLogin = function () {
        var params = {
            email: $scope.useremail,
            password: $scope.userpassword,
            remember: 'on'
        };

        BackendService.doCommunication(BackendService.API.nativeLogin, params, "GET").then(function (data) {
            var result = BackendService.parseBackendResponse(data);
            if (result.type == BackendService.toasterFriendlyCode.S) {
                UserService.setUserToken(result.data.token).then(function (data) {
                    UserService.setUserProfileInfo().then(function (userData) {
                        $state.go('app.main.adminDashboard');
                    });
                });
            } else if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        }, function (err) {
            var result = BackendService.parseBackendResponse(err);
            if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        });

    };
});