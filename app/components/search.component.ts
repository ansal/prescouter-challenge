import { Component } from '@angular/core';

import { TripsService } from '../services/trips.service';
import { Trip } from '../models/trip.model';

@Component({
    selector: 'search',
    templateUrl: './app/components/search.component.html',
    providers: [
        TripsService
    ]
})
export class SearchComponent {
    tripsCache: Trip[];

    // List of places, used to populate places in select boxes
    places: string[] = [];

    // Departure & Arrival selected values
    selectedFrom:string = '';
    selectedTo:string = '';

    // Filter
    routeFilter = 'cheapest';

    // Form error flag
    formError: string = '';

    // Final results
    resultsReady: Trip[] = [];
    resultCost: number = 0;
    resultHours: number = 0;
    resultMinutes: number = 0;

    constructor(private tripsService: TripsService) { }

    ngOnInit() {
        this.tripsService.loadDeals()
            .then(trips => {
                this.tripsCache = trips;
                this.loadCities();
            });
    }

    loadCities() {
        this.places = Trip.findCities(this.tripsCache);
    }

    reset() {
        this.selectedFrom = '';
        this.selectedTo = '';
        this.routeFilter = 'cheapest';
    }

    swapFromAndTo() {
        [this.selectedFrom, this.selectedTo] = [this.selectedTo, this.selectedFrom];
    }

    search(routeFilter: string='') {
        this.formError = '';
        this.resultsReady = [];

        // Get correct values when the radio boxes are clicked
        if(routeFilter) {
            this.routeFilter = routeFilter;
        }

        // We need both departure and arrival
        if(!this.selectedFrom || !this.selectedTo) {
            this.formError = 'Please select a Departure City and Arrival City';
            return;
        }

        // Departure and arrival cannot be the same
        if(this.selectedFrom === this.selectedTo) {
            this.formError = 'Departure City and Arrival City cannot be the same!';
            return;
        }

        this.resultsReady = this.tripsService.searchTrips(
            this.tripsCache,
            this.selectedFrom,
            this.selectedTo,
            this.routeFilter
        );

        this.resultCost = this.resultsReady.map(r => r.discounted_cost)
            .reduce( (a:number, b:number)=> { return a + b; }, 0);

        // Calculate costs and minutes
        let totalMinutes = this.resultsReady.map(
            r => r.duration_total_minutes)
            .reduce( (a:number, b:number)=> { return a + b; }, 0);
        this.resultHours = Math.floor(totalMinutes / 60);
        this.resultMinutes = Math.floor(totalMinutes % 60);
    }
}