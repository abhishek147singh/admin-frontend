import { Injectable } from "@angular/core";
import { IBrandService } from "../core/services/IBrand.service";
import { BrandRepository } from "../data/repositories/brand.reposiotry";
import { Observable } from "rxjs";
import { BrandModel } from "../core/domain/brand/brand.model";
import { SimpleResponse } from "../core/domain/simple-response.model";

@Injectable({
    providedIn:'root'
}) 

export class BrandService extends IBrandService{

    constructor(private brandRepository : BrandRepository){
        super();
    }

    override get(): Observable<BrandModel[]> {
        return this.brandRepository.get();
    }

    override getById(id: string): Observable<BrandModel> {
        return this.brandRepository.getById(id);
    }

    override create(formData: FormData): Observable<SimpleResponse> {
        return this.brandRepository.create(formData);
    }

    override update(id: string, formData: FormData): Observable<SimpleResponse> {
        return this.brandRepository.update(id, formData);
    }

    override delete(id: string): Observable<SimpleResponse> {
        return this.brandRepository.delete(id);
    }
}