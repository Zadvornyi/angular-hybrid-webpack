function AhwErrorCtrl ($scope, $rootScope, $state, $stateParams) {
    "use strict";
    let ahwError = this;

    ahwError.status = $state.params.errorStatus;

    if ($stateParams.errorObj && ($stateParams.errorObj.message || ($stateParams.errorObj.data && $stateParams.errorObj.data.error) || $stateParams.errorObj.statusText)) {
        ahwError.message = $stateParams.errorObj.message || $stateParams.errorObj.data.error || $stateParams.errorObj.statusText;
    } else {
        ahwError.message = 'We can’t find page you’re looking for';
    }

    return ahwError;
};

AhwErrorCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams'];

export default (ngModule) => {
    return ngModule.controller('AhwErrorCtrl', AhwErrorCtrl);
}
