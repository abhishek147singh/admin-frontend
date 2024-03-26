import { CategoryModel } from "../../core/domain/category/category.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface CategoryListEntity extends ResponseModel<CategoryModel[]>{
    
}