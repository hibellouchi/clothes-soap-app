import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

import { GlobalBody, GlobalData, GlobalDataById } from '../models/global';

import { Observable } from 'rxjs';

import { Charge, EditCharge, NewCharge } from '../models/charge';

@Injectable({ providedIn: 'root' })
export class ChargeApiService {
    private url = environment.url;

    constructor(private _httpClient: HttpClient) {}

    getCharge(body: GlobalBody): Observable<GlobalData<Charge>> {
        return this._httpClient.post<GlobalData<Charge>>(
            this.url + 'charge/all',
            body
        );
    }
    getChargeID(
        params: any,
        body: GlobalBody
    ): Observable<GlobalDataById<Charge>> {
        return this._httpClient.post<GlobalDataById<Charge>>(
            this.url + `charge/get/${params}`,
            body
        );
    }
    addCharge(body: NewCharge) {
        return this._httpClient.post<Charge>(this.url + 'charge/add', body);
    }
    deleteCharge(params: any, body: any): Observable<any> {
        return this._httpClient.put(this.url + `charge/delete/${params}`, body);
    }
    editCharge(params: any, body: EditCharge): Observable<any> {
        return this._httpClient.put(this.url + `charge/edit/${params}`, body);
    }
}
