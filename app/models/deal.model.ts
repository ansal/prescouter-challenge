// The deal model

export class Deal {
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

    constructor(dealObject:any, d_cost:number, total_min:number) {
        this.arrival = dealObject.arrival;
        this.cost = dealObject.cost;
        this.departure = dealObject.departure;
        this.discount = dealObject.discount;
        this.duration_hours = dealObject.duration.h;
        this.duration_minutes = dealObject.duration.m;
        this.reference = dealObject.reference;
        this.transport = dealObject.transport;

        this.duration_total_minutes = d_cost;
        this.discounted_cost = total_min;
    }
}

