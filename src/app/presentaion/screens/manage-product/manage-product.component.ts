import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/Datatable/TableColType.model';
import { DatatableComponent } from '../../components/datatable/datatable.component';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CKEditorModule, DatatableComponent],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.scss'
})

export class ManageProductComponent implements OnInit{
  isUpdateMode:boolean = false;
  updateId:string = '';
  previewImage:string = '';

  dataObs:Observable<any> | undefined;
  tableCols: TableColType[] = [];


  productForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    discreption: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    countInStock: new FormControl('', [Validators.required]),
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
      { title: 'Brand', data: 'brand' , type: 'text'},
      { title: 'Category', data: 'category' , type: 'text'},
      { title: 'Price', data: 'price' , type: 'text'},
      { title: 'Number', data: 'countInStock' , type: 'text'},
      { title: 'Image', data: 'image' , type: 'img'}
    ];
  }

  get f() {
    return this.productForm.controls;
  }


  createProduct(){

  }

  updateProduct(){

  }

  Edit(rowData:any) {
    console.log('edit', rowData)
  }

  Delete(rowData:any) {
    console.log('delete', rowData);
  }

  clearForm(){
    this.isUpdateMode = false;
    this.updateId = '';
    this.previewImage = '';
    this.productForm.patchValue({
      name: '',
      brand: '',
      category: '',
      discreption: '',
      price: 0,
      countInStock: 0,
      image: '',
      imageSrouce: '',
    })
  }

  onImageUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.patchValue({
        'imageSrouce': file
      });

      const reader = new FileReader();
      reader.onload = e => this.previewImage = reader.result as string;
  
      reader.readAsDataURL(file);
    }
  }
}
