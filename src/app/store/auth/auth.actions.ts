import { createAction, props } from "@ngrx/store";
import { AuthModel } from "../../core/domain/auth/auth.model";

export const AUTH_STATE = 'auth';

const loginAction = '[login page] login';
const loginSuccessAction = '[login page] login success';
const loginErrorAction = '[login page] login error';

const logoutAction = '[login page] logout';

export const login = createAction(loginAction , props<{ email: string , pass: string , redirectionUrl:string }> ());
export const loginSuccess = createAction(loginSuccessAction , props<{ data : AuthModel }> ());
export const loginError = createAction(loginErrorAction , props<{ message:string }> ());

export const logout = createAction(logoutAction);

export const dummy = createAction('dummy Action');