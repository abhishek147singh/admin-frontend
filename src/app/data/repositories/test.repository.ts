import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ITestRepository } from "../../core/repositories/ITest.repository";
import { SimpleResponse } from "../../core/domain/simple-response.model";
import { CreateTestModel } from "../../core/domain/test/createTest.model";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { TestByIdModel } from "../../core/domain/test/getTestById.model";
import { PassageModel } from "../../core/domain/test/passage.model";
import { TestListItemModel } from "../../core/domain/test/testListItem.model";
import { TestLevel } from "../../core/enumes/TestLevel.enum";
import { QuestionModel } from "../../core/domain/test/question.model";
import { TestListEntity } from "../../entity/test/testList.entity.model";
import { TestByIdEntity } from "../../entity/test/getTestById,entity";
import { PassageEntity } from "../../entity/test/passage.entity";
import { QuestionEntity } from "../../entity/test/question.entity";
import { DropdownTestListItemModel } from "../../core/domain/test/dropdownlistItem.model";
import { DropdownListEntity } from "../../entity/test/dropdownListItem.model";

@Injectable({
    providedIn: 'root'
})

export class TestRepository extends ITestRepository {
    
    baseUrl = baseUrl;
    
    constructor(private http:HttpClient){
        super();
    }

    override createTest(testModel: CreateTestModel): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/TestMaster`;

       return this.http.post<SimpleResponse> (url,  {
        name: testModel.name,
        level: testModel.level
       });
    }

    override getTestList(): Observable<TestListItemModel[]> {
        const url = `${baseUrl}/api/TestMaster`;

       return this.http.get<TestListEntity> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }

    override getTestDropdownList(): Observable<DropdownTestListItemModel[]> {
        const url = `${baseUrl}/api/TestMaster/NameWithId`;

       return this.http.get<DropdownListEntity> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }

    override getTestById(id: string): Observable<TestByIdModel> {
        const url = `${baseUrl}/api/TestMaster/${id}`;

       return this.http.get<TestByIdEntity> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }

    override updateTest(testId:string, name: string, isFree: boolean, isLaunched: boolean, level: TestLevel, isComingSoon: boolean, isHighlight: boolean):Observable<SimpleResponse> {
        const url = `${baseUrl}/api/TestMaster/${testId}`;

       return this.http.put<SimpleResponse> (url , { name, isFree, isComingSoon , isLaunched, level,  isHighlight}).pipe(
            map((response) => {
                if (response.status) {
                    return response;
                }

                throw new Error(response.msg);
            })
        );
    }
    
    override getPassage(TestId: string, PassageId: string): Observable<PassageModel> {
        const url = `${baseUrl}/api/TestMaster/${TestId}/${PassageId}`;

       return this.http.get<PassageEntity> (url ).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }

    override updatePassage(TestId: string, PassageId: string, passage:string, pssageReadingTime:number, questionAttempTime:number): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/TestMaster/${TestId}/${PassageId}`;

        return this.http.put<SimpleResponse> (url , { passage , pssageReadingTime, questionAttempTime }).pipe(
             map((response) => {
                 if (response.status) {
                     return response;
                 }
 
                 throw new Error(response.msg);
             })
         );
    }
    
    override getVocabQuestion(TestId: string, QuestionId: string): Observable<QuestionModel> {
        const url = `${baseUrl}/api/TestMaster/${TestId}/vocab/${QuestionId}`;

       return this.http.get<QuestionEntity> (url ).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }

    override updateVocabQuestion(TestId: string, QuestionId: string, Question: QuestionModel): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/TestMaster/${TestId}/vocab/${QuestionId}`;

       return this.http.put<SimpleResponse> (url, Question).pipe(
            map((response) => {
                if (response.status) {
                    return response;
                }

                throw new Error(response.msg);
            })
        );
    }

    override getQuestion(TestId: string, PassageId: string, QuestionId: string): Observable<QuestionModel> {
        const url = `${baseUrl}/api/TestMaster/${TestId}/${PassageId}/${QuestionId}`;

       return this.http.get<QuestionEntity> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }

    override updateQuestion(TestId: string, PassageId: string, QuestionId: string, Question: QuestionModel): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/TestMaster/${TestId}/${PassageId}/${QuestionId}`;

       return this.http.put<SimpleResponse> (url, Question).pipe(
            map((response) => {
                if (response.status) {
                    return response;
                }

                throw new Error(response.msg);
            })
        );
    }

    override deleteTest(TestId: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/TestMaster/${TestId}`;

       return this.http.delete<SimpleResponse> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response;
                }

                throw new Error(response.msg);
            })
        );
    }


}