angular.module('blockrApp').controller('UIController', function ($log, IOService, UIService) {
  'ngInject';

  this.sidebarCurrentTab = 1;

  this.sidebarChangeTab = function (id) {
    let self = this;

    self.sidebarCurrentTab = id;
  }

  this.removeModalBackdrop = function () {
    angular.element(document.querySelector('body')).removeClass('modal-open');
    angular.element(document.querySelector('.modal-backdrop')).remove();
  }

  this.submitReport = function (errorText) {
    $log.warn(errorText);
  }

  this.closeModal = function () {
    let self = this;

    angular.element(document.querySelector('.modal-flex.info-guide')).removeClass('show-modal');
    angular.element(document.querySelector('.modal-flex.info-new-project')).removeClass('show-modal');
    angular.element(document.querySelector('.modal-flex.info-open-project')).removeClass('show-modal');
    angular.element(document.querySelector('.modal-flex.info-close-project')).removeClass('show-modal');
    angular.element(document.querySelector('.modal-flex.info-close-item')).removeClass('show-modal');
    angular.element(document.querySelector('.modal-flex')).removeClass('show-modal');

    self.removeModalBackdrop();
  }

  this.closeGuide = function () {
    let self = this;
    let settingsBuffer = IOService.readFileJSON(SETTINGS_FILE_PATH);

    // Change showGuide to false.
    settingsBuffer[0].showGuide = false;

    $log.info('[UIController] SettingsBuffer - ', settingsBuffer[0]);

    let promise = IOService.createFile(APPDATA_PATH + '\\settings.json', settingsBuffer);
    promise.then(function (response) {
      angular.element(document.querySelector('.modal-flex.info-guide')).removeClass('show-modal');
    }, function (reason) {
      $log.error('[Promise] - Rejected ', reason);

      UIService.showErrorModal(reason);
    })

    self.removeModalBackdrop();
  }

});
