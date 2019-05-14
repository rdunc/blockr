angular.module('blockrApp').service('UtilService', function ($log) {
  'ngInject';

  return {
    /**
     * @description
     * Removes line breaks, tabs, spaces, symbols, and everything
     * else to make a clean string.
     *
     * @param {String} stringVal String to trim.
     *
     * @returns String
     */
    stringTrim: function (stringVal) {
      let regEx = stringVal.replace(/(\r\n|\r|\n)/g, '').replace(/\t/g, '').replace(/ /g, '').replace(/[^a-zA-Z0-9]/g, '');

      return regEx;
    },

    stringTrimWindows: function (stringVal) {
      let regEx = stringVal.replace(/[\/\\#,+()$~%"`:;*?<>{}|^!@$']/g, '');

      return regEx;
    },

    getArrayIndexByValue: function (arr, key, value) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] === value) {
          return i;
        }
      }
      return -1;
    },

    arrayValueExist: function (arr, key, value) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] === value) {
          return true;
        }
      }

      return false;
    },

    generateNumberRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateSlug: function () {
      return ('000000' + (Math.random() * Math.pow(36, 6) << 0).toString(36)).slice(-6);
    },

    makeArrayReviewable: function (arr) {
      if (typeof arr === 'undefined') { return; }

      let tempArr = angular.toJson(arr);
      tempArr = tempArr.replace(/"(\w+)"\s*:/g, '$1:');

      return tempArr;
    }
  }

});
