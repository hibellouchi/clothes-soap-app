import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

import { GlobalBody, GlobalData, GlobalDataById } from '../models/global';

import { Observable } from 'rxjs';
import {
  Order,
   EditOrder,
   NewOrder,
} from '../models/order';

@Injectable({ providedIn: 'root' })
export class OrderApiService {
    private url = environment.url;

    constructor(private _httpClient: HttpClient) {}

    //get all
    getOrder(
        body: GlobalBody
    ): Observable<GlobalData<Order>> {
        return this._httpClient.post<GlobalData<Order>>(
            this.url + 'order/all',
            body
        );
    }

    //get by id
    getOrderID(
        params: any,
        body: GlobalBody
    ): Observable<GlobalDataById<Order>> {
        return this._httpClient.post<GlobalDataById<Order>>(
            this.url + `order/get/${params}`,
            body
        );
    }

    //create

    addOrder(body: NewOrder) {
        return this._httpClient.post<Order>(
            this.url + 'order/add',
            body
        );
    }

    //delete
    deleteOrder(params: any, body: any): Observable<any> {
        return this._httpClient.put(
            this.url + `order/delete/${params}`,
            body
        );
    }

    //edit
    editOrder(params: any, body: EditOrder): Observable<any> {
        return this._httpClient.put(this.url + `order/edit/${params}`, body);
    }
}