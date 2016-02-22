/*User service- providing services for current user activities */


angular.module('istarcms').service('CreateUserService', ['CookieManager', 'BackendService', '$q',
    function(CookieManager, BackendService, $q) {
        function serviceInstance() {
            var services = {
                createUser: createuser
            };

            function doLogout(){
            	var params = {
                    istarToken: t
                }
                var self = this;
                return BackendService.doCommunication(BackendService.API.createUser, params, "GET").then(function(data){
                   //TODO
                    return data;
                });
            };
        }
        return new serviceInstance();
    }
]);