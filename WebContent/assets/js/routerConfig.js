istarcms.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'ISTAR_CONFIG_CONSTANTS',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, ISTAR_CONFIG_CONSTANTS) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: ISTAR_CONFIG_CONSTANTS.modules
        });


        $urlRouterProvider.otherwise('/app/main/adminDashboard');

        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: 'assets/views/app.html',
                abstract: true,
                resolve: {
                    b: ['UserService', function (UserService) {
                        return UserService.setUserProfileInfo();
                    }],
                    baseResolve: ['b', function (b) {
                        return angular.element(document.body).injector().invoke(loadSequence('headerCtrl')['deps'])
                    }]

                },
            })
            .state('app.main', {
                url: '/main',
                templateUrl: 'assets/views/maintemplate.html',
                data:{
                	css:  ['assets/plugins/animate.css',
            	           'assets/plugins/line-icons/line-icons.css',
            	           'assets/plugins/font-awesome/css/font-awesome.min.css',
            	           'assets/plugins/owl-carousel/owl-carousel/owl.carousel.css'
            	           ]
                },
                abstract: true
            })
            .state('app.main.manage', {
                url: '/manage',
                template: '<div ui-view></div>',
                abstract: true,
               /* data:{
                	css: ['assets/css/pages/portfolio-v1.css',
                	      'assets/css/pages/profile.css'                	     
                	      ]
                },*/
                resolve: {
                    commonResolve: ['baseResolve', function (baseResolve) {
                        return angular.element(document.body).injector().invoke(loadSequence('onbserv')['deps'])
                    }]
                },
            })
            .state('app.main.adminProfile', {
                url: '/profile',
                data: {pageTitle: 'Home'},
                templateUrl: 'assets/views/adminProfilePage.html',
                controller: 'adminProfileController',               
                resolve: {
                    b: ['baseResolve', function (baseResolve) {
                        return angular.element(document.body).injector().invoke(loadSequence('apis', 'bkndserv', 'uHPCtrl')['deps'])
                    }]
                },
                data:{
                	css: ['assets/css/pages/portfolio-v1.css',
                	      'assets/css/pages/profile.css',
                	      'assets/plugins/sky-forms-pro/skyforms/custom/custom-sky-forms.css',
                	      'assets/plugins/sky-forms-pro/skyforms/css/sky-forms.css',
                	      ]
                },
                alternative: function () {
                    return 'member.login';
                }
            })           
             .state('app.main.adminDashboard', {
                url: '/adminDashboard',
                data: {pageTitle: 'Dashboard'},
                templateUrl: 'assets/views/adminDashboardPage.html',
                controller: 'adminDashboardController',               
                resolve: {
                    b: ['baseResolve', function (baseResolve) {
                        return angular.element(document.body).injector().invoke(loadSequence('apis', 'bkndserv', 'aDCtrl')['deps'])
                    }]
                },
                data:{
                	css: ['assets/css/pages/portfolio-v1.css',
                	      'assets/css/pages/profile.css',
                	      'assets/plugins/sky-forms-pro/skyforms/custom/custom-sky-forms.css',
                	      'assets/plugins/sky-forms-pro/skyforms/css/sky-forms.css',
                	      ]
                },
                alternative: function () {
                    return 'member.login';
                }
            })
            .state('app.main.manage.userlist', {
                url: '/userlist',
                data: {pageTitle: 'userlist'},
                templateUrl: 'assets/views/userList.html',
                controller: 'EntityListController',
                resolve: {
                    a: ['commonResolve', 'OnboardingServices', function (commonResolve, OnboardingServices) {
                        return OnboardingServices.setUserList();
                    }],
                    b: ['a', function (a) {
                        return angular.element(document.body).injector().invoke(loadSequence('apis', 'bkndserv', 'entlstctrl')['deps'])
                    }]
                },
                alternative: function () {
                    return 'member.login';
                }
            })

            .state('app.main.manage.orglist', {
                url: '/orglist',
                data: {pageTitle: 'orglist'},
                templateUrl: 'assets/views/organizationList.html',
                controller: 'EntityListController',
                resolve: {
                    a: ['commonResolve', 'OnboardingServices', function (commonResolve, OnboardingServices) {
                        return OnboardingServices.setOrganizationList();
                    }],
                    b: ['a', function (a) {
                        return angular.element(document.body).injector().invoke(loadSequence('apis', 'bkndserv', 'entlstctrl')['deps'])
                    }]
                },
                alternative: function () {
                    return 'member.login';
                }
            })
            .state('app.main.manage.createUser', {
                url: '/createUser',
                templateUrl: 'assets/views/userForm.html',
                controller: 'CreateUserController',
                resolve: {
                    a: ['commonResolve', 'OnboardingServices', function (commonResolve, OnboardingServices) {
                        return;
                    }],
                    b: ['a', function (a) {
                        return angular.element(document.body).injector().invoke(loadSequence('apis', 'bkndserv', 'crtusrctrl')['deps'])
                    }]
                },
                alternative: function () {
                    return 'member.login';
                }
            })
            .state('app.main.manage.editUser', {
                url: '/editUser/:userdetails',
                templateUrl: 'assets/views/userForm.html',
                controller: 'EditUserController',
                resolve: {
                    a: ['commonResolve', 'OnboardingServices', function (commonResolve, OnboardingServices) {
                        return;
                    }],
                    b: ['a', function (a) {
                        return angular.element(document.body).injector().invoke(loadSequence('apis', 'bkndserv', 'editusrctrl')['deps'])
                    }]
                },
                alternative: function () {
                    return 'member.login';
                }
            })
            .state('app.main.manage.createOrg', {
                url: '/createOrg',
                data: {pageTitle: 'Create organization Page'},
                templateUrl: 'assets/views/organizationForm.html',
                controller: 'CreateOrganizationController',
                resolve: {
                    a: ['commonResolve', 'OnboardingServices', function (commonResolve, OnboardingServices) {
                        return;
                    }],
                    b: ['a', function (a) {
                        return angular.element(document.body).injector().invoke(loadSequence('apis', 'bkndserv', 'createOrgCtrl')['deps'])
                    }]
                },
                alternative: function () {
                    return 'member.login';
                }
            })
            .state('app.main.manage.editOrg', {
                url: '/editOrg/:orgdetails',
                data: {pageTitle: 'Edit organization Page'},
                templateUrl: 'assets/views/organizationForm.html',
                controller: 'EditOrganizationController',
                resolve: {
                    a: ['commonResolve', 'OnboardingServices', function (commonResolve, OnboardingServices) {
                        return;
                    }],
                    b: ['a', function (a) {
                        return angular.element(document.body).injector().invoke(loadSequence('apis', 'bkndserv', 'editOrgCtrl')['deps'])
                    }]
                },
                alternative: function () {
                    return 'member.login';
                }
            })
            .state('error', {
                url: '/error',
                data: {pageTitle: '404 Error'},
                templateUrl: 'views/extra_404_error.html'
            })
            .state('member', {
                url: '/member',
                templateUrl: 'assets/views/front.html',
                abstract: true,
                //resolve: {
                //    baseResolve: function() {
                //        return angular.element(document.body).injector().invoke(loadSequence('loginPageCtrl')['deps'])
                //    }
                //
                //}
            })

            .state('member.login', {
                url: '/login',
                data: {pageTitle: 'Login Page'},
                templateUrl: 'assets/views/loginPage.html',
                controller: 'LoginPageController',
                resolve: loadSequence('apis', 'bkndserv', 'loginPageCtrl')
            })
            .state('member.register', {
                url: '/register',
                data: {pageTitle: 'Registration'},
                templateUrl: 'assets/views/register.html'
            })

            .state('member.forgotpassword', {
                url: '/forgotpassword',
                controller: 'ForgotPasswordController',
                data: {pageTitle: 'Forgot Password'},
                templateUrl: 'assets/views/forgotPassword.html',
                resolve: loadSequence('forgotpwdctrl')
            })
            .state('member.forgotreset', {
                url: '/resetpassword:token',
                controller: 'ForgotResetController',
                data: {pageTitle: 'Reset Password'},
                templateUrl: 'assets/views/forgotReset.html',
                resolve: loadSequence('forgotrstctrl')
            })

            .state('app.helper', {
                url: '/helper',
                template: '<div ui-view></div>',
                abstract: true
            })

            .state('app.helper.css', {
                url: '/css',
                data: {pageTitle: 'Predefined CSS Classes'},
                templateUrl: 'views/helper_css.html'
            });


        function loadSequence() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q',
                    function ($ocLL, $q) {
                        var promise = $q.when(1);
                        for (var i = 0, len = _args.length; i < len; i++) {
                            promise = promiseThen(_args[i]);
                        }
                        return promise;

                        function promiseThen(_arg) {
                            if (typeof _arg == 'function')
                                return promise.then(_arg);
                            else
                                return promise.then(function () {
                                    var nowLoad = requiredData(_arg);
                                    if (!nowLoad)
                                        return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                    return $ocLL.load(nowLoad);
                                });
                        }

                        function requiredData(name) {
                            if (ISTAR_CONFIG_CONSTANTS.modules)
                                for (var m in ISTAR_CONFIG_CONSTANTS.modules)
                                    if (ISTAR_CONFIG_CONSTANTS.modules[m].name && ISTAR_CONFIG_CONSTANTS.modules[m].name === name)
                                        return ISTAR_CONFIG_CONSTANTS.modules[m];
                            return ISTAR_CONFIG_CONSTANTS.scripts && ISTAR_CONFIG_CONSTANTS.scripts[name];
                        }
                    }
                ]
            };
        }
    }]);