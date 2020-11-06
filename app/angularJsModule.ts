import * as angular from "angular";

import 'oclazyload'
import 'angular-storage'
import 'angular-sanitize'
import 'angular-resource'
import 'angular-ui-bootstrap'
import 'angular-websocket'
import 'angular-cookies'
import 'angular-animate'
import 'angular-touch'

import {ahwAccountsDashboardDowngradePatch} from "./ahw-accounts/components/ahw-accounts-dashboard/ahwAccountsDashboardDowngradePatch";
export const AhwAngularJsModule = angular.module('ahwApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.router.upgrade',
    'ui.bootstrap',
    'oc.lazyLoad',
    'angular-websocket',
    'angular-storage',

    'ahwAccountsModule',

    ahwAccountsDashboardDowngradePatch.name
])

require('./ahwCommon/config.js').default(AhwAngularJsModule);
require('./ahwCommon/config.router.js').default(AhwAngularJsModule);
require('./ahwCommon/run.js').default(AhwAngularJsModule);
require('./ahwCommon/controllers/ahwAppCtrl.js').default(AhwAngularJsModule);


require('./ahwCommon/services/ahwRootScopeSharedService').default(AhwAngularJsModule);
require('./ahwAccounts/ahwAccountsModule').default(AhwAngularJsModule);


