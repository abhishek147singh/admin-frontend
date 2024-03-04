export interface ResponseModel<T> {
    status:boolean;
    msg:string;
    data:T;
}