import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { Observable, take } from 'rxjs';
import { TableColType } from '../../../core/domain/Datatable/TableColType.model';
import { BrandService } from '../../../services/brand.service';
import { ToasterService } from '../../../services/toaster.service';
import { TableColEnum } from '../../../core/enumes/TableColDataType.enums';

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

  loading:boolean = false;

  brandForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    imageSrouce: new FormControl('', [Validators.required]),
  });

  @ViewChild('dttable') dttable:DatatableComponent|undefined;

  constructor(private brandService:BrandService, private toasterSerice:ToasterService){}

  ngOnInit(): void {
    this.dataObs = this.brandService.get();

    this.tableCols = [
      { title: 'Name', data: 'name' , type: TableColEnum.text},
      { title: 'Image', data: 'image' , type: TableColEnum.img}
    ];
  }

  get f() {
    return this.brandForm.controls;
  }

  create(){
    if(this.loading) return;
    const name = this.brandForm.get('name')?.value;
    const description = this.brandForm.get('description')?.value;
    const image = this.brandForm.get('image')?.value;
    const imageSource = this.brandForm.get('imageSrouce')?.value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', imageSource);

    this.loading = true;
    this.brandService.create(formData).pipe(take(1)).subscribe({
      next:data => {
        this.loading = false;
        this.toasterSerice.success('Create successfully!!');
        this.dttable?.reloadTable();
      },
      error:error => {
        this.loading = false;
        this.toasterSerice.error(error.message);
      }
    })

  }

  update(){
    if(this.loading) return;
    const name = this.brandForm.get('name')?.value;
    const description = this.brandForm.get('description')?.value;
    const image = this.brandForm.get('image')?.value;
    const imageSource = this.brandForm.get('imageSrouce')?.value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', imageSource || this.previewImage);

    this.loading = true;
    this.brandService.update(this.updateID, formData).pipe(take(1)).subscribe({
      next:(response => {
        this.loading = false;
        this.toasterSerice.success('Updated successfully!');
        this.dttable?.reloadTable();
      }),
      error:(error => {
        this.loading = false;
        this.toasterSerice.error('Unable to update proudct. Error: '+ error.message);
      })
    })
  }

  Edit(rowData:any) {
    const id = rowData._id;
    console.log('edit', id);

    this.brandService.getById(id).pipe(take(1)).subscribe({
      next:(response => {
        this.updateID = id;
        this.isUpdateMode = true;
        this.previewImage = response.image;
        this.brandForm.patchValue({
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

    this.brandService.delete(id).pipe(take(1)).subscribe({
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
