import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IFeaturedProductService } from "../core/services/IFeaturedProduct.service";
import { FeaturedProductRepository } from "../data/repositories/featured-product.repository";
import { FreaturedProductModel } from "../core/domain/freatured-products/freatured-products.model";
import { SimpleResponse } from "../core/domain/simple-response.model";

@Injectable({
    providedIn:'root'
}) 

export class FeaturedProductService extends IFeaturedProductService{

    constructor(private featuredProRepository : FeaturedProductRepository){
        super();
    }

    override addToList(id: string): Observable<SimpleResponse> {
        return this.featuredProRepository.addToList(id);
    }
    
    override getList(): Observable<FreaturedProductModel[]> {
        return this.featuredProRepository.getList();
    }
    
    override removeFromList(id: string): Observable<SimpleResponse> {
        return this.featuredProRepository.removeFromList(id);
    }

}