/**
 * Created by vishaldaga
 */

angular.module('istarcms').constant('USER_TYPE', {
    STUDENT: "student",
    CONTENT_ADMIN: "contentadmin",
    CONTENT_CREATOR: "contentcreator",
    CONTENT_REVIEWER: "contentreviewer",
    CREATIVE_ADMIN: "creativeadmin",
    CREATIVE_CREATOR: "creativecreator",
    SUPER_ADMIN: "superadmin"
});

angular.module('istarcms').constant('ORG_TYPE', {
    COMPANY: "COMPANY",
    GOVERNMENT: "GOVERMENT_PROJECT",
    COLLEGE: "COLLEGE"
});

angular.module('istarcms').service('OnboardingServices', ['BackendService', '$q', 'USER_TYPE', 'ORG_TYPE', function (BackendService, $q, USER_TYPE, ORG_TYPE) {
    function serviceInstance() {
        var services = {
            userInfo: {},
            orgInfo: {},
            currentlyWorkingWith: {
                currentUser:null,
                currentOrg: null
            },
            createUser: createUser,
            createOrganization: createOrganization,
            createUserInOrganization: createUserInOrganization,
            updateUser: updateUser,
            updateOrganization: updateOrganization,
            setCurrentWorkingWith: setCurrentWorkingWith,
            setUserList: setUserList,
            listOfUsers: {},
            setOrganizationList: setOrganizationList,
            listOfOrganizations: {},
            USER_TYPE: USER_TYPE,
            ORG_TYPE: ORG_TYPE,
           /* setListOfUsersInOrganization: setListOfUsersInOrganization,
            getCurrentUserDetails: getCurrentUserDetails,
            getCurrentOrganizationDetails: getCurrentOrganizationDetails,


            deleteUser: deleteUser,
            deleteOrganization: deleteOrganization,

            addNewUser: addNewUser,
            getSpecificUserDetails: getSpecificUserDetails,
            getSpecificOrganizationDetails: getSpecificOrganizationDetails,

            setallUsersInOrganization: setallUsersInOrganization,*/

        };

        return services;

    };
    //TODO (VISHAL DAGA) order the function as per the service property order

    function createUser(type, params){
        if (!type){
            type = this.USER_TYPE.STUDENT;
        }

        var params = {
            usertype:type,
            email: params.email,
            fatherName: params.fathername,
            motherName: params.mothername,
            gender: params.gender,
            mobileNum: params.mobileNum,
            name: params.name,
            password: params.password,
            organization_id: params.organization_id,
            pincode: params.pincode,
            addressline1: params.address_line1,
            addressline2: params.address_line2
        }

        return BackendService.doCommunication(BackendService.API.createUser, params, "GET").then(function (data) {
            var result = BackendService.parseBackendResponse(data);
            if (result.type == BackendService.toasterFriendlyCode.S) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            } else if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        }, function(err){
            var result = BackendService.parseBackendResponse(err);
            if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        });
    };

    function createUserInOrganization(type, organizationID, params){
        if (!type){
            type = this.USER_TYPE.STUDENT;
        }

        var params = {
            usertype: type,
            email: params.email,
            fatherName: params.fathername,
            motherName: params.mothername,
            gender: params.gender,
            mobileNum: params.mobileNum,
            name: params.name,
            password: params.password,
            organization_id: organizationID,
            pincode: params.pincode,
            addressline1: params.address_line1,
            addressline2: params.address_line2
        }

        return BackendService.doCommunication(BackendService.API.createUser, params, "GET").then(function (data) {
            var result = BackendService.parseBackendResponse(data);
            if (result.type == BackendService.toasterFriendlyCode.S) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            } else if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        }, function(err){
            var result = BackendService.parseBackendResponse(err);
            if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        });
    };

    function createOrganization(params){
        if (params.orgType == this.ORG_TYPE.COMPANY){
            createCompanyOrganization(params);

        }else if (params.orgType  == this.ORG_TYPE.GOVERNMENT){
            createGovernmentOrganization(params);

        }else if (params.orgType  == this.ORG_TYPE.COLLEGE){
            createCollegeOrganization(params);
        }
    };

    function createCompanyOrganization(params){
        var params = {
            orgtype: params.orgType,
            maxstudent: params.maxStudents,
            orgname: params.companyName,
            addressline1: params.addressline1,
            addressline2: params.addressline2,
            pincode: params.pincode
        };

        return BackendService.doCommunication(BackendService.API.createCompanyOrganization, params, "GET").then(function (data) {
            var result = BackendService.parseBackendResponse(data);
            if (result.type == BackendService.toasterFriendlyCode.S) {
                alert("Created");
            } else if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        }, function(err){
            var result = BackendService.parseBackendResponse(err);
            if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        });
    };

    function createGovernmentOrganization(params){
        var params = {
            orgtype: params.orgType,
            maxstudent: params.maxStudents,
            orgname: params.companyName,
            addressline1: params.addressline1,
            addressline2: params.addressline2,
            pincode: params.pincode
        };

        return BackendService.doCommunication(BackendService.API.createGovernmentOrganization, params, "GET").then(function (data) {
            var result = BackendService.parseBackendResponse(data);
            if (result.type == BackendService.toasterFriendlyCode.S) {
                alert("Created");
            } else if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        }, function(err){
            var result = BackendService.parseBackendResponse(err);
            if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        });
    };

    function createCollegeOrganization(params){
        var params = {
            orgtype: params.orgType,
            maxstudent: params.maxStudents,
            orgname: params.companyName,
            addressline1: params.addressline1,
            addressline2: params.addressline2,
            pincode: params.pincode
        };

        return BackendService.doCommunication(BackendService.API.createCollegeOrganization, params, "GET").then(function (data) {
            var result = BackendService.parseBackendResponse(data);
            if (result.type == BackendService.toasterFriendlyCode.S) {
                alert("Created");
            } else if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        }, function(err){
            var result = BackendService.parseBackendResponse(err);
            if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        });
    };

    function setUserList(type, orgid){
        var params = {
            usertype: type
        };
        var self = this;
        return BackendService.doCommunication(BackendService.API.getUserList, params, "GET").then(function (data) {
            var result = BackendService.parseBackendResponse(data);
            if (result.type == BackendService.toasterFriendlyCode.S) {
                //alert(result.summaryMessages + " : " + result.detailedMessage);
                self.listOfUsers = result.data;
            } else if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        }, function(err){
            var result = BackendService.parseBackendResponse(err);
            if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        });
    };

    function setOrganizationList(type, orgid){
        var params = {
            orgtype: type
        };
        var self = this;
        return BackendService.doCommunication(BackendService.API.getOrganizationList, params, "GET").then(function (data) {
            var result = BackendService.parseBackendResponse(data);
            if (result.type == BackendService.toasterFriendlyCode.S) {
                //alert(result.summaryMessages + " : " + result.detailedMessage);
                self.listOfOrganizations = result.data;
            } else if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        }, function(err){
            var result = BackendService.parseBackendResponse(err);
            if (result.type == BackendService.toasterFriendlyCode.F) {
                alert(result.summaryMessages + " : " + result.detailedMessage);
            }
        });
    };

    function updateUser(userId){

    };

    function updateOrganization(orgId){

    };

    function setCurrentWorkingWith(orgID, userID){
        this.currentlyWorkingWith.currentOrg = orgID;
        this.currentlyWorkingWith.currentUser = userID;
    };

    return new serviceInstance();
}]);

