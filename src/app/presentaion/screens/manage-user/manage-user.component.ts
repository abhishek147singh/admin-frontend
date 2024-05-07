import { Component, OnInit, ViewChild } from '@angular/core';
import { TableColEnum } from '../../../core/enumes/TableColDataType.enums';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/Datatable/TableColType.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [DatatableComponent],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit {
  dataObs:Observable<any> | undefined;
  tableCols: TableColType[] = [];

  @ViewChild('dttable') dttable:DatatableComponent|undefined;

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.dataObs = this.userService.getUserList();

    this.tableCols = [
      { title: 'Email', data: 'email' , type: TableColEnum.text},
      { title: 'Name', data: 'name' , type: TableColEnum.text},
      { title: 'Profile', data: 'profile' , type: TableColEnum.img},
      { title: 'IsAdmin', data: 'isAdmin' , type: TableColEnum.text},
    ];
  }
}
