import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { EMPTY, catchError, map, tap } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
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
    constructor() {
        this.decodeToken = jwtDecode(this.accessToken);
    }
}
