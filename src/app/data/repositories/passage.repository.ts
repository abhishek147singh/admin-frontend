import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { baseUrl } from "../../../environment";
import { IPassageRepository } from "../../core/repositories/IPassage.repository";
import { SimpleResponse } from "../../core/domain/simple-response.model";
import { PassageModel } from "../../core/domain/passage/passage.model";
import { PassageEntity } from "../../entity/passage/passage.entity";
import { PassageDropdownListItemModel } from "../../core/domain/passage/passageDropDownListItem.model";
import { PassageDropdownListEntity } from "../../entity/passage/passageDropdownListItem.entity";

@Injectable({
    providedIn: 'root'
})

export class PassageRepository extends IPassageRepository {
    
    baseUrl = baseUrl;
    
    constructor(private http:HttpClient){
        super();
    }

    override getAll(testId: string): Observable<PassageModel[]> {
        const url = `${baseUrl}/api/Passage/${testId}`;
        

        return this.http.get<PassageDropdownListEntity> (url).pipe(
                map((response) => {
                    if(response){
                        return response.data;
                    }
    
                    throw new Error(response);
                })
            );
    }

    override getPassageDropdownList(testId: string): Observable<PassageDropdownListItemModel[]> {
        const url = `${baseUrl}/api/Passage/NameWithId/${testId}`;

        return this.http.get<PassageDropdownListEntity> (url).pipe(
                map((response) => {
                    if(response){
                        return response.data;
                    }
    
                    throw new Error(response);
                })
            );
    }

    override createPassage(testId: string, passageName: string, passageReadTime: number, questionAttempTime: number, passage: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/Passage/${testId}`;

        return this.http.post<SimpleResponse> (url, { summary: passage, name:passageName, passageReadingTime:passageReadTime, questionAttempTime:questionAttempTime }).pipe(
                map((response) => {
                    if(response){
                        return response;
                    }
    
                    throw new Error(response);
                })
            );
    }

    override getPassageById(passageId: string): Observable<PassageModel> {
        const url = `${baseUrl}/api/Passage/Single/${passageId}`;

        return this.http.get<PassageEntity> (url).pipe(
                map((response) => {
                    if(response){
                        return response.data;
                    }
    
                    throw new Error(response);
                })
            );
    }

    override updatePassage(passageId: string, passageName: string, passageReadTime: number, questionAttempTime: number, passage: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/Passage/${passageId}`;

        return this.http.put<SimpleResponse> (url, { summary: passage, name:passageName, passageReadingTime:passageReadTime, questionAttempTime:questionAttempTime }).pipe(
                map((response) => {
                    if(response){
                        return response;
                    }
    
                    throw new Error(response);
                })
            );
    }

    override deletePassage(passageId: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/Passage/${passageId}`;

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