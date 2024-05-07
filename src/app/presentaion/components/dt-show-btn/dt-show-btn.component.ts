import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentDataTableEventType } from '../../../core/domain/Datatable/ComponentDataTableEventType.model';

@Component({
  selector: 'app-dt-show-btn',
  standalone: true,
  imports: [],
  templateUrl: './dt-show-btn.component.html',
  styleUrl: './dt-show-btn.component.scss'
})
export class DtShowBtnComponent implements OnInit {
  constructor() {}

  @Output() emitter = new Subject<ComponentDataTableEventType>();

  @Input() data = {};

  ngOnInit(): void {}

  show() {
    this.emitter.next({
      cmd: "show",
      data: this.data,
    });
  }

  ngOnDestroy() {
    this.emitter.unsubscribe();
  }
}
