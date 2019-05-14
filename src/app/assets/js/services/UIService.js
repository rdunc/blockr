angular.module('blockrApp').service('UIService', function ($log, $timeout) {
  'ngInject';

  return {
    showGuideModal: function () {
      let self = this;

      $timeout(function () {
        self.showBackdrop();

        angular.element(document.querySelector('.modal-flex.info-guide')).addClass('show-modal');
      }, 100);
    },

    showNewProjectModal: function () {
      this.showBackdrop();

      angular.element(document.querySelector('.modal-flex.info-new-project')).addClass('show-modal');
    },

    showOpenProjectModal: function () {
      this.showBackdrop();

      angular.element(document.querySelector('.modal-flex.info-open-project')).addClass('show-modal');
    },

    showModal: function (name) {
      let self = this;

      switch (name) {
        case 'guide':
          $timeout(function () {
            self.showBackdrop();
            angular.element(document.querySelector('.modal-flex.info-guide')).addClass('show-modal');
          }, 100);
          break;
        case 'newProject':
          self.showBackdrop();
          angular.element(document.querySelector('.modal-flex.info-new-project')).addClass('show-modal');
          break;
        case 'openProject':
          self.showBackdrop();
          angular.element(document.querySelector('.modal-flex.info-open-project')).addClass('show-modal');
          break;
        case 'openProjectItem':
          self.showBackdrop();
          angular.element(document.querySelector('.modal-flex.info-open-project-item')).addClass('show-modal');
          break;
        case 'closeProject':
          self.showBackdrop();
          angular.element(document.querySelector('.modal-flex.info-close-project')).addClass('show-modal');
          break;
        case 'closeItem':
          self.showBackdrop();
          angular.element(document.querySelector('.modal-flex.info-close-item')).addClass('show-modal');
          break;
      }
    },

    /**
     * @description
     * Shows an error modal with the specified text in a textarea.
     *
     * @param {String} text The error that occured.
     */
    showErrorModal: function (text) {
      let self = this;

      $timeout(function () {
        angular.element(document.querySelector('.modal-flex-content')).append(
          '<textarea class="form-control color-black" cols="5" rows="5" readonly>' + text + '</textarea>'
        );

        self.showBackdrop();

        angular.element(document.querySelector('.modal-flex.error')).addClass('show-modal');
      }, 100);
    },

    /**
     * @description
     * Shows an modal backdrop.
     */
    showBackdrop: function () {
      angular.element(document.querySelector('body')).addClass('modal-open');
      angular.element(document.querySelector('body')).append('<div class="modal-backdrop"></div>');
    }
  }

});
