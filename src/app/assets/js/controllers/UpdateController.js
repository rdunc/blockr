angular.module('blockrApp').controller('UpdateController', function ($log, $interval, $scope, UpdateService) {
  'ngInject';

  var updatePromise = null;
  var updateAvailablePromise = null;

  this.initScopes = function () {
    $log.info('[Controller] - UpdateController Loaded');

    this.updateCount = 0;

    if (UPDATE_AVAILABLE) {
      this.showUpdateAlert = true;
    } else {
      this.showUpdateAlert = false;
    }
  }

  this.init = function () {
    this.initScopes();

    // Start the Update Service
    UpdateService.start();
    this.updateAvailableLoop();
    this.updateLoop();
  }

  $scope.$on('$destroy', function () {
    $interval.cancel(updatePromise);
    $interval.cancel(updateAvailablePromise);
  });

  this.updateAvailableLoop = function () {
    let self = this;

    autoUpdater.checkForUpdates();

    updateAvailablePromise = $interval(function () {
      $log.info('[UpdateController] - Alert -> ', self.showUpdateAlert);

      if (UPDATE_AVAILABLE) {
        self.showUpdateAlert = true;
        $interval.cancel(updateAvailablePromise);
      }
    }, 30000);
  }

  this.updateLoop = function () {
    let self = this;

    updatePromise = $interval(function () {
      $log.info('[UpdateController] - UpdateCount -> ', self.updateCount);

      if (self.updateCount < 10) {
        if (UPDATE_AVAILABLE) {
          self.showUpdateAlert = true;
        } else {
          $log.info('[UpdateService] - Checking for updates...');

          self.updateCount += 1;
          autoUpdater.checkForUpdates();
        }
      } else {
        $interval.cancel(updatePromise);
      }
    }, UPDATE_TIME_INTERVAL);
  }

  this.installUpdate = function () {
    autoUpdater.quitAndInstall();
  }

  this.init();

});
