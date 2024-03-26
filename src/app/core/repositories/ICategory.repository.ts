import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { CategoryModel } from "../domain/category/category.model";

export abstract class ICategoryRepository{
    abstract get():Observable<CategoryModel[]>;

    abstract getById(id:string):Observable<CategoryModel>;

    abstract  create(formData:FormData):Observable<SimpleResponse>;

    abstract update(id:string, formData:FormData):Observable<SimpleResponse>;

    abstract delete(id:string):Observable<SimpleResponse>;
}