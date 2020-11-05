import {NgHybridStateDeclaration} from "@uirouter/angular-hybrid";

import {AhwAccountsComponent} from "./components/ahw-accounts/ahw-accounts.component";

export const AhwAccounts: NgHybridStateDeclaration = {
    name: 'ahwApp.accounts2.**',
    url: '/',
    loadChildren: () => import('../ahw-accounts/ahw-accounts.module')
        .then(result => result.AhwAccountsModule)
};

export const AhwAccountsRoot: NgHybridStateDeclaration = {
    url: '/ng2/accounts',
    name: 'ahwApp.accounts2',
    component: AhwAccountsComponent,
};


export const AhwAccountsStates = [
    AhwAccountsRoot
];
