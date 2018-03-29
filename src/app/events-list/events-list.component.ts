import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { EventService } from '../event.service';
import { SingleEventComponent } from '../single-event/single-event.component';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
  providers: [EventsService, SingleEventComponent]
})
export class EventsListComponent implements OnInit {
   items: Object;
   category: Observable<string>;
   LoadingLabel: string;
   /**
    * Event List Constructor
    * @param {EventsService} Events
    * @param {EventService} Event
    * @param {MatDialog} mdDialog
    */
   constructor(private Events: EventsService, private Event: EventService, private mdDialog: MatDialog) {
       // Realtime data listing, re-call every minute
       timer(0, 60000)
           .subscribe(x => {
               this.getItems();
           });
    }
   ngOnInit() {
  }

  /**
   * Get events list.
   */
  getItems() {
      this.LoadingLabel = 'Loading Please wait...';
      this.category = Observable.of('festivais');
      this.Events.eventsListByCat(this.category)
          .subscribe(items => {
              this.items = items;
              this.LoadingLabel = '';
          });
  }

    /**
     * Open Dialog for target POI, title, description of given ID
     * @param id
     * @param title
     * @param description
     */
  openDialog(id, title, description) {
      this.Event.eventDetails(Observable.of(id))
          .subscribe(item => {
              if (item.location) { // if location's data available
                  const ref =   this.mdDialog.open(SingleEventComponent, {
                     disableClose: false,
                      data: {
                          // Get lat and convert it to float, AGM [lat,lng] accepts Number
                          lat: Number.parseFloat(item.location.point[0].Point.posList.split(' ')[0]),
                          // Get lng and convert it to float, AGM [lat,lng] accepts Number
                          lng: Number.parseFloat(item.location.point[0].Point.posList.split(' ')[1]),
                          // Get label for marker
                          label: title,
                          // Get description for details (from parameter)
                          details: description,
                          // Get item in case if more fields/operations required.
                          item: item,
                      } });

              } else { alert('Invalid Target POI'); } //
          });
  }


}



