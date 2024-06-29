import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { adminNavigation, staffNavigation } from './data';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private navigation: Navigation = {
        admin: adminNavigation,
        staff: staffNavigation,
    };
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    constructor() {}

    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    get(): Observable<Navigation> {
        this._navigation.next(this.navigation);
        return of(this.navigation);
    }
}
