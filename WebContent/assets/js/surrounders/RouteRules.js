/*Service which authorize all routes */

angular.module('istarcms').service('RouteRules', ['UserService', '$q', function (userService, $q) {
    var serviceInstance = function () {

        //edit as per your app specific requirement
        var ROLES = {
            TRAINER: 'trainer',
            STUDENT: 'student'
        };

        var USERSTATE = {
            LOGGEDIN: 'LoggedIn',
            NOTLOGGED: 'NotLoggedIn'
        };

        var stateConfigurations = {
            'member.login': {
                rolesAllowed: [ROLES.TRAINER, ROLES.STUDENT],
                possible: [USERSTATE.NOTLOGGED]
            },
            'member.register': {
                rolesAllowed: [ROLES.TRAINER, ROLES.STUDENT],
                possible: [USERSTATE.NOTLOGGED]
            },
            'app.main.adminProfile': {
                rolesAllowed: [ROLES.TRAINER, ROLES.STUDENT],
                possible: [USERSTATE.LOGGEDIN]
            },
            'app.main.adminDashboard': {
                rolesAllowed: [ROLES.TRAINER, ROLES.STUDENT],
                possible: [USERSTATE.LOGGEDIN]
            },
            'app.main.manage.editOrg': {
                rolesAllowed: [ROLES.TRAINER, ROLES.STUDENT],
                possible: [USERSTATE.LOGGEDIN]
            },
            ' app.main.manage.createOrg': {
                rolesAllowed: [ROLES.TRAINER, ROLES.STUDENT],
                possible: [USERSTATE.LOGGEDIN]
            },
            'app.main.manage.editUser': {
                rolesAllowed: [ROLES.TRAINER, ROLES.STUDENT],
                possible: [USERSTATE.LOGGEDIN]
            },
            'app.main.manage.createUser': {
                rolesAllowed: [ROLES.TRAINER, ROLES.STUDENT],
                possible: [USERSTATE.LOGGEDIN]
            },  
            ' app.main.manage.orglist': {
                rolesAllowed: [ROLES.TRAINER, ROLES.STUDENT],
                possible: [USERSTATE.LOGGEDIN]
            },
            'app.main.manage.userlist': {
                rolesAllowed: [ROLES.TRAINER, ROLES.STUDENT],
                possible: [USERSTATE.LOGGEDIN]
            }
        }
//
        var services = {
            validate: routeChangeValidation
        };

        function routeChangeValidation(prevState, nextState) {
            var defer = $q.defer();
            var isLoggedIn = !userService.getSession() ? false : true;

            //var role = userService.getCurrentUserRoles();
            var stateRules = stateConfigurations[nextState];

            if (stateRules) {
                var loginCheck = false;
                if (isLoggedIn){
                    if ($.inArray( USERSTATE.LOGGEDIN,  stateRules.possible) > -1) {
                        loginCheck = true;
                    }else{
                        loginCheck = false;
                    }
                }else{
                    if ($.inArray( USERSTATE.NOTLOGGED,  stateRules.possible) > -1) {
                        loginCheck = true;
                    }else{
                        loginCheck = false;
                    }
                }

                var roleCheck = false;
                for (var i = 0; i < stateRules.rolesAllowed.length; i++){
                  if (stateRules.rolesAllowed[i] == ROLES.TRAINER){
                        roleCheck =  true;
                        defer.resolve(loginCheck && roleCheck);
                    }else if (stateRules.rolesAllowed[i] == ROLES.STUDENT){
                        roleCheck =  true;
                        defer.resolve(loginCheck && roleCheck);
                    }else{
                        roleCheck =  true;
                        defer.resolve(loginCheck && roleCheck);
                    }

                }


            } else {
                defer.resolve(true);
            }

            return defer.promise;

        }

        return services;
    };

    return new serviceInstance();
}]);