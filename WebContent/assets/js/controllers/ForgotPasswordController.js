angular.module('istarcms').controller('ForgotPasswordController', function($scope, UserService, BackendService, $state) {
    $scope.doFogotPasswordSaviour = function () {
        var params = {
            email: $scope.usermail
        }

        BackendService.doCommunication(BackendService.API.forgotPassword, params, "GET").then(function (data) {
            var result = BackendService.parseBackendResponse(data);
            if (result.type == BackendService.toasterFriendlyCode.S) {
               $state.go('member.forgotreset',{"token": result.data})
            } else if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        }, function (err) {
            var result = BackendService.parseBackendResponse(err);
            if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        });
    }
});