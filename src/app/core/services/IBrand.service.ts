import { Observable } from "rxjs";
import { BrandModel } from "../domain/brand/brand.model";
import { SimpleResponse } from "../domain/simple-response.model";

export abstract class IBrandService{
    abstract get():Observable<BrandModel[]>;

    abstract getById(id:string):Observable<BrandModel>;

    abstract  create(formData:FormData):Observable<SimpleResponse>;

    abstract update(id:string, formData:FormData):Observable<SimpleResponse>;

    abstract delete(id:string):Observable<SimpleResponse>;
}