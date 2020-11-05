import {Injectable} from '@angular/core';
import {AhwWindowRefService} from "../../ahw-common/services/ahw-window-ref.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class AhwAccountsServise {
    rootUrl: string = this.winRef.nativeWindow.ahwAppsApiUrl;

    constructor(private winRef: AhwWindowRefService,
                private http: HttpClient) {

    }

    getAccounts() {
        return this.http.get(this.rootUrl + `/accounts`)
    }

    createAccount(params, submitData) {
        return this.http.post(this.rootUrl + `/accounts`, submitData)
    }

    updateAccount(params, submitData) {
        return this.http.put(this.rootUrl + `/accounts/${params.id}`, submitData)
    }

    deleteAccount(params) {
        return this.http.delete(this.rootUrl + `/accounts/${params.id}`)
    }
}
