import { ResponseModel } from "../../core/domain/response.model";
import { TestListItemModel } from "../../core/domain/test/testListItem.model";

export interface TestListEntity extends ResponseModel<TestListItemModel[]>{

}