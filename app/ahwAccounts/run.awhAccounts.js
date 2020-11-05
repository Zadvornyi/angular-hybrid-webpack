function runApps ($rootScope, $templateCache, $state, $stateParams, $location) {
  "use strict";
}

runApps.$inject = ['$rootScope', '$templateCache', '$state', '$stateParams', '$location'];

export default (ngModule) => ngModule.run(runApps)
