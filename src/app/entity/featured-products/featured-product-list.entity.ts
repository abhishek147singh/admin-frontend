import { FreaturedProductModel } from "../../core/domain/freatured-products/freatured-products.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface FeaturedProductListEntity extends ResponseModel<FreaturedProductModel[]>{
    
}