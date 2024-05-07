import { DatePipe, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrderItem, OrderModel } from '../../../../../core/domain/orders/order.model';

@Component({
  selector: 'app-view-order-details-popup',
  standalone: true,
  imports: [NgStyle, DatePipe],
  templateUrl: './view-order-details-popup.component.html',
  styleUrl: './view-order-details-popup.component.scss'
})

export class ViewOrderDetailsPopupComponent {
  isActive:boolean = false;
  OrderData:OrderModel|undefined;

  open(orderData:OrderModel){
    this.isActive = true;
    this.OrderData = orderData;
  }

  close(){
    this.isActive = false;
  }

  getProductPrice(productPrice:number, count:number){
    return (productPrice * count).toFixed(2);
  }
}
