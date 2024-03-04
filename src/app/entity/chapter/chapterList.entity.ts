import { chapterModel } from "../../core/domain/chapter/chapter.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface ChapterListEntity extends ResponseModel<chapterModel[]>{

}