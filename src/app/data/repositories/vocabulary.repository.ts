import { Injectable } from "@angular/core";
import { Observable , map} from "rxjs";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { IVocabularyRepository } from "../../core/repositories/IVocabulary.repository";
import { SimpleResponse } from "../../core/domain/simple-response.model";
import { VocabularyModel } from "../../core/domain/vocabulary/vocabulary.model";
import { VocabularyEntity } from "../../entity/vocabulary/vocab.entity";
import { VocabListEntity } from "../../entity/vocabulary/vocabList.entity";
import { VocabularyListItemModel } from "../../core/domain/vocabulary/vocabularyList.model";
import { VocabDropdownListItemModel } from "../../core/domain/vocabulary/vocabDropdownListItem.model";

@Injectable({
    providedIn: 'root'
})

export class VocabularyRepository extends IVocabularyRepository {
    baseUrl = baseUrl;
    
    constructor(private http:HttpClient){
        super();
    }

    override getAll(testId: string): Observable<VocabularyListItemModel[]> {
        const url = `${baseUrl}/api/Vocab/${testId}`;

        return this.http.get<VocabListEntity> (url).pipe(
                map((response) => {
                    if(response){
                        return response.data;
                    }
    
                    throw new Error(response);
                })
            );
    }

    override getDropdownList(testId:string): Observable<VocabDropdownListItemModel[]> {
        const url = `${baseUrl}/api/Vocab/NameWithId/${testId}`;

        return this.http.get<VocabListEntity> (url).pipe(
                map((response) => {
                    if(response){
                        return response.data;
                    }
    
                    throw new Error(response);
                })
            );
    }

    override createVocab(testId: string, passageId: string, vocabName: string, summary: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/Vocab/${testId}/${passageId}`;

        return this.http.post<SimpleResponse> (url, { summary: summary, name: vocabName, passageId}).pipe(
                map((response) => {
                    if(response){
                        return response;
                    }
    
                    throw new Error(response);
                })
            );
    }

    override getVocabById(vocabId: string): Observable<VocabularyModel> {
        const url = `${baseUrl}/api/Vocab/Single/${vocabId}`;

        return this.http.get<VocabularyEntity> (url).pipe(
                map((response) => {
                    if(response){
                        return response.data;
                    }
    
                    throw new Error(response);
                })
            );
    }

    override updateVocab(vocabId: string,passageId:string, vocabName: string, summary: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/Vocab/${vocabId}`;

        return this.http.put<SimpleResponse> (url, { summary: summary, name:vocabName, passageId }).pipe(
                map((response) => {
                    if(response){
                        return response;
                    }
    
                    throw new Error(response);
                })
        );
    }

    override deleteVocab(vocabId: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/Vocab/${vocabId}`;

        return this.http.delete<SimpleResponse> (url).pipe(
                map((response) => {
                    if(response){
                        return response;
                    }
    
                    throw new Error(response);
                })
        );
    }
}