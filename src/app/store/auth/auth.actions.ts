import { createAction, props } from "@ngrx/store";
import { AuthModel } from "../../core/domain/auth/auth.model";

export const AUTH_STATE = 'auth';

export const loginAction = '[login page] login';
export const loginSuccessAction = '[login page] login success';
export const loginErrorAction = '[login page] login error';

export const logoutAction = '[login page] logout';

export const login = createAction(loginAction , props<{ username: string , pass: string , redirectionUrl:string }> ());
export const loginSuccess = createAction(loginSuccessAction , props<{ data : AuthModel }> ());
export const loginError = createAction(loginErrorAction , props<{ message:string }> ());

export const logout = createAction(logoutAction);

export const dummy = createAction('dummy Action');