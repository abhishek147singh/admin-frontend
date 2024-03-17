import { Injectable } from "@angular/core";
import { IBrandRepository } from "../../core/repositories/IBrand.repository";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { BrandModel } from "../../core/domain/brand/brand.model";
import { SimpleResponse } from "../../core/domain/simple-response.model";
import { BrandListEntity } from "../../entity/brand/brand-list.entity";
import { BrandEntity } from "../../entity/brand/brand.entity";

@Injectable({
    providedIn: 'root'
})

export class BrandRepository extends IBrandRepository {
    baseUrl = baseUrl;
    
    constructor(private http:HttpClient){
        super();
    }

    override get(): Observable<BrandModel[]> {
        const url = `${baseUrl}/api/brand/`;

        return this.http.get<BrandListEntity> (url).pipe(
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

        return this.http.get<BrandEntity> (url).pipe(
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

        return this.http.post<SimpleResponse> (url, formData).pipe(
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

        return this.http.put<SimpleResponse> (url, formData).pipe(
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

        return this.http.delete<SimpleResponse> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response;
                }
                
                throw new Error(response.msg);
            })
        );
    }
}