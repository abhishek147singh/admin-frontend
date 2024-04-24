import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { ProductModel } from "../domain/product/product.model";
import { SearchedProductModel } from "../domain/freatured-products/searched-product.model";

export abstract class IProductRepository{
    abstract get():Observable<ProductModel[]>;

    abstract searchProduct(query:string, category:string, brand:string):Observable<SearchedProductModel[]>;

    abstract getById(id:string):Observable<ProductModel>;

    abstract  create(formData:FormData):Observable<SimpleResponse>;

    abstract update(id:string, formData:FormData):Observable<SimpleResponse>;

    abstract delete(id:string):Observable<SimpleResponse>;
}