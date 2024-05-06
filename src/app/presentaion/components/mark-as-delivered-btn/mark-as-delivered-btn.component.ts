import { Component, Input, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentDataTableEventType } from '../../../core/domain/Datatable/ComponentDataTableEventType.model';

@Component({
  selector: 'app-mark-as-delivered-btn',
  standalone: true,
  imports: [],
  templateUrl: './mark-as-delivered-btn.component.html',
  styleUrl: './mark-as-delivered-btn.component.scss'
})
export class MarkAsDeliveredBtnComponent implements OnDestroy {
  constructor() {}

  @Output() emitter = new Subject<ComponentDataTableEventType>();

  @Input() data:{
    [key:string]:any
  } = {};

  martAsDelivered() {
    this.emitter.next({
      cmd: "edit",
      data: this.data,
    });
  }

  ngOnDestroy() {
    this.emitter.unsubscribe();
  }
}
