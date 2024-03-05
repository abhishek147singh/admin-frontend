import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/Datatable/TableColType.model';

@Component({
  selector: 'app-manage-brand',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CKEditorModule, DatatableComponent],
  templateUrl: './manage-brand.component.html',
  styleUrl: './manage-brand.component.scss'
})
export class ManageBrandComponent implements OnInit {
  isUpdateMode:boolean = false;
  updateID:string = '';
  previewImage:string = '';
  
  dataObs:Observable<any> | undefined;
  tableCols: TableColType[] = [];

  brandForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    imageSrouce: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.dataObs = new Observable(observer => {
      observer.next([]),
      observer.complete();
    });

    this.tableCols = [
      { title: 'Name', data: 'name' , type: 'text'},
      { title: 'Image', data: 'image' , type: 'img'}
    ];
  }

  get f() {
    return this.brandForm.controls;
  }

  create(){

  }

  update(){

  }

  Edit(rowData:any) {
    console.log('edit', rowData)
  }

  Delete(rowData:any) {
    console.log('delete', rowData);
  }

  clearForm(){
    this.isUpdateMode = false;
    this.updateID = '';
    this.previewImage = '';
    this.brandForm.patchValue({
      name:'',
      description:'',
      image:'',
      imageSrouce:''
    });
  }

  onImageUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.brandForm.patchValue({
        'imageSrouce': file
      });

      const reader = new FileReader();
      reader.onload = e => this.previewImage = reader.result as string;
  
      reader.readAsDataURL(file);
    }
  }
}
