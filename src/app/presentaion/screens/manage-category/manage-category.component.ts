import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { TableColType } from '../../../core/domain/Datatable/TableColType.model';
import { ToasterService } from '../../../services/toaster.service';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { CategoryService } from '../../../services/category.service';
import { CKEditorModule } from 'ng2-ckeditor';

@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CKEditorModule, DatatableComponent],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent  implements OnInit {
  isUpdateMode:boolean = false;
  updateID:string = '';
  previewImage:string = '';
  
  dataObs:Observable<any> | undefined;
  tableCols: TableColType[] = [];

  categoryForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    imageSrouce: new FormControl('', [Validators.required]),
  });

  @ViewChild('dttable') dttable:DatatableComponent|undefined;

  constructor(private categoryService:CategoryService, private toasterSerice:ToasterService){}

  ngOnInit(): void {
    this.dataObs = this.categoryService.get();

    this.tableCols = [
      { title: 'Name', data: 'name' , type: 'text'},
      { title: 'Image', data: 'image' , type: 'img'}
    ];
  }

  get f() {
    return this.categoryForm.controls;
  }

  create(){
    const name = this.categoryForm.get('name')?.value;
    const description = this.categoryForm.get('description')?.value;
    const image = this.categoryForm.get('image')?.value;
    const imageSource = this.categoryForm.get('imageSrouce')?.value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', imageSource);

    this.categoryService.create(formData).pipe(take(1)).subscribe({
      next:data => {
        this.toasterSerice.success('Create successfully!!');
        this.dttable?.reloadTable();
      },
      error:error => {
        this.toasterSerice.error(error.message);
      }
    })

  }

  update(){
    const name = this.categoryForm.get('name')?.value;
    const description = this.categoryForm.get('description')?.value;
    const image = this.categoryForm.get('image')?.value;
    const imageSource = this.categoryForm.get('imageSrouce')?.value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', imageSource || this.previewImage);

    this.categoryService.update(this.updateID, formData).pipe(take(1)).subscribe({
      next:(response => {
        this.toasterSerice.success('Updated successfully!');
        this.dttable?.reloadTable();
      }),
      error:(error => {
        this.toasterSerice.error('Unable to update proudct. Error: '+ error.message);
      })
    })
  }

  Edit(rowData:any) {
    const id = rowData._id;
    console.log('edit', id);

    this.categoryService.getById(id).pipe(take(1)).subscribe({
      next:(response => {
        this.updateID = id;
        this.isUpdateMode = true;
        this.previewImage = response.image; 

        this.categoryForm.patchValue({
          name:response.name,
          description:response.description,
          image:'',
          imageSrouce:''
        })
      }),
      error:(error => {
        this.toasterSerice.error('Unable to fetch product, Error:'+ error.message);
      })
    })
    
  }

  Delete(rowData:any) {
    const id = rowData._id;
    console.log('delete', id);

    this.categoryService.delete(id).pipe(take(1)).subscribe({
      next:(response => {
        this.toasterSerice.success('Deleted successfully!!');
        this.dttable?.reloadTable();
      }),
      error:(error => {
        this.toasterSerice.error('Unable to delete, Error: '+ error.message);
      })
    })
  }

  clearForm(){
    this.isUpdateMode = false;
    this.updateID = '';
    this.previewImage = '';
    this.categoryForm.patchValue({
      name:'',
      description:'',
      image:'',
      imageSrouce:''
    });
  }

  onImageUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.categoryForm.patchValue({
        'imageSrouce': file
      });

      const reader = new FileReader();
      reader.onload = e => this.previewImage = reader.result as string;
  
      reader.readAsDataURL(file);
    }
  }
}
