import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

import { GlobalBody, GlobalData, GlobalDataById } from '../models/global';

import { Observable } from 'rxjs';
import { Customer, EditCustomer, NewCustomer } from '../models/customer';

@Injectable({ providedIn: 'root' })
export class CustomerApiService {
    private url = environment.url;

    constructor(private _httpClient: HttpClient) {}

    getCustomer(body: GlobalBody): Observable<GlobalData<Customer>> {
        return this._httpClient.post<GlobalData<Customer>>(
            this.url + 'customer/all',
            body
        );
    }
    getCustomerID(
        params: any,
        body: GlobalBody
    ): Observable<GlobalDataById<Customer>> {
        return this._httpClient.post<GlobalDataById<Customer>>(
            this.url + `customer/get/${params}`,
            body
        );
    }
    addCustomer(body: NewCustomer) {
        return this._httpClient.post<GlobalDataById<Customer>>(
            this.url + 'customer/add',
            body
        );
    }
    deleteCustomer(params: any, body: any): Observable<any> {
        return this._httpClient.put(
            this.url + `customer/delete/${params}`,
            body
        );
    }
    editCustomer(params: any, body: EditCustomer): Observable<any> {
        return this._httpClient.put(this.url + `customer/edit/${params}`, body);
    }
}
