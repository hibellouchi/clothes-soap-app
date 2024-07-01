import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

import { GlobalBody, GlobalData, GlobalDataById } from '../models/global';

import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard';

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
    private url = environment.url;

    constructor(private _httpClient: HttpClient) {}

    getDashboard(body: GlobalBody): Observable<GlobalDataById<Dashboard>> {
        return this._httpClient.post<GlobalDataById<Dashboard>>(
            this.url + 'dashboard/all',
            body
        );
    }
}
