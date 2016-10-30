// The deal model

export class Trip {
    arrival: string;
    cost: number;
    departure: string;
    discount: number;
    duration_hours: number;
    duration_minutes: number;
    reference: string;
    transport: string;

    duration_total_minutes: number;
    discounted_cost: number;

    constructor(tripObject:any, trip_cost:number, total_min:number) {
        this.arrival = tripObject.arrival;
        this.cost = tripObject.cost;
        this.departure = tripObject.departure;
        this.discount = tripObject.discount;
        this.duration_hours = tripObject.duration.h;
        this.duration_minutes = tripObject.duration.m;
        this.reference = tripObject.reference;
        this.transport = tripObject.transport;

        this.duration_total_minutes = trip_cost;
        this.discounted_cost = total_min;
    }

    public static findCities(trips: Trip[]): string[]{
        let cities = Array.from(new Set(trips.map(trip => trip.arrival)
                        .concat(trips.map(trip => trip.departure))));
        return cities;
    }

    // Find destinations from a city
    public static findDestinations(
        city:string,
        trips: Trip[],
        weightField: string
    ): any{
        let destinations = {},
            routes:any = {};

        trips.forEach((trip:Trip, index:number) => {
            if(trip.departure === city) {
                
                if(!destinations[trip.arrival]) {
                    destinations[trip.arrival] = trip[weightField];
                    routes[trip.arrival] = trip;
                } else if(destinations[trip.arrival] > trip[weightField]) {
                    destinations[trip.arrival] = trip[weightField];
                    routes[trip.arrival] = trip;
                }


            }
        });

        return {
            destinations: destinations,
            routes: routes
        };
    }
}

