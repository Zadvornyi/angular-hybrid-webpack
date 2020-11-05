function AhwAppCtrl($scope, $state, $log, $window, $timeout, $rootScope) {
    var ahwApp = this;

    $rootScope.buildHash = HASH;
    $rootScope.appENV = ENV;

    return ahwApp;
};

AhwAppCtrl.$inject = ['$scope', '$state', '$log', '$window', '$timeout', '$rootScope'];

export default (ngModule) => {
    ngModule.controller('AhwAppCtrl', AhwAppCtrl);
}
