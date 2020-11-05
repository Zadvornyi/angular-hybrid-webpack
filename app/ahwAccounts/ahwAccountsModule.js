import './scss/ahwAccounts.scss';

export default (ngModule) => {
    const ahwAccountsModule = angular.module('ahwAccountsModule', []);

    require('./run.awhAccounts.js').default(ahwAccountsModule);
    require('./config.ahwAccounts.router.js').default(ahwAccountsModule);

    require('./services/ahwAccountsService').default(ahwAccountsModule);

    require('./filters/ahwStatusMapFilter').default(ahwAccountsModule);

};
