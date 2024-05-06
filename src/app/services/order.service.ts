import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IOrderService } from "../core/services/IOrder.service";
import { OrderRepository } from "../data/repositories/order.repository";
import { OrderListItem } from "../core/domain/orders/order-list-item.model";
import { SimpleResponse } from "../core/domain/simple-response.model";

@Injectable({
    providedIn:'root'
}) 

export class OrderService extends IOrderService{

    constructor(private orderRepository : OrderRepository){
        super();
    }

    override getOrderList(): Observable<OrderListItem[]> {
        return this.orderRepository.getOrderList();
    }

    override markAsDelivered(order_id: string): Observable<SimpleResponse> {
        return this.orderRepository.markAsDelivered(order_id);
    }
}