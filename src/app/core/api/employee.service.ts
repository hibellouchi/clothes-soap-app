import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

import { GlobalBody, GlobalData, GlobalDataById } from '../models/global';

import { Observable } from 'rxjs';

import { EditEmployee, Employee, NewEmployee } from '../models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeApiService {
    private url = environment.url;

    constructor(private _httpClient: HttpClient) {}

    getEmployee(body: GlobalBody): Observable<GlobalData<Employee>> {
        return this._httpClient.post<GlobalData<Employee>>(
            this.url + 'employee/all',
            body
        );
    }
    getEmployeeID(
        params: any,
        body: GlobalBody
    ): Observable<GlobalDataById<Employee>> {
        return this._httpClient.post<GlobalDataById<Employee>>(
            this.url + `employee/get/${params}`,
            body
        );
    }
    addEmployee(body: NewEmployee) {
        return this._httpClient.post<GlobalDataById<Employee>>(
            this.url + 'employee/add',
            body
        );
    }
    deleteEmployee(params: any, body: any): Observable<any> {
        return this._httpClient.put(
            this.url + `employee/delete/${params}`,
            body
        );
    }
    editEmployee(params: any, body: EditEmployee): Observable<any> {
        return this._httpClient.put(this.url + `employee/edit/${params}`, body);
    }
}
