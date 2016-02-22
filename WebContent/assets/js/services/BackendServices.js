//A service that is to do all backend communication

angular.module('istarcms').service('BackendService', ['$log', '$http', '$location', 'APP_API', '$rootScope',
    function($log, $http, $location, APP_API, $rootScope) {
        function serviceInstance() {
            var backendOperations = {
                doCommunication: doCommunication,
                parseBackendResponse: parseBackendResponse,
                redirect: redirect,
                API: APP_API,
                toasterFriendlyCode: {
                    S: 'success',
                    F: 'error',
                    I: 'info'
                }
            };

            var HOST_CONFIG = {
                hostName: "http://localhost", // 'http://192.168.1.100',
                port: "8080"
            };

            //var HOST_CONFIG = {
            //    hostName: $location.$$protocol + "://" + $location.$$host,
            //    port: "8080"
            //};

            console.log(HOST_CONFIG);

            function doCommunication(API, params, method) {
                return callPromise(API, params, method);
            }

            function redirect(location, host) {
                if (!host) {
                    host = HOST_CONFIG.hostName + ":" + HOST_CONFIG.port;
                }
                window.location.href = host + "/" + location;
            };

            function callPromise(api, params, method) {
                var host = HOST_CONFIG.hostName + ":" + HOST_CONFIG.port;

                if (method != 'POST') {
                    var trailingString = "";
                    if (!params) {
                        $log.debug("calling: " + host + "/" + api);
                        return $http.get(host + "/" + api);
                    } else {
                        trailingString = trailingString + "?";
                        var paramsKeys = Object.keys(params);
                        for (var i = 0; i < paramsKeys.length; i++) {
                            trailingString = trailingString + paramsKeys[i] + "=" + params[paramsKeys[i]];
                            if (i + 1 != paramsKeys.length) {
                                trailingString = trailingString + "&"
                            }
                        }
                        $log.debug("calling: " + host + "/" + api + trailingString);
                        return $http.get(host + "/" + api + trailingString);
                    }
                } else if (method == 'POST') {
                    var url = host + "/" + api;
                    var data = {};
                    if (!params) {
                        $log.debug("calling: " + host + "/" + api);
                        return $http.post(url);
                    } else {
                        var paramsKeys = Object.keys(params);
                        for (var i = 0; i < paramsKeys.length; i++) {
                            data[paramsKeys[i]] = params[paramsKeys[i]];
                        }
                        $log.debug("calling: " + host + "/" + api);
                        return $http.post(url, data);
                    }
                }

            };

            function parseBackendResponse(response) {
                var data = response.data;
                var result = {
                    type: null,
                    data: null,
                    summaryMessages: null,
                    detailedMessage: null
                };
                if (data && data.statusCode && data.errorMessage && data.payload) {
                    if (data.errorMessage == 'NO_ERROR'){
                        result.type = this.toasterFriendlyCode.S;
                        result.data = data.payload;
                    }else{
                        result.type = this.toasterFriendlyCode.F;
                        result.data = data.payload;
                        result.summaryMessages = data.errorMessage;
                        result.detailedMessage = data.payload.message;
                    }

                } else {
                    result.type = this.toasterFriendlyCode.F;
                    result.summaryMessages = "Oh Snap!";
                    result.detailedMessage = "Unexpected Error";
                }

                return result;
            }

            return backendOperations;
        }

        return new serviceInstance();

    }
]);
