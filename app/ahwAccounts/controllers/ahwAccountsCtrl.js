function AhwAccountsCtrl($scope, $rootScope, $state, $log, $uibModal, ahwAccountsService) {
    let ahwAccounts = this,
        modalInstance;

    ahwAccounts.onClickCreateAccount = function () {
        modalInstance = $uibModal.open({
            animation: true,
            windowClass: 'ahw-popup-action-cont',
            controller: 'AhwCreateAccountCtrl',
            controllerAs: 'ahwCreateAccount',
            template: require('../partials/createAccountPopUp.html'),
            size: 'lg',
            backdrop: 'static',
            scope: $scope
        });

        modalInstance.result.then((submitData) => {
            ahwAccountsService.createAccount({}, submitData,
                (result) => {
                    ahwAccounts.$onInit()
                },
                (error) => {
                    $log.error(error);
                }
            );
        }, () => {
            console.log('Modal dismissed at: ' + new Date())
        })

    }

    ahwAccounts.deleteAccount = function (item) {
        ahwAccountsService.deleteAccount({id: item.id}, (resp)=>{
            ahwAccounts.$onInit()
        }, $log.error)
    }

    ahwAccounts.$onInit = function () {
        ahwAccountsService.getAccounts((resp)=>{
            ahwAccounts.data = resp;
        }, $log.error)
    }
    return ahwAccounts;
};

AhwAccountsCtrl.$inject = ['$scope', '$rootScope', '$state', '$log', '$uibModal', 'ahwAccountsService'];

export default (ngModule) => {
    return ngModule.controller('AhwAccountsCtrl', AhwAccountsCtrl);
}
