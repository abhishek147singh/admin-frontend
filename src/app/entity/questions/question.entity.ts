import { QuestionModel } from "../../core/domain/questions/question.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface QuestionEntity extends ResponseModel<QuestionModel>{
    
}