istarcms.controller('appController', ['$rootScope', '$scope', 'RouteRules', '$state', function($rootScope, $scope, RouteRules, $state) {
    $scope.$on('$includeContentLoaded', function() {

    });
    $scope.$on('$viewContentLoaded', function() {

    });
    $scope.$on('$stateChangeStart', function(event, toState, toParams) {
        // reset layout setting
        //istar code
        RouteRules.validate('', toState.name).then(function (isValid) {
            if (!isValid) {
                console.log("State was not allowed!")
                event.preventDefault();
                if(toState.alternative){
                    $state.go(toState.alternative());
                }else{
                    $state.go('app.main.userHome');
                }
            }
        });



    });
    $scope.$on('$stateChangeSuccess', function() {

    });
    $scope.$on('$stateNotFound', function() {
    });
    $scope.$on('$stateChangeError', function() {
    });
}]);