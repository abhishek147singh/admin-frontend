import { Injectable } from "@angular/core";
import { IAuthService } from "../core/services/IAuth.service";
import { AuthRepository } from "../data/repositories/auth.repository";
import { Observable } from "rxjs";
import { AuthModel } from "../core/domain/auth/auth.model";

@Injectable({
    providedIn:'root'
}) 

export class AuthService extends IAuthService{

    constructor(private authRepository : AuthRepository){
        super();
    }

    override login(Email:string, Password:string): Observable<AuthModel> {
        return this.authRepository.login(Email , Password);
    }
}