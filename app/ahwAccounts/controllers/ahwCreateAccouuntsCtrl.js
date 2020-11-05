import {NgForm} from "@angular/forms";
import * as moment from "moment";

function AhwCreateAccountCtrl($scope, $rootScope, $uibModalInstance, $filter, $state, $log) {
    "use strict";
    var ahwCreateAccount = this;

    ahwCreateAccount.statusList = [
        'Disable',
        'Pending',
        'Active'
    ]

    //handler for datePicker
    ahwCreateAccount.datePickerOpt = {
        minDate: moment(new Date()).endOf('day'),
        maxDate: moment(new Date()).add(6, 'month'),
        opened: false,
    };
    ahwCreateAccount.openDatePicker = function ($event) {
        ahwCreateAccount.datePickerOpt.opened = true;
    };

    ahwCreateAccount.dateExpirationPickerOpt = {
        minDate: moment(new Date()).endOf('day'),
        maxDate: moment(new Date()).add(6, 'month'),
        opened: false,
    };

    ahwCreateAccount.openDateExpirationPicker = function ($event) {
        ahwCreateAccount.dateExpirationPickerOpt.opened = true;
    };

    ahwCreateAccount.closeCreateAccount = function () {
        let submitData = {
            "name": ahwCreateAccount.name,
            "account_name": ahwCreateAccount.account_name,
            "email": ahwCreateAccount.account_email,
            "status": ahwCreateAccount.status,
            "start_date": (ahwCreateAccount.datePickerTime) ? moment(ahwCreateAccount.datePickerTime).endOf('day').unix() : null,
            "expiration_date": (ahwCreateAccount.dateExpirationPickerTime) ? moment(ahwCreateAccount.dateExpirationPickerTime).endOf('day').unix() : null,
        }

        if (ahwCreateAccount.create_form.$valid) {
            $uibModalInstance.close(submitData)
        }
    }

    ahwCreateAccount.$onInit = function () {
        ahwCreateAccount.datePickerTime = moment().unix() * 1000;
        ahwCreateAccount.dateExpirationPickerTime = moment().unix() * 1000;

        ahwCreateAccount.status = 'Active'
    }

    return ahwCreateAccount;
};

AhwCreateAccountCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', '$filter', '$state', '$log', 'ahwAccountsService'];

export default (ngModule) => {
    return ngModule.controller('AhwCreateAccountCtrl', AhwCreateAccountCtrl);
}
