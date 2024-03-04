import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICategoryRepository } from "../../core/repositories/ICategory.repository";
import { categoryModel } from "../../core/domain/category/category.model";
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "../../../environment";

@Injectable({
    providedIn: 'root'
})

export class CategoryRepository extends ICategoryRepository {

    baseUrl = baseUrl;
    
    constructor(private http:HttpClient){
        super();
    }

    override getAll(): Observable<categoryModel[]> {
        const url = `${baseUrl}/api/Category`;

        return this.http.get<categoryModel[]> (url);
    }

    override createCategory(categoryName:string):Observable<any> {
        const url = `${baseUrl}/api/Category`;

       return this.http.post(url, { categoryName });
    }

    override getCategoryById(id: string): Observable<categoryModel> {
        const url = `${baseUrl}/api/Category/${id}`;

       return this.http.get<categoryModel> (url);
    }

    override updateCategory(id: string, categoryName: string): Observable<any> {
        const url = `${baseUrl}/api/Category/${id}`;

       return this.http.put(url, { categoryName});
    }

    override deleteCategory(id: string): Observable<any> {
        const url = `${baseUrl}/api/Category/${id}`;

        return this.http.delete(url);
    }

}