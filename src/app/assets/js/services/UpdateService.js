angular.module('blockrApp').service('UpdateService', function ($log, $interval) {
  'ngInject';

  return {
    /**
     * @description
     * Starts the module.
     */
    start: function () {
      this.addEvents();
    },

    /**
     * @description
     * Add all listeners for the autoUpdate module.
     */
    addEvents: function () {
      autoUpdater.setFeedURL('');

      autoUpdater.on('update-available', function () {
        $log.info('[UpdateService] -> Update Available');
      });

      autoUpdater.on('update-downloaded', function (releaseName) {
        UPDATE_AVAILABLE = true;
      });

      autoUpdater.on('error', function (error) {
        $log.error('[UpdateService] -> Update Error', error);
      });

      autoUpdater.on('checking-for-update', function () {
        $log.info('[UpdateService] -> Checking for updates');
      });

      autoUpdater.on('update-not-available', function () {
        $log.info('[UpdateService] -> Update not available');
      });
    },

    /**
     * @description
     * Method to check for updates.
     */
    checkForUpdates: function () {
      autoUpdater.checkForUpdates();
    },

    /**
     * @description
     * Method to update the application.
     */
    updateApplication: function () {
      autoUpdater.quitAndInstall();
    }
  }

});
