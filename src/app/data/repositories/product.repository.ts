import { Injectable } from "@angular/core";
import { IProductRepository } from "../../core/repositories/IProduct.repository";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { ProductModel } from "../../core/domain/product/product.model";
import { SimpleResponse } from "../../core/domain/simple-response.model";
import { ProductEntity } from "../../entity/product/product.entity";
import { ProductListEntity } from "../../entity/product/product-list.entity";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { getAuth } from "../../store/auth/auth.selectors";
import { ResponseModel } from "../../core/domain/response.model";

@Injectable({
    providedIn: 'root'
})

export class ProductRepository extends IProductRepository {
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

    override searchProduct(query: string, category: string, brand: string): Observable<ProductModel[]> {
        const url = `${baseUrl}/api/product/search?query=${query}&category=${category}&brand=${brand}`;

        return this.http.get<ResponseModel<{ products: ProductModel[]; }>>(url).pipe(
            map(response => {
                if (response.status) {
                    return response.data.products;
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
        const url = `${baseUrl}/api/product/${id}`;

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
        const url = `${baseUrl}/api/product/${id}`;

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