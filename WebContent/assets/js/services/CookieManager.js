//A service that is to communication with browser cookies and manage them


angular.module('istarcms').service('CookieManager',['$q', '$cookieStore', 'findInJSON', function($q, $cookies, findInJSON){
    var serviceInstance = function(){
        var ISTAR_USER_TOKEN_KEY = "itkn";
        var OTHER_ISTAR_USER_INFO = "ioi";
        var services = {
            saveUserToken: saveUserToken,
            getUserToken: getUserToken,
            putData: putData,
            getData: getData,
            saveUserProfileData: saveUserProfileData,
            getUserProfileData: getUserProfileData,
            deleteCookiesForLogout: deleteCookiesForLogout

        };

        function saveUserToken(token){
            //should return a promise
            var defer = $q.defer();
            $cookies.put(ISTAR_USER_TOKEN_KEY, token);
            defer.resolve(token);
            return defer.promise;
        };

        function getUserToken(){
            return $cookies.get(ISTAR_USER_TOKEN_KEY);
        };

        function deleteUserToken(){
            $cookies.remove(ISTAR_USER_TOKEN_KEY);
            return;
        }

        function putData(data){
            //should return a promise
            var defer = $q.defer();
            $cookies.put(ISTAR_USER_TOKEN_KEY, data);
            defer.resolve(data);
            return defer.promise;
        };

        function getData(key){
            var data = [];
            if ($cookies.get(ISTAR_USER_TOKEN_KEY) instanceof Object) {
                var cookieData = JSON.parse(JSON.stringify($cookies.get(ISTAR_USER_TOKEN_KEY)));
                data = findInJSON.getValues(cookieData, key);
            }
            return data;
        };

        function saveUserProfileData(userProfileData){
            var defer = $q.defer();
            $cookies.put(OTHER_ISTAR_USER_INFO, userProfileData);
            defer.resolve(userProfileData);
            return defer.promise;
        };

        function getUserProfileData(){
            return $cookies.get(OTHER_ISTAR_USER_INFO);
        };

        function deleteUserProfileData(){
            $cookies.remove(OTHER_ISTAR_USER_INFO);
            return;
        }

        function deleteCookiesForLogout(){
            deleteUserToken();
            deleteUserProfileData();
        }

        return services;
    };

    return new serviceInstance();

}]);