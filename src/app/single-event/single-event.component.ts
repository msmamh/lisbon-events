import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { EventService } from '../event.service';
import { Observable } from 'rxjs/Observable';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-single-event',
    templateUrl: './single-event.component.html',
    styleUrls: ['./single-event.component.css']
})
export class SingleEventComponent implements OnInit {
    /**
     * Single Event Component constructor, accepts data and referenced dialog of its same class type
     * @param data
     * @param {MatDialogRef<SingleEventComponent>} mdDialogRef
     */
    constructor(@Inject(MAT_DIALOG_DATA) private data: any,
                private mdDialogRef: MatDialogRef<SingleEventComponent>) {

    }
    public ngOnInit() {

    }
    /***
    * close current dialog
    * */
    public onClose() {
        this.mdDialogRef.close();
    }
}

