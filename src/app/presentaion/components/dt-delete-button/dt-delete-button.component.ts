import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentDataTableEventType } from '../../../core/domain/Datatable/ComponentDataTableEventType.model';

@Component({
  selector: 'app-dt-delete-button',
  standalone: true,
  imports: [],
  templateUrl: './dt-delete-button.component.html',
  styleUrl: './dt-delete-button.component.scss'
})
export class DtDeleteButtonComponent  implements OnInit {
  constructor() {}

  @Output() emitter = new Subject<ComponentDataTableEventType> ();

  @Input() data = {};

  ngOnInit(): void {}

  Remove() {
    this.emitter.next({
      cmd: "remove",
      data: this.data,
    });
  }

  ngOnDestroy() {
    this.emitter.unsubscribe();
  }
}
