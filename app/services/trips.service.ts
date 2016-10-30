import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Trip } from '../models/trip.model';

// A simple implementation of Dijkstra algorithm for finding shortest route

// Priority list implementation (as found in other languages like python)
// https://en.wikipedia.org/wiki/Priority_queue
class PriorityNode {
    key:string;
    priority:number;

    constructor(key: string, priority: number){
        this.key = key;
        this.priority = priority;
    }
}

class PriorityQueue {
    nodes:PriorityNode[] = [];

    enqueue(priority:number, key:string){
        this.nodes.push(new PriorityNode(key, priority));
        this.nodes.sort(
            function(a, b) {
                return a.priority - b.priority;
            }
        )
    }
    
    dequeue():string{
        return this.nodes.shift().key;
    }

    empty():boolean{
        return !this.nodes.length;
    }
}

// Dijkstra's algorithm implementation
class Dijkstra{
    infinity = 1/0;
    vertices = {};

    addVertex(name:string, edges:any){
        this.vertices[name] = edges;
    }


    // Computes the shortest path from a vertex to another
    shortestPath(start:string, finish:string){
        let nodes = new PriorityQueue(),
            distances = {},
            previous = {},
            path:any = [],
            smallest:any, 
            vertex:any, 
            neighbor:any, 
            alt:any;

        // Initialize the distances and queues variables
        for(vertex in this.vertices){
            if(vertex === start){
                distances[vertex] = 0;
                nodes.enqueue(0, vertex);
            }else{
                distances[vertex] = this.infinity;
                nodes.enqueue(this.infinity, vertex);
            }

            previous[vertex] = null;
        }

        // Continue as long as the queue haven't been emptied.
        while(!nodes.empty()){
            smallest = nodes.dequeue();

            if(smallest === finish){

                // Compute the path
                while(previous[smallest]){
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }

            if(!smallest || distances[smallest] === this.infinity){
                continue;
            }

            // Compute the distance for each neighbor
            for(neighbor in this.vertices[smallest]){
                alt = distances[smallest] + this.vertices[smallest][neighbor];

                if(alt < distances[neighbor]){
                    distances[neighbor] = alt;
                    previous[neighbor] = smallest;
                    nodes.enqueue(alt, neighbor);
                }
            }
        }
        
        // Reverse the path to get starting point and the path itself
        return path.concat(start).reverse();
    }
}



// Services for retrieving and searching deals
@Injectable()
export class TripsService {
    private url = '/api/response.json';

    constructor (private http:Http) {}

    // Loads deals from the server
    loadDeals(): Promise<any> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => {
                return response.json().deals.map((d:any) => {
                    return new Trip(
                        d,
                        (parseInt(d.duration.h, 10) * 60) + parseInt(
                            d.duration.m, 10),
                        d.cost - (d.cost * d.discount / 100)
                    );
                });
            })
            .catch(this.handleError);
    }

    // Search for cheapest/fastest routes
    searchTrips(
        trips: Trip[],
        departureCity: string,
        arrivalCity: string,
        routeFilter: string
    ):Trip[] {

        // Represent each deal(trip) as vertices in a graph
        let graph:Dijkstra = new Dijkstra(),
            shortestPath: string[] =[],
            finalResults: Trip[] = [];

        // Cities, which will be our vertices
        let cities = Trip.findCities(trips);

        // Routes used as vertices
        let routes: any = {};

        // Field that should be used as edge weight
        let fieldWeightage = routeFilter === 'cheapest' ? 'discounted_cost' : 'duration_total_minutes';

        // Add cities (vertices) and their destinations (edges)
        cities.forEach((city:string) => {
            let destinations = Trip.findDestinations(city, trips, fieldWeightage);
            graph.addVertex(city, destinations.destinations);
            routes[city] = destinations.routes;
        });

        // Find the shortest path
        shortestPath = graph.shortestPath(departureCity, arrivalCity);

        // Find the route used for the shortest path
        for(let i=0; i < shortestPath.length; i++) {
            if(!shortestPath[i + 1]) { break; }

            finalResults.push(routes[shortestPath[i]][shortestPath[i + 1]]);
        }

        return finalResults;

    }

    private handleError(error:any) {
        window.alert('Error fetching information from server!');
        console.log(error);
    }
}