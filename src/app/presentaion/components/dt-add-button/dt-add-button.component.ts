import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentDataTableEventType } from '../../../core/domain/Datatable/ComponentDataTableEventType.model';

@Component({
  selector: 'app-dt-add-button',
  standalone: true,
  imports: [],
  templateUrl: './dt-add-button.component.html',
  styleUrl: './dt-add-button.component.scss'
})
export class DtAddButtonComponent implements OnInit {
  constructor() {}

  @Output() emitter = new Subject<ComponentDataTableEventType>();

  @Input() data = {};

  ngOnInit(): void {}

  Add() {
    this.emitter.next({
      cmd: "edit",
      data: this.data,
    });
  }

  ngOnDestroy() {
    this.emitter.unsubscribe();
  }
}
