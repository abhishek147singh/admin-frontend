import { Injectable } from "@angular/core";
import { CategoryRepository } from "../data/repositories/category.repository";
import { ICategoryService } from "../core/services/ICategory.service";
import { Observable } from "rxjs";
import { CategoryModel } from "../core/domain/category/category.model";
import { SimpleResponse } from "../core/domain/simple-response.model";

@Injectable({
    providedIn:'root'
}) 

export class CategoryService extends ICategoryService{

    constructor(private categoryRepository : CategoryRepository){
        super();
    }

    override get(): Observable<CategoryModel[]> {
        return this.categoryRepository.get();
    }

    override getById(id: string): Observable<CategoryModel> {
        return this.categoryRepository.getById(id);
    }

    override create(formData: FormData): Observable<SimpleResponse> {
        return this.categoryRepository.create(formData);
    }

    override update(id: string, formData: FormData): Observable<SimpleResponse> {
        return this.categoryRepository.update(id, formData);
    }

    override delete(id: string): Observable<SimpleResponse> {
        return this.categoryRepository.delete(id);
    }
}