import { Injectable } from "@angular/core";
import { IProductRepository } from "../../core/repositories/IProduct.repository";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { ProductModel } from "../../core/domain/product/product.model";
import { SimpleResponse } from "../../core/domain/simple-response.model";
import { ProductEntity } from "../../entity/product/product.entity";
import { ProductListEntity } from "../../entity/product/product-list.entity";

@Injectable({
    providedIn: 'root'
})

export class ProductRepository extends IProductRepository {
    baseUrl = baseUrl;
    
    constructor(private http:HttpClient){
        super();
    }

    override get(): Observable<ProductModel[]> {
        const url = `${baseUrl}/api/product/`;

        return this.http.get<ProductListEntity> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }
    
    override getById(id: string): Observable<ProductModel> {
        const url = `${baseUrl}/api/product/${id}`;

        return this.http.get<ProductEntity> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }
    
    override create(formData: FormData): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/product/`;
    
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
        const url = `${baseUrl}/api/product/${id}`;

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
        const url = `${baseUrl}/api/product/${id}`;

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