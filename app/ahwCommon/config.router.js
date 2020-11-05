export default ngModule => {
    ngModule
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$provide',
            function ($stateProvider, $urlRouterProvider, $httpProvider, $provide) {
                $httpProvider.defaults.withCredentials = true;

                $urlRouterProvider.otherwise("error/404");

                $stateProvider
                    //HOME
                    .state('ahwApp', {
                        abstract: true,
                        data: {
                            name: 'ahwApp'
                        },
                        template: require('./partials/ahwApp.html'),
                        controller: 'AhwAppCtrl as ahwApp'
                    })
                    //Error
                    .state('ahwApp.error', {
                        url: '/error/:errorStatus',
                        params: {errorObj: null},
                        resolve: {
                            load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                                return new Promise((resolve, reject) => {
                                    require.ensure([], function () {
                                        $ocLazyLoad.load([
                                            require('./controllers/ahwErrorCtrl.js').default(ngModule)
                                        ]);
                                        resolve();
                                    });
                                });
                            }]
                        },
                        template: require('./partials/ahwError.html'),
                        controller: 'AhwErrorCtrl as ahwError'
                    })
            }
        ]);
}
