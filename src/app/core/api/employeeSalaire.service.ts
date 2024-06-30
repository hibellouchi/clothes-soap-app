import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

import { GlobalBody, GlobalData, GlobalDataById } from '../models/global';

import { Observable } from 'rxjs';
import {
   EmployeeSalaire,
   EditEmployeeSalaire,
   NewEmployeeSalaire,
} from '../models/employeeSalaire';

@Injectable({ providedIn: 'root' })
export class EmployeeSalaireApiService {
    private url = environment.url;

    constructor(private _httpClient: HttpClient) {}

    //get all
    getEmployeeSalaire(
        body: GlobalBody
    ): Observable<GlobalData<EmployeeSalaire>> {
        return this._httpClient.post<GlobalData<EmployeeSalaire>>(
            this.url + 'employee-salaire/all',
            body
        );
    }

    //get by id
    getEmployeeSalaireID(
        params: any,
        body: GlobalBody
    ): Observable<GlobalDataById<EmployeeSalaire>> {
        return this._httpClient.post<GlobalDataById<EmployeeSalaire>>(
            this.url + `employee-salaire/get/${params}`,
            body
        );
    }

    //create

    addEmployeeSalaire(body: NewEmployeeSalaire) {
        return this._httpClient.post<EmployeeSalaire>(
            this.url + 'employee-salaire/add',
            body
        );
    }

    //delete
    deleteEmployeeSalaire(params: any, body: any): Observable<any> {
        return this._httpClient.put(
            this.url + `employee-salaire/delete/${params}`,
            body
        );
    }

    //edit
    editEmployeeSalaire(params: any, body: EditEmployeeSalaire): Observable<any> {
        return this._httpClient.put(this.url + `employee-salaire/edit/${params}`, body);
    }
}
