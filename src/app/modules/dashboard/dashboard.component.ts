import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardApiService } from 'app/core/api/dashboard.service';
import { Dashboard } from 'app/core/models/dashboard';
import { GlobalDataById } from 'app/core/models/global';
import { jwtDecode } from 'jwt-decode';
import { EMPTY, Observable, catchError, map, tap } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    public dashboard$: any;
    public decodeToken = {
        email: '',
        firstName: '',
    };

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    /**
     * Constructor
     */
    constructor(private _dashboardApiService: DashboardApiService) {
        this.decodeToken = jwtDecode(this.accessToken);
        this._dashboardApiService
            .getDashboard({})
            .pipe(
                map((res) => (this.dashboard$ = res)),

                catchError((err) => {
                    return EMPTY;
                })
            )
            .subscribe();
    }
}
