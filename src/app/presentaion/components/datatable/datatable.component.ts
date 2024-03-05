import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router, UrlTree, PRIMARY_OUTLET } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable, Subscription, Subject, switchMap, of } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { DtEditButtonComponent } from '../dt-edit-button/dt-edit-button.component';
import { DtDeleteButtonComponent } from '../dt-delete-button/dt-delete-button.component';
import { ComponentDataTableEventType } from '../../../core/domain/Datatable/ComponentDataTableEventType.model';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [DtDeleteButtonComponent, DtEditButtonComponent, DataTablesModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss'
})
export class DatatableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective | undefined;
  @ViewChild('editNg') editNg: TemplateRef<DtEditButtonComponent> | undefined;
  @ViewChild('removeNg') removeNg: TemplateRef<DtDeleteButtonComponent> | undefined;

  @Input() tableCols: { title: string, data: string , type : ('img' | 'text'| 'bool' | 'active-inactive') }[] = [];

  @Input() dataObs: Observable<any> | undefined;

  @Input() activeFlag:string  = '';

  @Input() deactiveFlag:string  = '';
  
  @Input() flagColIndex: number = 0; 

  @Input() isEditNotNeeded:boolean = false;

  @Input() isDeleteNotNeeded:boolean = false;

  @Input() assetsImgPath:string = '/pdf/head_img/';

  @Output() Edit: EventEmitter<any> = new EventEmitter<any> ();

  @Output() Remove: EventEmitter<any> = new EventEmitter<any> ();

  @Output() ToggleActive: EventEmitter<any> = new EventEmitter<any> ();

  permissionSubscription: Subscription | undefined;
  dataObsSubscription: Subscription | undefined;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  toggleDeleteType: string = 'A';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next(this.dtOptions);
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

    colums.push({
      title:'Edit',
      width:'40px',
      name: 'edit',
      data: 'edit',
      className: 'dt-center editor-edit',
      defaultContent: '',
      ngTemplateRef: {
        ref: this.editNg,
        context: {
          captureEvents: this.onEdit.bind(this)
        }
      }
    })

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
        const assetsImgPath = this.assetsImgPath;
        colums.push({
          title: col.title,
          name: col.title,
          data: null,
          className: 'dt-center editor-edit',
          render: function (data: any, type: any, row: any) {
            const url = data[col.data].startsWith('http') ? data[col.data] :  assetsImgPath + data[col.data];

            return '<img style="width:150px;height:100%;" src="' + url +'" class="img-data" >';
          },
          orderable: false
        })
      }
    });

    colums.push({
      title:'Delete',
      name: 'Delete',
      width:'40px',
      data: 'flag',
      className: 'dt-center editor-edit',
      defaultContent: '',
      ngTemplateRef: {
        ref: this.removeNg,
        context: {
          captureEvents: this.onDelete.bind(this),
        }
      }
    })
    

    return colums;
  }

  reloadTable() {
    if (this.dtElement) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload()
        // console.log('reload');
      });
    }
  }

  onEdit(event: ComponentDataTableEventType) {
    this.Edit.emit(event.data);
  }

  onDelete(event: ComponentDataTableEventType) {
    this.Remove.emit(event.data);
  }

  onToggleActive(event: ComponentDataTableEventType){
    this.ToggleActive.emit(event.data);
  }
}
