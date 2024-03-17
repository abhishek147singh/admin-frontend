import { BrandModel } from "../../core/domain/brand/brand.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface BrandListEntity extends ResponseModel<BrandModel[]>{

}