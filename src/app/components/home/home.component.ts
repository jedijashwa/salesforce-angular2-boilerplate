import { Component, OnInit,Input, trigger, state, style, transition, animate } from '@angular/core';
import { SalesforceService, LoggerService } from '../../services/index';
import { IContact } from '../../shared/sobjects';

interface ContactCard extends IContact {
    state: string
}

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    animations: [
        trigger('cardState', [
            state('hovering', style({
                transform: 'scale(1.05)'
            })),
            state('normal', style({
               transform: 'scale(1)'
           })),
            transition('normal => hovering', animate('200ms ease-in')),
            transition('hovering => normal', animate('200ms ease-out'))
        ])
    ]
})
export class HomeComponent implements OnInit {
    
    private contacts: ContactCard[] = [];

    constructor(private sfdc: SalesforceService, private log: LoggerService) {}

    ngOnInit() {
        let query = 'SELECT Id, Name, PhotoUrl FROM Contact';
        this.sfdc.execute('executeQuery', { query: query })
            .then((res) => {
                this.contacts = res;
                this.contacts.map((c) => { c.state = 'normal'; });
            }, (err) => {
                this.log.error(err);
            });
    }

}