import { QuestionListeItemModel } from "../../core/domain/questions/questionListItem.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface QuestionListEntity extends ResponseModel<QuestionListeItemModel>{
    
}