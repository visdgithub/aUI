angular.module('istarcms').controller('ForgotResetController', function($scope, $stateParams, UserService, BackendService, $state) {
   var token = $stateParams.token;
   $scope.doResetPasswordSaviour= function(){
      var params = {
         password: $scope.password,
         istarToken: token
      }

      BackendService.doCommunication(BackendService.API.resetPassword, params, "GET").then(function (data) {
         var result = BackendService.parseBackendResponse(data);
         if (result.type == BackendService.toasterFriendlyCode.S) {
            alert("password reset successfully, click ok to goto login page");
            $state.go('member.login');
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