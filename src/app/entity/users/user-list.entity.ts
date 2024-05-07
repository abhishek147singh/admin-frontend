import { ResponseModel } from "../../core/domain/response.model";
import { UserListItemModel } from "../../core/domain/users/user-list-item.model";

export interface UserListEntity extends ResponseModel<UserListItemModel[]>{
    
}