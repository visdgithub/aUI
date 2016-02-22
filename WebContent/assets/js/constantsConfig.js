'use strict';

/**
 * Istar App Config constant
 */

istarcms.constant('ISTAR_CONFIG_CONSTANTS', {
    //*** Scripts
    scripts: {

        //*** Controllers
        'loginPageCtrl': 'assets/js/controllers/LoginPageController.js',
        'uHPCtrl': 'assets/js/controllers/adminProfileController.js',
        'aDCtrl': 'assets/js/controllers/adminDashboardController.js',        
        'headerCtrl':'assets/js/controllers/HeaderController.js',
        'forgotpwdctrl':"assets/js/controllers/ForgotPasswordController.js",
        "forgotrstctrl": "assets/js/controllers/ForgotResetController.js",
        'entlstctrl': "assets/js/controllers/EntityListController.js",
        'createOrgCtrl': 'assets/js/controllers/CreateOrganizationController.js',
        'editOrgCtrl': 'assets/js/controllers/EditOrganizationController.js',
        'crtusrctrl':   "assets/js/controllers/CreateUserController.js",
        'editusrctrl': "assets/js/controllers/EditUserController.js",
        //*** Services
        'bkndserv': 'assets/js/services/BackendServices.js',
        'apis': 'assets/js/services/APIs.js',

        'onbserv': "assets/js/services/OnboardingServices.js",
    },
    //css
    css: {
    	homepage: ['assets/css/pages/portfolio-v1.css'],
    	mainbase: ['assets/plugins/animate.css',
    	           'assets/plugins/line-icons/line-icons.css',
    	           'assets/plugins/font-awesome/css/font-awesome.min.css',
    	           'assets/plugins/owl-carousel/owl-carousel/owl.carousel.css']
    },
    //*** angularJS Modules
    modules: [{}]
});