import { Injectable } from "@angular/core";
import { ICategoryRepository } from "../../core/repositories/ICategory.repository";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { CategoryModel } from "../../core/domain/category/category.model";
import { SimpleResponse } from "../../core/domain/simple-response.model";
import { CategoryListEntity } from "../../entity/category/category-list.entity";
import { CategoryEntity } from "../../entity/category/category.entity";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { getAuth } from "../../store/auth/auth.selectors";

@Injectable({
    providedIn: 'root'
})

export class CategoryRepository extends ICategoryRepository {
    
    baseUrl = baseUrl
    token = '';

    constructor(private http:HttpClient, private store:Store<AppState>){
        super();

        this.store.select(getAuth).subscribe({
            next:(authState => {
                this.token = authState.token; 
            })
        })
    }

    override get(): Observable<CategoryModel[]> {
        const url = `${baseUrl}/api/category/`;

        return this.http.get<CategoryListEntity> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }

    override getById(id: string): Observable<CategoryModel> {
        const url = `${baseUrl}/api/category/${id}`;

        return this.http.get<CategoryEntity> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }

    override create(formData: FormData): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/category/`;

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
        const url = `${baseUrl}/api/category/${id}`;

        return this.http.put<SimpleResponse> (url, formData,{
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
        const url = `${baseUrl}/api/category/${id}`;

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