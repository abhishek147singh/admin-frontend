import { Observable } from "rxjs";
import { AuthModel } from "../domain/auth/auth.model";

export abstract class IAuthRepository{
    abstract login(Email:string, Password:string):Observable<AuthModel>;
}