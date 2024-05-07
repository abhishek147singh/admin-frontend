export interface OrderItem {
    name: string;
    quantity: number;
    img: string;
    price: number;
    product: string;
}

interface ShippingAddress {
    fullName: string;
    mobile: string;
    address: string;
    city: string;
    zipcode: string;
    country: string;
    state: string;
    email: string;
}

interface PaymentResult {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
}

export interface OrderModel{
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentResult: PaymentResult;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    user: string;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
}