import { Injectable } from "@angular/core";
import { Observable , map} from "rxjs";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { IQuestionRepository } from "../../core/repositories/IQuestion.repository";
import { QuestionModel } from "../../core/domain/questions/question.model";
import { SimpleResponse } from "../../core/domain/simple-response.model";
import { QuestionEntity } from "../../entity/questions/question.entity";
import { QuestionListEntity } from "../../entity/questions/questionList.entity";
import { QuestionListeItemModel } from "../../core/domain/questions/questionListItem.model";

@Injectable({
    providedIn: 'root'
})

export class QuestionRepository extends IQuestionRepository {
    
    baseUrl = baseUrl;
    
    constructor(private http:HttpClient){
        super();
    }

    override getAllQuestion(passageId: string): Observable<QuestionListeItemModel> {
        const url = `${baseUrl}/api/Questions/Passage/${passageId}`;

        return this.http.get<QuestionListEntity> (url).pipe(
                map((response) => {
                    if(response){
                        return response.data;
                    }
    
                    throw new Error(response);
                })
            );
    }

    override createQuestion(passageId: string, question: QuestionModel): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/Questions/Passage/${passageId}`;
        
        return this.http.post<SimpleResponse> (url, {
            "ques": question.ques,
            "optA": question.optA,
            "optB": question.optB,
            "optC": question.optC,
            "optD": question.optD,
            "optE": question.optE,
            "optRight": question.optRight,
            "explaniation": question.explaniation,
            "chapterId": question.chapterId,
            "level": question.level
          }).pipe(
                map((response) => {
                    if(response){
                        return response;
                    }
    
                    throw new Error(response);
                })
            );
    }

    override getQuestionById(questionId: string): Observable<QuestionModel> {
        const url = `${baseUrl}/api/Questions/${questionId}`;

        return this.http.get<QuestionEntity> (url).pipe(
                map((response) => {
                    if(response){
                        return response.data;
                    }
    
                    throw new Error(response);
                })
        );
    }

    override updateQuestion(questionId: string, question: QuestionModel): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/Questions/${questionId}`;

        return this.http.put<SimpleResponse> (url, {
            "ques": question.ques,
            "optA": question.optA,
            "optB": question.optB,
            "optC": question.optC,
            "optD": question.optD,
            "optE": question.optE,
            "optRight": question.optRight,
            "explaniation": question.explaniation,
            "chapterId": question.chapterId === '' ? undefined : question.chapterId,
            "level": question.level
        }).pipe(
                map((response) => {
                    if(response){
                        return response;
                    }
    
                    throw new Error(response);
                })
        );
    }

    override deleteQuestion(questionId: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/Questions/${questionId}`;

        return this.http.delete<SimpleResponse> (url).pipe(
                map((response) => {
                    if(response){
                        return response;
                    }
    
                    throw new Error(response);
                })
        );
    }

    override getAllVocabQuestion(vocabId: string): Observable<QuestionListeItemModel> {
        const url = `${baseUrl}/api/Questions/Vocab/${vocabId}`;

        return this.http.get<QuestionListEntity> (url).pipe(
                map((response) => {
                    if(response){
                        return response.data;
                    }
    
                    throw new Error(response);
                })
        );
    }

    override createVocabQuestion(vocabId: string, question: QuestionModel): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/Questions/Vocab/${vocabId}`;

        return this.http.post<SimpleResponse> (url, {
            "ques": question.ques,
            "optA": question.optA,
            "optB": question.optB,
            "optC": question.optC,
            "optD": question.optD,
            "optE": question.optE,
            "optRight": question.optRight,
            "explaniation": question.explaniation,
            "level": question.level
        }).pipe(
                map((response) => {
                    if(response){
                        return response;
                    }
    
                    throw new Error(response);
                })
        );
    }
}