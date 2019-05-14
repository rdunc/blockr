angular.module('blockrApp').controller('HomeController', function ($log, $location, IOService, UpdateService, UIService, ProjectService) {
  'ngInject';

  this.initScopes = function () {
    $log.info('[Controller] - HomeController Loaded');

    this.appVersion = appVersion;
    this.newProject = {};
    this.projects = [];

    this.sortKey = 'created_at';
    this.reverse = !this.reverse;
  }

  this.init = function () {
    this.initScopes();
    this.checkProjectsFolder();
    this.checkProjects();
    this.checkSettings();

    angular.element(document.querySelector('body')).removeClass('modal-open');
    angular.element(document.querySelector('.modal-backdrop')).remove();
  }

  this.openUrl = function (url) {
    shell.openExternal(url);
  }

  this.checkSettings = function () {
    let promise = IOService.fileExists(SETTINGS_FILE_PATH);

    promise.then(function (response) {
      var settingsBuffer = IOService.readFileJSON(SETTINGS_FILE_PATH);
      $log.info('[HomeController] SettingsBuffer - ', settingsBuffer[0]);

      if (settingsBuffer[0].showGuide) {
        UIService.showModal('guide');
      }
    }, function (reason) {
      $log.error('[Promise] - Rejected ', reason);

      let fileContents = [{'showGuide': true, 'appVersion': appVersion, 'recentProjects': []}];
      let promise = IOService.createFile(APPDATA_PATH + '\\settings.json', fileContents);

      promise.then(function (response) {
        UIService.showModal('guide');
      }, function (reason) {
        $log.error('[Promise] - Rejected ', reason);

        UIService.showErrorModal(reason);
      })
    })
  }

  this.checkProjectsFolder = function () {
    let promise = IOService.dirExists(APPDATA_PATH + '\\projects');

    promise.then(function (response) {

    }, function (reason) {
      $log.error('[Promise] - Rejected ', reason);

      let promise = IOService.createDir(APPDATA_PATH + '\\projects');
      promise.then(function (response) {}, function (reason) {
        $log.error('[Promise] - Rejected ', reason);

        UIService.showErrorModal(reason);
      })
    })
  }

  this.checkProjects = function () {
    let self = this;
    let promise = IOService.fileExists(PROJECTS_FILE_PATH);

    promise.then(function (response) {
      var projectsBuffer = IOService.readFileJSON(PROJECTS_FILE_PATH);
      $log.info('[HomeController] ProjectsBuffer - ', projectsBuffer[0]);

      self.projects = projectsBuffer;
    }, function (reason) {
      $log.error('[Promise] - Rejected ', reason);

      let promise = IOService.createFile(APPDATA_PATH + '\\projects.json', []);
      promise.then(function (response) {}, function (reason) {
        $log.error('[Promise] - Rejected ', reason);

        UIService.showErrorModal(reason);
      })
    })
  }

  this.createProject = function (formValid) {
    let self = this;

    if (formValid) {
      let projectName = this.newProject.name;
      let projectDesc = this.newProject.description;
      let promise = ProjectService.createProject(projectName, projectDesc);

      promise.then(function (response) {
        $log.info(response);

        self.loadProject(projectName);
      }, function (reason) {
        $log.error(reason);
      })
    }
  }

  this.loadProject = function (name) {
    let project = ProjectService.loadProject(name);
    $location.path('/project/' + project[0].name);
  }

  this.showNewProjectModal = function () {
    UIService.showModal('newProject');
  }

  this.showOpenProjectModal = function () {
    UIService.showModal('openProject');
  }

  this.init();

});
