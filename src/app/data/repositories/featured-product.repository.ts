import { Injectable } from "@angular/core";
import { Observable , map} from "rxjs";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { IFeaturedProductRepository } from "../../core/repositories/IFreaturedProducts.repository";
import { FreaturedProductModel } from "../../core/domain/freatured-products/freatured-products.model";
import { SimpleResponse } from "../../core/domain/simple-response.model";
import { FeaturedProductListEntity } from "../../entity/featured-products/featured-product-list.entity";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { getAuth } from "../../store/auth/auth.selectors";

@Injectable({
    providedIn: 'root'
})

export class FeaturedProductRepository extends IFeaturedProductRepository {
    
    baseUrl = baseUrl;
    token = '';

    constructor(private http:HttpClient, private store:Store<AppState>){
        super();

        this.store.select(getAuth).subscribe({
            next:(authState => {
                this.token = authState.token; 
            })
        });
    }

    override addToList(id: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/featured-products`;
        
       return this.http.post<SimpleResponse> (url, { product:id },{
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
    override getList(): Observable<FreaturedProductModel[]> {
        const url = `${baseUrl}/api/featured-products`;
        
       return this.http.get<FeaturedProductListEntity> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }

    override removeFromList(id: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/featured-products/${id}`;
        
       return this.http.delete<SimpleResponse> (url,{
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