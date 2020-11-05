function runApps($trace, $transitions, $rootScope, $templateCache, $state, $stateParams, store) {

    $transitions.onBefore({}, ($trans) => {
        let to = $trans.$to().self,
            toParams = $trans.params('to'),
            from = $trans.$from().self,
            fromParams = $trans.params('from');

        $transitions._router.locationService._baseHref = '/'; //this dirty hask

        $rootScope.$state = $state;
        $rootScope.$state.previous = from;
        $rootScope.$state.previousParams = fromParams;
        $rootScope.$stateParams = $trans.params('to');

    });

}

runApps.$inject = [
    '$trace',
    '$transitions',
    '$rootScope',
    '$templateCache',
    '$state',
    '$stateParams',
    'store',
];

export default (ngModule) => {
    return ngModule.run(runApps)
}

