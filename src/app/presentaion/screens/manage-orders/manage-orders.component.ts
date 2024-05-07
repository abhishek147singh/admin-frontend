import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { Observable, take } from 'rxjs';
import { TableColType } from '../../../core/domain/Datatable/TableColType.model';
import { ToasterService } from '../../../services/toaster.service';
import { OrderService } from '../../../services/order.service';
import { TableColEnum } from '../../../core/enumes/TableColDataType.enums';
import { ViewOrderDetailsPopupComponent } from './components/view-order-details-popup/view-order-details-popup.component';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [DatatableComponent, ViewOrderDetailsPopupComponent],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.scss'
})
export class ManageOrdersComponent implements OnInit {
  dataObs:Observable<any> | undefined;
  tableCols: TableColType[] = [];

  @ViewChild('dttable') dttable:DatatableComponent|undefined;
  @ViewChild('orderDetailsPopup') orderDetailsPopup:ViewOrderDetailsPopupComponent|undefined;

  constructor(private toasterSerice:ToasterService, private orderService:OrderService){}

  ngOnInit(): void {
    this.dataObs = this.orderService.getOrderList();

    this.tableCols = [
      { title: 'Show', data: '_id' , type: TableColEnum.show},
      { title: 'Order Id', data: '_id' , type: TableColEnum.text},
      { title: 'Total Price', data: 'totalPrice' , type: TableColEnum.text},
      { title: 'IsPaid', data: 'isPaid' , type: TableColEnum.text},
      { title: 'Paid At', data: 'paidAt' , type: TableColEnum.date},
      { title: 'Delivered At', data: 'deliveredAt' , type: TableColEnum.date},
      { title: 'Created At', data: 'createdAt' , type: TableColEnum.date},
      { title: 'Mark as Delivered', data: 'isDelivered' , type: TableColEnum.isDeliveredBtn},
    ];
  }

  onMarkAsDelivered(rowData:any){
    const order_id = rowData._id;
    if(confirm('Do you really want to mark that order as Delivered?')){
      this.orderService.markAsDelivered(order_id).pipe(take(1)).subscribe({
        next:(response => {
          this.toasterSerice.success('Order marked as Delivered successfully!');
          if(this.dttable){
            this.dttable.reloadTable();
          }
        }),
        error:(error => {
          this.toasterSerice.error('Unable to update order');
        })
      })
    }
  }

  showOrderDetails(){
    if(this.orderDetailsPopup){
      // this.orderDetailsPopup.open();
    }
  }

  onShow(rowData:any){
    const order_id = rowData._id;
    if(order_id){
      this.orderService.getOrderDetails(order_id).pipe(take(1)).subscribe({
        next:(response => {
          if(this.orderDetailsPopup){
            this.orderDetailsPopup.open(response);
          }
        }),
        error:(error => {
          this.toasterSerice.error('Unable to fetch Order Details.');
        })
      })
    }
  }

}
