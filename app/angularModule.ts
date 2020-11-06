import 'moment'
import 'moment-timezone'
import '@babel/polyfill'
import 'bootstrap';
import 'angular-hammer';

import './scss/ahw.scss';

import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {UpgradeModule} from '@angular/upgrade/static';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UIRouterUpgradeModule} from '@uirouter/angular-hybrid';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AhwCommonModule} from './ahw-common/ahw-common.module'
import {ahwAngularStates} from './ahw-common/ahw.states';
import {AhwWindowRefService} from './ahw-common/services/ahw-window-ref.service';
import {AhwRootScopeShared} from './ahwCommon/services/ahwRootScopeSharedService';

declare const ENV: string;

const GL_APPS_API_URL: { [key: string]: string } = {
    dev: 'http://localhost:3000',
    prod: 'http://localhost:3000'
};

(<any>window).appENV = ENV;
(<any>window).ahwAppsApiUrl = GL_APPS_API_URL[ENV];

// The root Angular module
@NgModule({
    imports: [
        BrowserModule,
        NgbModule,
        // Provide Angular upgrade capabilities
        UpgradeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        // Provides the @uirouter/angular directives
        UIRouterUpgradeModule.forRoot({states: ahwAngularStates}),

        AhwCommonModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        AhwWindowRefService,
        {provide: AhwRootScopeShared, useFactory: (i: any) => i.get('ahwRootScopeShared'), deps: ['$injector']},
    ],
    declarations: [],
    entryComponents: [],
    exports: []
})

export class AhwAngularModule {
    constructor(private upgrade: UpgradeModule) {
    }

    ngDoBootstrap() {
        // The DOM must be already be available
        this.upgrade.bootstrap(document.body, ['ahwApp']);
    }
}
