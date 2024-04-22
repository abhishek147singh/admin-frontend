import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { IProductService } from "../core/services/IProduct.service";
import { ProductRepository } from "../data/repositories/product.repository";
import { ProductModel } from "../core/domain/product/product.model";

@Injectable({
    providedIn:'root'
}) 

export class ProductService extends IProductService{

    constructor(private productRepository : ProductRepository){
        super();
    }

    override get(): Observable<ProductModel[]> {
        return this.productRepository.get();
    }

    override searchProduct(query: string, category: string, brand: string): Observable<ProductModel[]> {
        return this.productRepository.searchProduct(query, category, brand);
    }

    override getById(id: string): Observable<ProductModel> {
        return this.productRepository.getById(id);
    }

    override create(formData: FormData): Observable<SimpleResponse> {
        return this.productRepository.create(formData);
    }

    override update(id: string, formData: FormData): Observable<SimpleResponse> {
        return this.productRepository.update(id, formData);
    }

    override delete(id: string): Observable<SimpleResponse> {
        return this.productRepository.delete(id);
    }
}