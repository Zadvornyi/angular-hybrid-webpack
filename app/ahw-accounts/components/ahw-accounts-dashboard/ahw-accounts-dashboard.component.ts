import {Input, Component, EventEmitter} from '@angular/core';

import {StateService} from '@uirouter/core';
import {AhwWindowRefService} from "../../../ahw-common/services/ahw-window-ref.service";
import {AhwAccountsServise} from "../../services/ahw-accounts.servise";


@Component({
    selector: 'ahw-accounts-dashboard',
    styles: [require('./ahw-accounts-dashboard.component.scss').toString()],
    templateUrl: './ahw-accounts-dashboard.component.html'

})
export class AhwAccountsDashboardComponent {

    @Input('total') total: number;
    @Input('title') title: string;
    
    constructor(public $state: StateService,
                public ahwWindowRef: AhwWindowRefService,
                public ahwAccountsService: AhwAccountsServise) {
    }
    

}
