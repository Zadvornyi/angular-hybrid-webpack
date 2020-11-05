export default ngModule => {
    ngModule.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {

            $stateProvider
                .state('ahwApp.accounts', {
                    url: '/accounts',
                    resolve: {
                        load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            return new Promise((resolve, reject) => {
                                require.ensure([], function () {
                                    $ocLazyLoad.load([
                                        require('./controllers/ahwAccountsCtrl.js').default(ngModule),
                                        require('./controllers/ahwCreateAccouuntsCtrl.js').default(ngModule),
                                    ]);
                                    resolve();
                                });
                            });
                        }]
                    },
                    data: {},
                    template: require('./partials/ahwAccounts.html'),
                    controller: 'AhwAccountsCtrl as ahwAccounts',
                })

        }
    ]);
}
