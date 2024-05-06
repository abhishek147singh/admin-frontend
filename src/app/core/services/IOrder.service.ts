import { Observable } from "rxjs";
import { OrderListItem } from "../domain/orders/order-list-item.model";
import { SimpleResponse } from "../domain/simple-response.model";

export abstract class IOrderService{
    abstract getOrderList():Observable<OrderListItem[]>;

    abstract markAsDelivered(order_id:string):Observable<SimpleResponse>;
}