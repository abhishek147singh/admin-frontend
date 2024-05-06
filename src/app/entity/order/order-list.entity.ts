import { OrderListItem } from "../../core/domain/orders/order-list-item.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface OrderListEntity extends ResponseModel<OrderListItem[]> {

}