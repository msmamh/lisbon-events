import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { EventsService } from './events.service';
import { EventService } from './event.service';
import { EventsListComponent } from './events-list/events-list.component';
import { SingleEventComponent } from './single-event/single-event.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { HtmlFilterPipe } from './pipes/html-filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    SingleEventComponent,
    HtmlFilterPipe,

  ],
  imports: [
    BrowserModule,
      BrowserAnimationsModule,
      MatDialogModule,
      MatButtonModule,
      MatCardModule,
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyATbSfmgvxDgyCjbx-nplDwYJfNIm-LiN8'
      }),
      HttpModule
  ],
  entryComponents: [SingleEventComponent],
  providers: [EventsService, EventService ,     {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule {}



