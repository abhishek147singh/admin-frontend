import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { IChapterRepository } from "../../core/repositories/IChapter.repository";
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "../../../environment";
import { chapterModel } from "../../core/domain/chapter/chapter.model";
import { ChapterListEntity } from "../../entity/chapter/chapterList.entity";
import { ChapterEntity } from "../../entity/chapter/chapter.entity";

@Injectable({
    providedIn: 'root'
})

export class ChapterRepository extends IChapterRepository {

    baseUrl = baseUrl;
    
    constructor(private http:HttpClient){
        super();
    }

    override getAll(): Observable<chapterModel[]> {
        const url = `${baseUrl}/api/Chapter`;

        return this.http.get<ChapterListEntity> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        )
    }

    override createChapter(chapterName:string):Observable<any> {
        const url = `${baseUrl}/api/Chapter`;

       return this.http.post(url, { chapterName });
    }

    override getChapterById(id: string): Observable<chapterModel> {
        const url = `${baseUrl}/api/Chapter/${id}`;

       return this.http.get<ChapterEntity> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }

    override updateChapter(id: string, ChapterName: string): Observable<any> {
        const url = `${baseUrl}/api/Chapter/${id}`;

       return this.http.put(url, { ChapterName});
    }

    override deleteChapter(id: string): Observable<any> {
        const url = `${baseUrl}/api/Chapter/${id}`;

        return this.http.delete(url);
    }

}