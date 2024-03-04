import { Injectable } from "@angular/core";
import { IAuthRepository } from "../../core/repositories/IAuth.repository";
import { Observable , map} from "rxjs";
import { AuthModel } from "../../core/domain/auth/auth.model";
import { baseUrl } from "../../../environment";
import { AuthEntity } from "../../entity/auth/auth.entity";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AuthRepository extends IAuthRepository {
    baseUrl = baseUrl;
    
    constructor(private http:HttpClient){
        super();
    }

    override login(Username: string, Password: string): Observable<AuthModel> {
        const url = `${baseUrl}/api/Authentication/Login`;

       return this.http.post<AuthEntity> (url, { username: Username, pass: Password }).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );
    }

}