import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

import { GlobalBody, GlobalData, GlobalDataById } from '../models/global';

import { Observable } from 'rxjs';
import {
    CategoryClothe,
    EditCategoryClothe,
    NewCategoryClothe,
} from '../models/categoryClothe';

@Injectable({ providedIn: 'root' })
export class CategoryClotheApiService {
    private url = environment.url;

    constructor(private _httpClient: HttpClient) {}

    //get all
    getCategoryClothe(
        body: GlobalBody
    ): Observable<GlobalData<CategoryClothe>> {
        return this._httpClient.post<GlobalData<CategoryClothe>>(
            this.url + 'category-clothe/all',
            body
        );
    }

    //get by id
    getCategoryClotheID(
        params: any,
        body: GlobalBody
    ): Observable<GlobalDataById<CategoryClothe>> {
        return this._httpClient.post<GlobalDataById<CategoryClothe>>(
            this.url + `category-clothe/get/${params}`,
            body
        );
    }

    //create

    addCategoryClothe(body: NewCategoryClothe) {
        return this._httpClient.post<CategoryClothe>(
            this.url + 'category-clothe/add',
            body
        );
    }

    //delete
    deleteCategoryClothe(params: any, body: any): Observable<any> {
        return this._httpClient.put(
            this.url + `category-clothe/delete/${params}`,
            body
        );
    }

    //edit
    editCategoryClothe(params: any, body: EditCategoryClothe): Observable<any> {
        return this._httpClient.put(
            this.url + `category-clothe/edit/${params}`,
            body
        );
    }
}
