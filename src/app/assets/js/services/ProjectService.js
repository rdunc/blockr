angular.module('blockrApp').service('ProjectService', function ($log, $location, $q, IOService, UIService, UtilService) {
  'ngInject';

  let _itemId = null;
  let editingItem = false;

  return {
    /**
     * @description
     * Loads specified project's manifest file.
     *
     * @param {String} name The name of the project.
     *
     * @returns JSON Object
     */
    loadProject: function (name) {
      let _projectName = UtilService.stringTrimWindows(name);
      let fileContents = IOService.readFileJSON(APPDATA_PATH + '\\projects\\' + _projectName + '\\manifest.json');

      return fileContents;
    },

    loadProjectItem: function (projectName, itemName) {
      let _projectName = UtilService.stringTrimWindows(projectName);
      let fileContents = IOService.readFileJSON(APPDATA_PATH + '\\projects\\' + _projectName + '\\items\\' + itemName + '.json');

      return fileContents;
    },

    resetEdit: function () {
      editingItem = false;
    },

    setSaving: function () {
      editingItem = true;
    },

    /**
     * @description
     * Saves a project item.
     *
     * @param {Array} itemArray Array of all the info about the item and project.
     *
     * @returns Promise
     */
    saveProjectItem: function (itemArray) {
      let self = this;
      let projectItemId = itemArray.slug;
      let oldProjectItemName = itemArray.oldProjectItemName;
      let projectName = itemArray.projectName;
      let projectItem = itemArray.projectItem;
      let fileContents = IOService.readFileJSON(APPDATA_PATH + '\\projects\\' + projectName + '\\manifest.json');
      fileContents = angular.fromJson(fileContents);
      let _projectItems = fileContents[0].items;

      if (editingItem) {
        if (oldProjectItemName != projectItem.name) {
          _itemId = _projectItems.length - 1;
          _projectItems[_itemId].name = projectItem.name;
        }
      } else {
        _itemId = _projectItems.length;

        _projectItems.push({
          'id': projectItemId,
          'name': projectItem.name,
        });

        editingItem = true;
      }

      return $q(function (resolve, reject) {
        let promise = IOService.createFile(APPDATA_PATH + '\\projects\\' + projectName + '\\manifest.json', fileContents);
        promise.then(function (response) {
          $log.info('[Promise] - Resolved ', response);

          let promise = self.createItemManifest(itemArray);
          promise.then(function (response) {
            $log.info('[Promise] - Resolved ', response);

            resolve(true);
          }, function (reason) {
            reject(false);

            $log.error('[Promise] - Rejected ', reason);
            UIService.showErrorModal(reason);
          })
        }, function (reason) {
          reject(false);

          $log.error('[Promise] - Rejected ', reason);
          UIService.showErrorModal(reason);
        })
      })
    },

    /**
     * @description
     * Saves a project item manifest.
     *
     * @param {Array} itemArray Array of all the info about the item and project.
     *
     * @returns Promise
     */
    createItemManifest: function (itemArray) {
      let projectItemId = itemArray.slug;
      let projectName = itemArray.projectName;
      let projectItem = itemArray.projectItem;
      let projectRootItemType = itemArray.rootItemType;
      let attributeModifers = itemArray.attributeModifers;
      let enchantments = itemArray.enchantments;
      let unbreakableFlag = itemArray.unbreakableFlag;
      let hideFlags = itemArray.hideFlags;

      let fileContents = {
        'id': projectItemId,
        'item': projectItem,
        'rootItemType': projectRootItemType,
        'attributeModifers': attributeModifers,
        'ench': enchantments,
        'unbreakableFlag': unbreakableFlag,
        'hideFlags': hideFlags
      };

      return $q(function (resolve, reject) {
        let promise = IOService.createFile(APPDATA_PATH + '\\projects\\' + projectName + '\\items' + '\\' + projectItemId + '.json', fileContents);

        promise.then(function (response) {
          resolve(true);
        }, function (reason) {
          $log.error('[Promise] - Rejected ', reason);
          UIService.showErrorModal(reason);

          reject(false);
        })
      })
    },

    /**
     * @description
     * Creates a new project.
     *
     * @param {String} name The name of the project.
     * @param {String} description The description of the project.
     *
     * @returns Promise
     */
    createProject: function (name, description) {
      let self = this;

      return $q(function (resolve, reject) {
        let _projectName = UtilService.stringTrimWindows(name);

        $log.warn(_projectName);

        let fileContents = IOService.readFileJSON(APPDATA_PATH + '\\projects.json');
        fileContents = angular.fromJson(fileContents);
        if (typeof description === 'undefined') { description = null; }

        fileContents.push({
          'id': fileContents.length,
          'name': _projectName,
          'description': description,
          'created_at': new Date()
        });

        let promise = IOService.createFile(APPDATA_PATH + '\\projects.json', fileContents);
        promise.then(function (response) {

          let promise = self.createProjectDirectories(_projectName);
          promise.then(function (response) {

            let promise = self.createProjectManifest(_projectName, description);
            promise.then(function (response) {
              resolve(true);
            }, function (reason) {
              $log.error('[Promise] - Rejected ', reason);
              UIService.showErrorModal(reason);

              reject(false);
            })
          }, function (reason) {
            $log.error('[Promise] - Rejected ', reason);
            UIService.showErrorModal(reason);

            reject(false);
          })
        }, function (reason) {
          $log.error('[Promise] - Rejected ', reason);
          UIService.showErrorModal(reason);

          reject(false);
        })
      })
    },

    /**
     * @description
     * Creates the directories used for the project.
     *
     * @param {String} name The name of the project.
     *
     * @returns Promise
     */
    createProjectDirectories: function (name) {
      return $q(function (resolve, reject) {
        let promise = IOService.createDir(APPDATA_PATH + '\\projects\\' + name);

        promise.then(function (response) {
          let promise = IOService.createDir(APPDATA_PATH + '\\projects\\' + name + '\\items');

          promise.then(function (response) {
            resolve(true);
          }, function (reason) {
            $log.error('[Promise] - Rejected ', reason);
            UIService.showErrorModal(reason);

            reject(false);
          })
        }, function (reason) {
          $log.error('[Promise] - Rejected ', reason);
          UIService.showErrorModal(reason);

          reject(false);
        })
      })
    },

    /**
     * @description
     * Creates the project manifest.
     * The manifest holds an array of project info.
     *
     * @param {String} name The name of the project.
     * @param {String} description The description of the project.
     *
     * @returns Promise
     */
    createProjectManifest: function (name, description) {
      return $q(function (resolve, reject) {
        let project = [{
          'name': name,
          'description': description,
          'version': appVersion,
          'items': [],
          'created_at': new Date(),
          'updated_at': null
        }];

        let promise = IOService.createFile(APPDATA_PATH + '\\projects\\' + name + '\\manifest.json', project)
        promise.then(function (response) {
          resolve(true);
        }, function (reason) {
          $log.error('[Promise] - Rejected ', reason);
          UIService.showErrorModal(reason);

          reject(false);
        })
      })
    }
  }

});
