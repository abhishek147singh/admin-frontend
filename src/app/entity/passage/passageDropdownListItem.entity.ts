import { PassageModel } from "../../core/domain/passage/passage.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface PassageDropdownListEntity extends ResponseModel<PassageModel[]>{
    
}