import { Component } from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: './app/components/search.component.html'
})
export class SearchComponent {
    places: String[] = [
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
    selectedFrom:String = '';
    selectedTo:String = '';

    // Filter
    routeFilter = 'cheapest';

    ngOnInit() {
    }

    reset() {
        this.selectedFrom = '';
        this.selectedTo = '';
        this.routeFilter = 'cheapest';
    }

    swapFromAndTo() {
        [this.selectedFrom, this.selectedTo] = [this.selectedTo, this.selectedFrom];
    }

    search() {
        console.log('Searching');
    }
}