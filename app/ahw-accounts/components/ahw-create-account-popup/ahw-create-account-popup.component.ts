import * as moment from "moment";

import {Input, Component, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';
import {StateService} from '@uirouter/core';

import {NgbActiveModal, NgbCalendar} from "@ng-bootstrap/ng-bootstrap";
import {AhwWindowRefService} from "../../../ahw-common/services/ahw-window-ref.service";
import {AhwAccountsServise} from "../../services/ahw-accounts.servise";


@Component({
    selector: 'ahw-create-account-popup',
    styleUrls: ['./ahw-create-account-popup.component.scss'],
    templateUrl: './ahw-create-account-popup.component.html'

})
export class AhwCreateAccountPopupComponent {
    name: string;
    account_name: string;
    account_email: string;
    status:string;

    datePickerTime: any;
    datePickerOpt: any;
    dateExpirationPickerTime: any;
    dateExpirationPickerOpt: any;

    statusList: Array<String> = [
        'Disable',
        'Pending',
        'Active'
    ]

    constructor(public $state: StateService,
                public activeModal: NgbActiveModal,
                public ahwRootScopeShared: AhwWindowRefService,
                public ahwAccountsService: AhwAccountsServise,
                public ngbCalendar: NgbCalendar) {

        let maxDateMoment = moment(new Date()).add(6, 'month');

        //handler for datePicker
        this.datePickerOpt = {
            minDate: this.ngbCalendar.getToday(),
            maxDate: {
                day : maxDateMoment.date(),
                month : maxDateMoment.month() +1,
                year : maxDateMoment.year()
            },
        };
        this.datePickerTime = this.ngbCalendar.getToday()

        this.dateExpirationPickerOpt = {
            minDate: this.ngbCalendar.getToday(),
            maxDate: {
                day : maxDateMoment.date(),
                month : maxDateMoment.month() +1,
                year : maxDateMoment.year()
            },
        };
        this.dateExpirationPickerTime = this.ngbCalendar.getToday()

        this.status = 'Active'
    }

    closeCreateAccount(form: NgForm) {
        let submitData = {
            "name": this.name,
            "account_name": this.account_name,
            "email": this.account_email,
            "status": this.status,
            "start_date": (this.datePickerTime) ? moment(this.datePickerTime).endOf('day').unix() : null,
            "expiration_date": (this.dateExpirationPickerTime) ? moment(this.dateExpirationPickerTime).endOf('day').unix() : null,
        }

        if (form.valid) {
            this.activeModal.close(submitData);
        }
    }

}
