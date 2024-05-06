import { Injectable } from "@angular/core";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { IOrderRepository } from "../../core/repositories/IOrder.repository";
import { Observable, map } from "rxjs";
import { OrderListItem } from "../../core/domain/orders/order-list-item.model";
import { OrderListEntity } from "../../entity/order/order-list.entity";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { getAuth } from "../../store/auth/auth.selectors";
import { SimpleResponse } from "../../core/domain/simple-response.model";

@Injectable({
    providedIn: 'root'
})

export class OrderRepository extends IOrderRepository {
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

    override getOrderList(): Observable<OrderListItem[]> {
        const url = `${baseUrl}/api/order/admin/orders`;
        
        return this.http.get<OrderListEntity> (url,{
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
    
    override markAsDelivered(order_id: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/order/admin/order/delivered/${order_id}`;
        
        
        return this.http.put<SimpleResponse> (url, {} , {
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