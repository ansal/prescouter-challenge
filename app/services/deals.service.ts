import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Deal } from '../models/deal.model';

@Injectable()
export class DealsService {
    private url = '/api/response.json';

    constructor (private http:Http) {}

    getDeals(from : String,
        to: String,
        fiter: String
    ): Promise<any> {
    return this.http.get(this.url)
        .toPromise()
        .then(response => {
            return response.json().deals.map((d:any) => {
                return new Deal(
                    d,
                    (parseInt(d.duration.h, 10) * 60) + parseInt(
                        d.duration.m, 10),
                    d.cost - (d.cost * d.discount / 100)
                );
            });
        })
        .catch(this.handleError);
    }

    private handleError(error:any) {
        window.alert('Error fetching information from server!');
        console.log(error);
    }
}