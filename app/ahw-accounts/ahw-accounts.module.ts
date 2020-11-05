import {CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {UIRouterUpgradeModule} from "@uirouter/angular-hybrid";

import './scss/ahw-accounts.scss';

//components
import {AhwAccountsComponent} from './components/ahw-accounts/ahw-accounts.component';
import {AhwCreateAccountPopupComponent} from './components/ahw-create-account-popup/ahw-create-account-popup.component'
import {AhwAccountsStates} from "./ahw-accounts.states";
import {AhwAccountsServise} from "./services/ahw-accounts.servise";
import {AhwStatusMapPipe} from "./pipes/ahw-status-map.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // Provides the @uirouter/angular directives
        UIRouterUpgradeModule.forChild({ states: AhwAccountsStates }),
        NgbModule
    ],
    declarations: [
        AhwStatusMapPipe,

        AhwAccountsComponent,
        AhwCreateAccountPopupComponent
    ],
    providers: [
        AhwAccountsComponent,
        AhwAccountsServise
    ],
    exports: [],
    entryComponents: [
        AhwCreateAccountPopupComponent
    ]
})
export class AhwAccountsModule {
}
