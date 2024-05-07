import { Observable } from "rxjs";
import { UserListItemModel } from "../domain/users/user-list-item.model";

export abstract class IUserRepository{
    abstract getUserList():Observable<UserListItemModel[]>;
}