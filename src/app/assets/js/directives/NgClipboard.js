var MODULE_NAME = 'ngclipboard';
var angular, Clipboard;

angular.module(MODULE_NAME, []).directive('ngclipboard', function() {
  return {
    restrict: 'A',
    scope: {
        ngclipboardSuccess: '&',
        ngclipboardError: '&'
    },
    link: function(scope, element) {
      var clipboard = new Clipboard(element[0]);

      clipboard.on('success', function(e) {
        scope.$apply(function () {
          scope.ngclipboardSuccess({
            e: e
          });
        });
      });

      clipboard.on('error', function(e) {
        scope.$apply(function () {
          scope.ngclipboardError({
            e: e
          });
        });
      });
    }
  };
});
