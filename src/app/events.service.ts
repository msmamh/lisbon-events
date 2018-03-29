import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import {Http} from '@angular/http';

@Injectable()
export class EventsService {
       eventsURL = 'http://tourism.citysdk.cm-lisboa.pt/CitySDK/events/search';
    /**
     *  Events Service Constructor
     * @param {Http} http
     */
  constructor( private http: Http) { }

    /**
     * @method eventsListByCat, used to get events list by given event's category based on realtime subscription
     * @param {Observable<string>} category
     * @returns {Observable<any>}
     */
    eventsListByCat(category: Observable<string>) {
        return category.debounceTime(0)
            .distinctUntilChanged()
            .switchMap(cat => this.getHttpEvents({category: cat}));
    }

    /**
     * @method getHttpEvent, used to call REST API directly to get list of events
     * @param parameters
     * @returns {Observable<any>}
     */
    getHttpEvents(parameters) {
        const params = parameters;
        return this.http.get(this.eventsURL, {params})
            .map((res: any) => res.json());
    }

}
