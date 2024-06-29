import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError, map, tap } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    /**
     * Constructor
     */
    constructor() {}
}
