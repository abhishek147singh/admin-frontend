import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { FreaturedProductModel } from "../domain/freatured-products/freatured-products.model";

export abstract class IFeaturedProductService{
    abstract addToList(id:string):Observable<SimpleResponse>;

    abstract getList():Observable<FreaturedProductModel[]>;
    
    abstract removeFromList(id:string):Observable<SimpleResponse>;
}