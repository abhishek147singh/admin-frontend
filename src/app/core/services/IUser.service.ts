import { Observable } from "rxjs";
import { UserListItemModel } from "../domain/users/user-list-item.model";

export abstract class IUserService{
    abstract getUserList():Observable<UserListItemModel[]>;
}