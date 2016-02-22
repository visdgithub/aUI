angular.module('istarcms').controller('RegistrationPageController', function ($scope, $rootScope, $state, BackendService, UserService, $state) {
    $rootScope.setting.layout.pageWithoutHeader = true;
    $rootScope.setting.layout.paceTop = true;
    $rootScope.setting.layout.pageBgWhite = true;

    $scope.doRegistration = function (form) {
        if (!form.$valid) {
            $('form[name="'+ form.$name +'"] *').tooltip('destroy');
            angular.forEach(form.$error, function(field) {
                angular.forEach(field, function(errorField) {
                    errorField.$setTouched();
                    var targetContainer = 'form[name="'+ form.$name +'"] [name="'+ errorField.$name +'"]';
                    var targetMessage = (errorField.$error.required) ? 'This is required' : '';
                    targetMessage = (errorField.$error.email) ? 'Invalid email' : targetMessage;
                    targetMessage = (errorField.$error.url) ? 'Invalid website url' : targetMessage;
                    targetMessage = (errorField.$error.number) ? 'Only number is allowed' : targetMessage;
                    targetMessage = (errorField.$name == 'alphabets') ? 'Only alphabets is allowed' : targetMessage;
                    targetMessage = (errorField.$error.minlength) ? 'You must provide at least 20 characters for this field' : targetMessage;
                    targetMessage = (errorField.$error.maxlength) ? 'You must not exceed the maximum of 200 characters for this field' : targetMessage;

                    $(targetContainer).first().tooltip({
                        placement: 'top',
                        trigger: 'normal',
                        title: targetMessage,
                        container: 'body',
                        animation: false
                    });
                    $(targetContainer).first().tooltip('show');
                });
            });
        }







        var params = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            password: $scope.password,
            mobile: $scope.phone,
            address_line1: $scope.address1,
            address_line2: $scope.address2,
            city: $scope.city,
            state: $scope.state,
            pincode: $scope.pincode,
            country: $scope.country,
            organisation:"Istar Skill Development"
        };

        BackendService.doCommunication(BackendService.API.nativeregister, params, "POST").then(function (data) {
            console.log(data);
        }, function (err) {
            alert(err);
        });
    };
});