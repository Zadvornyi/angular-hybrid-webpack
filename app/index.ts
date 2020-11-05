import 'reflect-metadata';
import 'core-js';
import 'zone.js';

import {NgZone} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {UrlService} from '@uirouter/core';

import {AhwAngularModule} from "./angularModule";
import {AhwAngularJsModule} from "./angularJsModule"

// Using AngularJS config block, call `deferIntercept()`.
// This tells UI-Router to delay the initial URL sync (until all bootstrapping is complete)
AhwAngularJsModule.config(['$urlServiceProvider', $urlService => $urlService.deferIntercept()]);
// Manually bootstrap the Angular app
platformBrowserDynamic()
    .bootstrapModule(AhwAngularModule)
    .then(platformRef => {
        // get() UrlService from DI (this call will create all the UIRouter services)
        const url: UrlService = platformRef.injector.get(UrlService);

        // Instruct UIRouter to listen to URL changes
        function startUIRouter() {
            url.listen();
            url.sync();
        }

        const ngZone: NgZone = platformRef.injector.get(NgZone);
        ngZone.run(startUIRouter);
    });
