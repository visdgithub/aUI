//credit: https://github.com/meni181818/simpleCloneJS/blob/master/renameProperties.js

angular.module('istarcms').factory('renameProperties', function () {
    var utilities = {
        rename: function (sourceObj, replaceList, destObj) {
            destObj = destObj || {};
            // for each property in source object
            each(sourceObj, function (key) {
                // if the property really exist
                if (sourceObj.hasOwnProperty(key)) {

                    // if the child key is array
                    if (sourceObj[key] instanceof Array) {
                        // if it in the replace List (as property)
                        if (replaceList[key]) {
                            var newName = replaceList[key];
                            destObj[newName] = [];
                            // send it to replaceAttrNames() function (recursively)
                            utilities.rename(sourceObj[key], replaceList, destObj[newName]);

                            // if its NOT in the replace List (as property)
                        } else if (!replaceList[key]) {
                            destObj[key] = [];
                            utilities.rename(sourceObj[key], replaceList, destObj[key]);
                        }

                        // if the child key is object
                    } else if (typeof sourceObj[key] === 'object') {
                        // if it in the replace List (as property)
                        if (replaceList[key]) {
                            var newName = replaceList[key];
                            // create new property in the destObj named as the new name
                            destObj[newName] = {};
                            // send it to replaceAttrNames() function (recursively)
                            utilities.rename(sourceObj[key], replaceList, destObj[newName]);

                            // if its NOT in the replace List (as property)
                        } else if (!replaceList[key]) {
                            destObj[key] = {};
                            utilities.rename(sourceObj[key], replaceList, destObj[key]);
                        }

                        // if the child key is NOT object and NOT Array
                    } else {
                        // if it in the replace List (as property)
                        if (replaceList[key]) {
                            var newName = replaceList[key];
                            destObj[newName] = sourceObj[key];
                            // if its NOT in the replace List (as property)
                        } else if (!replaceList[key]) {
                            destObj[key] = sourceObj[key];
                        }
                    }

                }
            });

            return destObj;
        }



    }
    function each(objOrArr, callBack) {
// if we got Array
        if(objOrArr instanceof Array) {
            for(var i = 0; i < objOrArr.length; i++) {
                callBack.call(this, i);
            }
// if we got an Object
        } else if(typeof objOrArr === 'object') {
            for(var prop in objOrArr) {
// if the property really exist
                if(objOrArr.hasOwnProperty(prop)) {
                    callBack.call(this, prop);
                }
            }
        }
    }
    return utilities;
});
