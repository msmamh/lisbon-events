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
export class EventService {
    eventURL = 'http://tourism.citysdk.cm-lisboa.pt/pois/';
    constructor( private http: Http) { }

    /**
     * @method eventDetails, used to get lat,lng from given target POI id via realtime based subscription
     * @param {Observable<string>} id
     * @returns {Observable<any>}
     */
    eventDetails(id: Observable<string>) {
        return id.debounceTime(0)
            .distinctUntilChanged()
            .switchMap(id_ => this.getHttpEvent(id_));
    }

    /**
     * @method getHttpEvent, used to call REST API via get directly from given target POI
     * @param id
     * @returns {Observable<any>}
     */
    getHttpEvent(id) {
        return this.http.get(this.eventURL + id)
            .map((res: any) => res.json());
    }

}

