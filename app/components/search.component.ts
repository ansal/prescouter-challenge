import { Component } from '@angular/core';

import { DealsService } from '../services/deals.service';
import { Deal } from '../models/deal.model';

@Component({
    selector: 'search',
    templateUrl: './app/components/search.component.html',
    providers: [
        DealsService
    ]
})
export class SearchComponent {
    places: string[] = [
        'London',
        'Amsterdam',
        'Warsaw',
        'Stockholm',
        'Paris',
        'Brussels',
        'Prague',
        'Moscow',
        'Madrid',
        'Geneva',
        'Budapest',
        'Kiev',
        'Lisbon',
        'Rome',
        'Athens',
        'Istanbul'
    ];

    // Departure & Arrival selects
    selectedFrom:string = '';
    selectedTo:string = '';

    // Filter
    routeFilter = 'cheapest';

    constructor(private dealsService: DealsService) { }

    reset() {
        this.selectedFrom = '';
        this.selectedTo = '';
        this.routeFilter = 'cheapest';
    }

    swapFromAndTo() {
        [this.selectedFrom, this.selectedTo] = [this.selectedTo, this.selectedFrom];
    }

    search() {
        this.dealsService.getDeals(
            this.selectedFrom,
            this.selectedTo,
            this.routeFilter
        ).then(deals => {
            
            

        });
    }
}