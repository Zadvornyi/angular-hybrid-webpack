import * as angular from 'angular';
import {AhwAccountsDashboardComponent} from './ahw-accounts-dashboard.component';
import {downgradeComponent} from "@angular/upgrade/static";

// AngularJS, this patch
export const ahwAccountsDashboardDowngradePatch = angular.
module('ahwAccountsDashboardDowngradePatch', [])
    .directive(
        'ahwAccountsDashboard',
        downgradeComponent({ component: AhwAccountsDashboardComponent }) as angular.IDirectiveFactory
    )
