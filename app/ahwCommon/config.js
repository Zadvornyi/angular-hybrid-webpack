export default (ngModule) => {

    ngModule
        .config(['$ocLazyLoadProvider', '$locationProvider', function ($ocLazyLoadProvider, $locationProvider) {
            $ocLazyLoadProvider.config({
                debug: (ENV === 'dev') ? true : false
            });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }])
        .config([
            '$compileProvider',
            function ($compileProvider) {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|tel|callto|sip*|mailto|skype|chrome-extension):/);
            }
        ])

}
