import { Observable } from "rxjs";
import { AuthModel } from "../domain/auth/auth.model";

export abstract class IAuthService{
    abstract login(Email:string, Password:string ):Observable<AuthModel>;
}