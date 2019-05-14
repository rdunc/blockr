angular.module('blockrApp').controller('ProjectController', function ($log, $controller, $routeParams, $timeout, $location, ProjectService, UIService, UtilService) {
  'ngInject';

  let dialogShowing = null;
  let projectName = $routeParams.name;
  this.projectName = projectName;

  this.initScopes = function () {
    this.project = ProjectService.loadProject(projectName);
    this.projectItems = this.project[0].items;

    this.sortKey = 'created_at';
    this.reverse = !this.reverse;

    $log.info('[ProjectController] ProjectBuffer -  ', this.project);
  }

  this.extendControllers = function () {
    angular.extend(this, $controller('ItemController', {$scope: this}));
    angular.extend(this, $controller('AttributeController', {$scope: this}));
    angular.extend(this, $controller('EnchantmentController', {$scope: this}));
    angular.extend(this, $controller('FlagController', {$scope: this}));
    angular.extend(this, $controller('UIController', {$scope: this}));
  }

  this.closeProject = function () {
    $location.path('/');
  }

  this.showOpenProjectItemModal = function () {
    UIService.showModal('openProjectItem');
  }

  this.showCloseProjectModal = function () {
    UIService.showModal('closeProject');
  }

  this.showCloseItemModal = function () {
    UIService.showModal('closeItem');
  }

  this.clipboardEvent = function (e) {
    let self = this;

    self.clipboardSuccess = true;

    $timeout(function () {
      self.clipboardSuccess = false;
    }, 5000);
  }

  this.init = function () {
    $log.info('[Controller] - ProjectController Loaded');

    this.initScopes();
    this.extendControllers();
    this.removeModalBackdrop();
  }

  this.init();

});
