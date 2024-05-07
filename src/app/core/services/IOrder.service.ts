import { Observable } from "rxjs";
import { OrderListItem } from "../domain/orders/order-list-item.model";
import { SimpleResponse } from "../domain/simple-response.model";
import { OrderModel } from "../domain/orders/order.model";

export abstract class IOrderService{
    abstract getOrderList():Observable<OrderListItem[]>;

    abstract markAsDelivered(order_id:string):Observable<SimpleResponse>;

    abstract getOrderDetails(order_id:string):Observable<OrderModel>;
}