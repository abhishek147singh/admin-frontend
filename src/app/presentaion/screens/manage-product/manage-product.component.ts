import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { Observable, take } from 'rxjs';
import { TableColType } from '../../../core/domain/Datatable/TableColType.model';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { ToasterService } from '../../../services/toaster.service';
import { BrandService } from '../../../services/brand.service';
import { CategoryService } from '../../../services/category.service';
import { CategoryModel } from '../../../core/domain/category/category.model';
import { BrandModel } from '../../../core/domain/brand/brand.model';
import { AsyncPipe } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { TableColEnum } from '../../../core/enumes/TableColDataType.enums';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CKEditorModule, DatatableComponent, AsyncPipe],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.scss'
})

export class ManageProductComponent implements OnInit{
  isUpdateMode:boolean = false;
  updateId:string = '';
  previewImage:string = '';

  dataObs:Observable<any> | undefined;
  tableCols: TableColType[] = [];

  categoryList$:Observable<CategoryModel[]> | undefined;
  brandList$:Observable<BrandModel[]> | undefined;

  loading:boolean = false;

  productForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    discreption: new FormControl('', [Validators.required]),
    information: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    countInStock: new FormControl(0, [Validators.required]),
    discount: new FormControl(0, [Validators.required]),
    image: new FormControl('', [Validators.required]),
    imageSrouce: new FormControl('', [Validators.required]),
  });

  @ViewChild('dttable') dttable:DatatableComponent|undefined; 

  constructor(
    private toasterService:ToasterService, 
    private brandService:BrandService,
    private categoryService:CategoryService,
    private productService:ProductService
  ){}

  ngOnInit(): void {
    this.dataObs = this.productService.get();

    this.categoryList$ = this.categoryService.get();
    this.brandList$ = this.brandService.get();

    this.tableCols = [
      { title: 'Name', data: 'name' , type: TableColEnum.text},
      { title: 'Brand', data: 'brand' , type: TableColEnum.text},
      { title: 'Category', data: 'category' , type: TableColEnum.text},
      { title: 'Price', data: 'price' , type: TableColEnum.text},
      { title: 'Number', data: 'countInStock' , type: TableColEnum.text},
      { title: 'Image', data: 'img' , type: TableColEnum.img}
    ];
  }

  get f() {
    return this.productForm.controls;
  }


  createProduct(){
    if(this.loading) return;

    const name = this.productForm.get('name')?.value;
    const brand = this.productForm.get('brand')?.value;
    const category = this.productForm.get('category')?.value;
    const discreption = this.productForm.get('discreption')?.value;
    const price = this.productForm.get('price')?.value;
    const countInStock = this.productForm.get('countInStock')?.value;
    const discount = this.productForm.get('discount')?.value;
    const image = this.productForm.get('image')?.value;
    const imageSrouce = this.productForm.get('imageSrouce')?.value;
    const information = this.productForm.get('information')?.value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('description', discreption);
    formData.append('countInStock', countInStock);
    formData.append('image', imageSrouce);
    formData.append('discount', discount);
    formData.append('information', information);
    
    this.loading = true;
    this.productService.create(formData).pipe(take(1)).subscribe({
      next:(response => {
        this.loading = false;
        this.toasterService.success(response.msg);
        this.dttable?.reloadTable();
      }),
      error:(error => {
        this.loading = false;
        this.toasterService.error(error.message);
      })
    })
  }

  updateProduct(){
    const name = this.productForm.get('name')?.value;
    const brand = this.productForm.get('brand')?.value;
    const category = this.productForm.get('category')?.value;
    const discreption = this.productForm.get('discreption')?.value;
    const price = this.productForm.get('price')?.value;
    const countInStock = this.productForm.get('countInStock')?.value;
    const discount = this.productForm.get('discount')?.value;
    const image = this.productForm.get('image')?.value;
    const imageSrouce = this.productForm.get('imageSrouce')?.value;
    const information = this.productForm.get('information')?.value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('description', discreption);
    formData.append('countInStock', countInStock);
    formData.append('discount', discount);
    formData.append('image', imageSrouce);
    formData.append('information', information);

    this.loading = true;
    this.productService.update(this.updateId, formData).pipe(take(1)).subscribe({
      next:(response => {
        this.loading = false;
        this.toasterService.success(response.msg);
        this.dttable?.reloadTable();
      }),
      error:(error => {
        this.loading = false;
        this.toasterService.error(error.message);
      })
    })
  }

  Edit(rowData:any) {
    const id = rowData._id;
    this.productService.getById(id).pipe(take(1)).subscribe({
      next:(response => {
        this.updateId = id;
        this.isUpdateMode = true;
        this.previewImage = response.img;
        this.productForm.patchValue({
          name: response.name,
          brand: response.brand,
          category: response.category,
          discreption: response.description,
          price: response.price,
          countInStock: response.countInStock,
          discount:response.discount,
          information:response.information, 
          image: '',
          imageSrouce:'',
        });
      }),
      error:(error => {
        this.toasterService.error(error.message);
      })
    })
  }

  Delete(rowData:any) {
    const id = rowData._id;

    this.productService.delete(id).pipe(take(1)).subscribe({
      next:(response => {
        this.toasterService.success(response.msg);
        this.dttable?.reloadTable();
      }),
      error:(error => {
        this.toasterService.error(error.message);
      })
    })
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
      discount:0,
      information:''
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
