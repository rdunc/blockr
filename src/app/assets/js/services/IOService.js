angular.module('blockrApp').service('IOService', function ($log, $q) {
  'ngInject';

  return {
    /**
     * @description
     * Reads the specified file and returns it as a JSON object.
     *
     * @param {String} path The path to the file to be read and returned.
     *
     * @returns JSON Object
     */
    readFileJSON: function (path) {
      let fileBuffer = fs.readFileSync(path, 'utf8');

      try {
        let fileBufferJSON = angular.fromJson(fileBuffer);

        return fileBufferJSON;
      } catch (err) {
        $log.debug(err);
      }
    },

    /**
     * @description
     * Checks to see if the specified file exists.
     *
     * @param {String} path The path to the file to be checked.
     *
     * @returns Boolean or String
     */
    fileExists: function (path) {
      return $q(function (resolve, reject) {
        fs.stat(path, (err, stats) => {
          if (err) { reject(err); }

          if (typeof stats === 'undefined') {
            reject(false);
          } else {
            resolve(true);
          }
        })
      })
    },

    /**
     * @description
     * Checks to see if the specified directory exists.
     *
     * @param {String} path The path to the directory to be checked.
     *
     * @returns Boolean
     */
    dirExists: function (path) {
      return $q(function (resolve, reject) {
        fs.readdir(path, (err, files) => {
          if (err) { reject(err); }

          if (typeof files === 'undefined') {
            reject(false);
          } else {
            resolve(true);
          }
        })
      })
    },

    /**
     * @description
     * Creates or appends a file.
     *
     * @param {String} path The path for the file to be created in.
     * @param {String|Array} contents Contents to put in the file.
     *
     * @returns Promise
     */
    createFile: function (path, contents) {
      return $q(function (resolve, reject) {
        fs.open(path, 'w', (err, fd) => {
          if (err) { reject(err); }

          fs.writeFile(fd, angular.toJson(contents), (err) => {
            if (err) { reject(err); }

            fs.closeSync(fd);
            resolve(path + ' was successfully saved/changed');
          })
        })
      })
    },

    /**
     * @description
     * Removes a file.
     *
     * @param {String} path The path for the file to be created.
     *
     * @returns Promise
     */
    removeFile: function (path) {
      return $q(function (resolve, reject) {
        fs.unlink(path, (err) => {
          if (err) { reject(err); }

          resolve(path + ' was successfully deleted');
        })
      })
    },

    /**
     * @description
     * Creates a directory.
     *
     * @param {String} path The path to be created.
     *
     * @returns Promise
     */
    createDir: function (path) {
      return $q(function (resolve, reject) {
        fs.mkdir(path, (err) => {
          if (err) { reject(err); }

          resolve(path + ' directory was successfully created');
        })
      })
    },

    /**
     * @description
     * Removes a directory.
     *
     * @param {String} path The path to be removed.
     *
     * @returns Promise
     */
    removeDir: function (path) {
      return $q(function (resolve, reject) {
        fs.rmdir(path, (err) => {
          if (err) { reject(err); }

          resolve(path + ' directory was successfully removed');
        })
      })
    }
  }

});
