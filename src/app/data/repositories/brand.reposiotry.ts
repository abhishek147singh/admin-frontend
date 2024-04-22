import { Injectable } from "@angular/core";
import { IBrandRepository } from "../../core/repositories/IBrand.repository";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { BrandModel } from "../../core/domain/brand/brand.model";
import { SimpleResponse } from "../../core/domain/simple-response.model";
import { BrandListEntity } from "../../entity/brand/brand-list.entity";
import { BrandEntity } from "../../entity/brand/brand.entity";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { getAuth } from "../../store/auth/auth.selectors";

@Injectable({
    providedIn: 'root'
})

export class BrandRepository extends IBrandRepository {
    baseUrl = baseUrl;
    token = '';

    constructor(private http:HttpClient, private store:Store<AppState>){
        super();

        this.store.select(getAuth).subscribe({
            next:(authState => {
                this.token = authState.token; 
            })
        })
    }

    override get(): Observable<BrandModel[]> {
        const url = `${baseUrl}/api/brand/`;

        return this.http.get<BrandListEntity> (url,{
            headers:{'authorization': this.token}
        }).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }


    override getById(id: string): Observable<BrandModel> {
        const url = `${baseUrl}/api/brand/${id}`;

        return this.http.get<BrandEntity> (url,{
            headers:{'authorization': this.token}
        }).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }
    
    override create(formData: FormData): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/brand/`;
    
        return this.http.post<SimpleResponse> (url, formData, {
            headers:{'authorization': this.token}
        }).pipe(
            map((response) => {
                if (response.status) {
                    return response;
                }

                throw new Error(response.msg);
            })
        );
    }

    override update(id: string, formData: FormData): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/brand/${id}`;

        return this.http.put<SimpleResponse> (url, formData, {
            headers:{'authorization': this.token}
        }).pipe(
            map((response) => {
                if (response.status) {
                    return response;
                }
                
                throw new Error(response.msg);
            })
        );
    }

    override delete(id: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/brand/${id}`;

        return this.http.delete<SimpleResponse> (url, {
            headers:{'authorization': this.token}
        }).pipe(
            map((response) => {
                if (response.status) {
                    return response;
                }
                
                throw new Error(response.msg);
            })
        );
    }
}