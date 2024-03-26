import { ProductModel } from "../../core/domain/product/product.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface ProductListEntity extends ResponseModel<ProductModel[]>{
    
}