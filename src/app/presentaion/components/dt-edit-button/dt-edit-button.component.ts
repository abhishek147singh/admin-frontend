import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentDataTableEventType } from '../../../core/domain/Datatable/ComponentDataTableEventType.model';

@Component({
  selector: 'app-dt-edit-button',
  standalone: true,
  imports: [],
  templateUrl: './dt-edit-button.component.html',
  styleUrl: './dt-edit-button.component.scss'
})
export class DtEditButtonComponent implements OnInit {
  constructor() {}

  @Output() emitter = new Subject<ComponentDataTableEventType>();

  @Input() data = {};

  ngOnInit(): void {}

  Edit() {
    this.emitter.next({
      cmd: "edit",
      data: this.data,
    });
  }

  ngOnDestroy() {
    this.emitter.unsubscribe();
  }
}
