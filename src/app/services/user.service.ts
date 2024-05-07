import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUserService } from "../core/services/IUser.service";
import { UserRepository } from "../data/repositories/user.repository";
import { UserListItemModel } from "../core/domain/users/user-list-item.model";

@Injectable({
    providedIn:'root'
}) 

export class UserService extends IUserService{

    constructor(private orderRepository : UserRepository){
        super();
    }

    override getUserList(): Observable<UserListItemModel[]> {
        return this.orderRepository.getUserList();
    }
}