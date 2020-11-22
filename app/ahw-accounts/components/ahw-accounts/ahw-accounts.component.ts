import {Input, Component, EventEmitter} from '@angular/core';
import {StateService} from '@uirouter/core';

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {AhwWindowRefService} from "../../../ahw-common/services/ahw-window-ref.service";
import {AhwAccountsServise} from "../../services/ahw-accounts.servise";
import {AhwCreateAccountPopupComponent} from "../ahw-create-account-popup/ahw-create-account-popup.component"



@Component({
    selector: 'ahw-accounts',
    styles: [require('./ahw-accounts.component.scss').toString()],
    templateUrl: './ahw-accounts.component.html'
})
export class AhwAccountsComponent {
    data: any;

    constructor(public $state: StateService,
                private modalService: NgbModal,
                public ahwWindowRef: AhwWindowRefService,
                public ahwAccountsService: AhwAccountsServise) {
    }

    onClickCreateAccount () {
        const modalRef = this.modalService.open(AhwCreateAccountPopupComponent,
            {
                windowClass: 'ahw-popup-action-cont',
                size: 'lg',
            })

        modalRef.result.then((submitData) => {
            this.ahwAccountsService.createAccount({}, submitData)
                .subscribe((result: any) => {
                    this.ngOnInit()
                }, console.error)
        }, () => {
            console.log('Modal dismissed at: ' + new Date())
        })
    }

    deleteAccount(item) {
        this.ahwAccountsService.deleteAccount({id: item.id}).subscribe((resp)=>{
            this.ngOnInit()
        }, console.error)
    }

    ngOnInit() {
        this.ahwAccountsService.getAccounts().subscribe((resp)=>{
            this.data = resp;
        }, console.error)
    }
}
