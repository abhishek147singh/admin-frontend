import { VocabQuestionModel } from "../../core/domain/questions/vocabQuestion.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface VocabQuestionListEntity extends ResponseModel<VocabQuestionModel[]> {

}