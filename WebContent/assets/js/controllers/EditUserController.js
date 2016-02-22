angular.module('istarcms').controller('EditUserController', function ($scope, $stateParams) {

   $scope.createofedit = "Edit";

   if ($stateParams.userdetails){
      $scope.curruser = JSON.parse($stateParams.userdetails);
   }


    /*email: "-999020703Deepti@istarindia.com"
    gender: "FEMALE"
    id: 9
    isVerified: null
    istarAuthorizationToken: null
    mobile: 9876543218
    name: "Deepti"
    password: "test123"
    tokenExpired: null
    tokenVerified: null
    userType: "CONTENT_CREATOR"*/
});
