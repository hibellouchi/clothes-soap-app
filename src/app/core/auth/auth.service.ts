import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { environment } from 'environments/environment';
import { User, UserRegister } from '../user/user.types';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    private url = environment.url;

    constructor(private _httpClient: HttpClient) {}

    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(this.url + 'auth/login', credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.token;
                // Set the authenticated flag to true
                this._authenticated = true;
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    signUp(body: UserRegister) {
        return this._httpClient.post<UserRegister>(
            this.url + 'auth/register',
            body
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }
        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }
        if (this.accessToken && !AuthUtils.isTokenExpired(this.accessToken)) {
            this._authenticated = true;
            return of(true);
        }

        return of(false);
    }
}
