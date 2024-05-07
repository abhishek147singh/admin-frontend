import { Injectable } from "@angular/core";
import { IAuthRepository } from "../../core/repositories/IAuth.repository";
import { Observable , map} from "rxjs";
import { AuthModel } from "../../core/domain/auth/auth.model";
import { baseUrl } from "../../../environment";
import { AuthEntity } from "../../entity/auth/auth.entity";
import { HttpClient } from "@angular/common/http";
import { IUserRepository } from "../../core/repositories/IUser.repository";
import { UserListItemModel } from "../../core/domain/users/user-list-item.model";
import { UserListEntity } from "../../entity/users/user-list.entity";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { getAuth } from "../../store/auth/auth.selectors";

@Injectable({
    providedIn: 'root'
})

export class UserRepository extends IUserRepository{
    baseUrl = baseUrl;
    token = '';

    constructor(private http:HttpClient, private store:Store<AppState>){
        super();

        this.store.select(getAuth).subscribe({
            next:(authState => {
                this.token = authState.token; 
            })
        })
    }

    override getUserList(): Observable<UserListItemModel[]> {
        const url = `${baseUrl}/api/user`;
        
        return this.http.get<UserListEntity> (url, {
            headers:{'authorization': this.token}
        }).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.msg);
            })
        );   
    }
}