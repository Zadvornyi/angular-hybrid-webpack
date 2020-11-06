import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AhwStatusMapPipe} from "./pipes/ahw-status-map.pipe";
import {AhwSortArrayPipe} from "./pipes/ahw-sort-array.pipe";
//components
import {AhwAccountsDashboardComponent} from '../ahw-accounts/components/ahw-accounts-dashboard/ahw-accounts-dashboard.component';
import {AhwAccountsServise} from "../ahw-accounts/services/ahw-accounts.servise";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AhwStatusMapPipe,
        AhwSortArrayPipe,

        AhwAccountsDashboardComponent
    ],
    providers: [
        AhwAccountsServise
    ],
    exports: [
        AhwStatusMapPipe,
        AhwSortArrayPipe,

        AhwAccountsDashboardComponent
    ],
    entryComponents: [
        AhwAccountsDashboardComponent
    ]
})
export class AhwCommonModule {
}
