export interface OrderListItem{
    _id:string;
    createdAt:string;
    totalPrice:number;
    isPaid:boolean;
    isDelivered:boolean;
    paidAt:string;
    deliveredAt:string;
}