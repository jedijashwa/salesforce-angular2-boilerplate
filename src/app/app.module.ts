import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent }  from './components/index';
import { SalesforceService, LoggerService, LOG_LEVEL } from './services/index';
import { SalesforceResolver } from './resolves/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    declarations: [AppComponent],
    providers: [
        SalesforceService,
        LoggerService,
        SalesforceResolver,
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private sfdc: SalesforceService, private log: LoggerService) {
        this.sfdc.controller = 'AngularAppController';
        this.log.logLevel = LOG_LEVEL.ALL;
    }
}
