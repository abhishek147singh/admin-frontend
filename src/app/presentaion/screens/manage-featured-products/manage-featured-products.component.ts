import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { Observable, take } from 'rxjs';
import { TableColType } from '../../../core/domain/Datatable/TableColType.model';
import { BrandModel } from '../../../core/domain/brand/brand.model';
import { CategoryModel } from '../../../core/domain/category/category.model';
import { BrandService } from '../../../services/brand.service';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { ToasterService } from '../../../services/toaster.service';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { FeaturedProductService } from '../../../services/featured-product.service';
import { SearchedProductModel } from '../../../core/domain/freatured-products/searched-product.model';
import { TableColEnum } from '../../../core/enumes/TableColDataType.enums';

@Component({
  selector: 'app-manage-featured-products',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CKEditorModule, DatatableComponent, AsyncPipe],
  templateUrl: './manage-featured-products.component.html',
  styleUrl: './manage-featured-products.component.scss'
})
export class ManageFeaturedProductsComponent implements OnInit{
  isUpdateMode:boolean = false;
  updateId:string = '';
  previewImage:string = '';

  dataObs:Observable<any> | undefined;
  tableCols: TableColType[] = [];
  searchProductsTableCols: TableColType[] = [];

  categoryList$:Observable<CategoryModel[]> | undefined;
  brandList$:Observable<BrandModel[]> | undefined;

  searchedProductList$:Observable<SearchedProductModel[]> | undefined;

  productForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  @ViewChild('dttable') dttable:DatatableComponent|undefined; 
  @ViewChild('sptable') sptable:DatatableComponent|undefined; 

  constructor(
    private toasterService:ToasterService, 
    private brandService:BrandService,
    private categoryService:CategoryService,
    private productService:ProductService,
    private featuredProductService:FeaturedProductService
  ){}

  ngOnInit(): void {
    this.dataObs = this.featuredProductService.getList();
    this.searchedProductList$ = new Observable(observer => {
      observer.next([]);
      observer.complete();
    })

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

    this.searchProductsTableCols = [
      { title: 'Name', data: 'name' , type: TableColEnum.text},
      { title: 'Brand', data: 'brand' , type: TableColEnum.text},
      { title: 'Category', data: 'category' , type: TableColEnum.text},
      { title: 'Image', data: 'img' , type: TableColEnum.img}
    ];
  }

  get f() {
    return this.productForm.controls;
  }

  searchProduct(){
    const name = this.productForm.get('name')?.value;
    const brand = this.productForm.get('brand')?.value;
    const category = this.productForm.get('category')?.value;

    this.searchedProductList$ = this.productService.searchProduct(name, category, brand);
    if(this.sptable){
      this.sptable.reloadTable();
    }
  }

  addProduct(rowData:any){
    const id = rowData._id;
    this.featuredProductService.addToList(id).pipe(take(1)).subscribe({
      next:(response => {
        this.toasterService.success('Product added to featured Products list.');
        if(this.sptable){
          this.sptable.reloadTable();
        }
        if(this.dttable){
          this.dttable.reloadTable();
        }
      }),
      error:(error => {
        this.toasterService.error('Product is not added to featured Products list.');
      })
    })
  }  

  Delete(rowData:any) {
    const id = rowData._id;

    console.log(id);
    this.featuredProductService.removeFromList(id).pipe(take(1)).subscribe({
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
