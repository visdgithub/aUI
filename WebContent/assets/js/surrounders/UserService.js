/*User service- providing services for current user activities */


angular.module('istarcms').service('UserService', ['CookieManager', 'BackendService', '$q',
    function(CookieManager, BackendService, $q) {
        function serviceInstance() {
            var services = {
                getSession: getSession,
                setUserToken: setUserToken,
                doLogout: doLogout,
                setUserProfileInfo: setUserProfileInfo,
                userProfileData: null
            };

            var userToken = null;
            var userData = null;

            function getSession(){
                var t = CookieManager.getUserToken();
                if (t){
                    userToken = t;
                }
                return t;
            };

            function setUserToken(token){
                userToken = token;
                return CookieManager.saveUserToken(token);
            };

            
            function doLogout(){
                var t = CookieManager.getUserToken();
                var params = {
                    istarToken: t
                }
                var self = this;
                return BackendService.doCommunication(BackendService.API.nativeLogout, params, "GET").then(function(data){
                    CookieManager.deleteCookiesForLogout();
                    self.userProfileData = null;
                    return data;
                });
            };


            function setUserProfileInfo(){
                var savedUserProfileData = getUserProfileData();
                if (savedUserProfileData){
                    var defer = $q.defer();
                    this.userProfileData = savedUserProfileData;
                    CookieManager.saveUserProfileData(savedUserProfileData);
                    defer.resolve(savedUserProfileData);
                    return defer.promise;
                }else{
                    var t = CookieManager.getUserToken();
                    var params = {
                        istarToken: t
                    }
                    var self = this;
                    return BackendService.doCommunication(BackendService.API.userProfileInformation, params, "GET").then(function(data){
                        self.userProfileData = parseUserProfileData(data);
                        return self.userProfileData;
                    }).then(function(userProfileData){
                        return CookieManager.saveUserProfileData(userProfileData);
                    });
                }


            };

            function getUserProfileData(){
                if (this.userProfileData){
                    return this.userProfileData;
                }else if (CookieManager.getUserProfileData()){
                   return CookieManager.getUserProfileData();
                }else {
                    return null;
                }
            }

            function parseUserProfileData(data){
                return BackendService.parseBackendResponse(data).data;
            }

            return services;
        }

        return new serviceInstance();
    }
]);