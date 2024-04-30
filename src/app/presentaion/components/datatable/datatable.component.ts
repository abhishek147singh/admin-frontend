import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router, UrlTree, PRIMARY_OUTLET } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable, Subscription, Subject } from 'rxjs';
import { DtEditButtonComponent } from '../dt-edit-button/dt-edit-button.component';
import { DtDeleteButtonComponent } from '../dt-delete-button/dt-delete-button.component';
import { ComponentDataTableEventType } from '../../../core/domain/Datatable/ComponentDataTableEventType.model';
import { DtAddButtonComponent } from '../dt-add-button/dt-add-button.component';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [DtDeleteButtonComponent, DtEditButtonComponent, DtAddButtonComponent ,DataTablesModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss'
})
export class DatatableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective | undefined;

  @Input() tableCols: { title: string, data: string , type : ('img' | 'text'| 'bool' | 'active-inactive') }[] = [];

  @Input() dataObs: Observable<any> | undefined;

  @Input() activeFlag:string  = '';

  @Input() deactiveFlag:string  = '';
  
  @Input() flagColIndex: number = 0; 

  @Input() isEditNotNeeded:boolean = false;

  @Input() isDeleteNotNeeded:boolean = false;

  @Input() isAddButtonNeeded:boolean = false;

  @Input() assetsImgPath:string = 'http://localhost:5000/';

  @Output() Edit: EventEmitter<any> = new EventEmitter<any> ();

  @Output() Remove: EventEmitter<any> = new EventEmitter<any> ();

  @Output() Add: EventEmitter<any> = new EventEmitter<any> ();


  @Output() ToggleActive: EventEmitter<any> = new EventEmitter<any> ();

  permissionSubscription: Subscription | undefined;
  dataObsSubscription: Subscription | undefined;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  toggleDeleteType: string = 'A';

  @ViewChild('editNg') editNg: TemplateRef<DtEditButtonComponent> | undefined;
  @ViewChild('removeNg') removeNg: TemplateRef<DtDeleteButtonComponent> | undefined;
  @ViewChild('addNg') addNg: TemplateRef<DtDeleteButtonComponent> | undefined;

  hasData:boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtOptions = {
        processing: true,
        ajax: (dataTablesParameters: any, callback: any) => {
          if (this.dataObs) {
            this.dataObsSubscription =  this.dataObs.subscribe({
                next: resp => {
                  callback({
                    recordsTotal: resp.length,
                    data: resp
                  });
                },
                error: (error) => {
                  callback({
                    recordsTotal: 0,
                    data:[]
                  });
                }
            })
          }
        },
        columns: this.colums(),
        responsive: true,
        autoWidth: false,
      };
      this.dtTrigger.next(this.dtOptions);
      this.hasData = true;
    }, 200);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    if (this.permissionSubscription) {
      this.permissionSubscription.unsubscribe();
    }

    if(this.dataObsSubscription){
      this.dataObsSubscription.unsubscribe();
    }
  }

  getLastRouteString() {
    const url = this.router.url;
    const tree: UrlTree = this.router.parseUrl(url);
    const segments = tree.root.children[PRIMARY_OUTLET].segments;
    const lastSegment = segments.at(segments.length - 1);
    if (lastSegment !== undefined) {
      return lastSegment.path;
    }

    return '';
  }

  colums() {
    const colums: any = [];
    if(!this.isEditNotNeeded){
      colums.push({
        title:'Edit',
        width:'40px',
        name: 'edit',
        data: '_id',
        className: 'dt-center editor-edit',
        defaultContent: '',
        ngTemplateRef: {
          ref: this.editNg,
          context: {
            captureEvents: this.onEdit.bind(this)
          }
        }
      })
    }

    if(this.isAddButtonNeeded){
      colums.push({
        title:'Add',
        width:'40px',
        name: 'add',
        data: '_id',
        className: 'dt-center editor-edit',
        defaultContent: '',
        ngTemplateRef: {
          ref: this.addNg,
          context: {
            captureEvents: this.onAdd.bind(this)
          }
        }
      })
    }
  
    this.tableCols.forEach(col => {
      if(col.type === 'text'){
        colums.push({ title: col.title, data: col.data });
      }
      
      else if(col.type === 'bool'){
        colums.push({
          title: col.title,
          name: col.title,
          data: null,
          className: 'dt-center editor-edit',
          render: function (data: any, type: any, row: any) {
            return data[col.data] ? '<span style="color:green;">Active</span>' : '<span style="color:red;">Blocked</span>';
          },
          orderable: false
        })
      }
      else{
        colums.push({
          title: col.title,
          name: col.title,
          data: null,
          className: 'dt-center editor-edit',
          render: function (data: any, type: any, row: any) {
            const url = data[col.data];

            return '<img style="width:150px;height:100%;" src="' + url +'" class="img-data" >';
          },
          orderable: false
        })
      }
    });

    if(!this.isDeleteNotNeeded){
      colums.push({
        title:'Delete',
        name: 'Delete',
        width:'40px',
        data: '_id',
        className: 'dt-center editor-edit',
        defaultContent: '',
        ngTemplateRef: {
          ref: this.removeNg,
          context: {
            captureEvents: this.onDelete.bind(this),
          }
        }
      })
    }
    
    return colums;
  }

  reloadTable() {
    if (this.dtElement) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    }
  }

  onEdit(event: ComponentDataTableEventType) {
    this.Edit.emit(event.data);
  }

  onDelete(event: ComponentDataTableEventType) {
    this.Remove.emit(event.data);
  }

  onAdd(event: ComponentDataTableEventType) {
    this.Add.emit(event.data);
  }

  onToggleActive(event: ComponentDataTableEventType){
    this.ToggleActive.emit(event.data);
  }
}
