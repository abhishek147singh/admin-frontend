import { Action, createReducer, on } from "@ngrx/store";
import { AuthState, initialState } from "./auth.state";
import { login, loginError, loginSuccess, logout } from "./auth.actions";


const _authReducer = createReducer(
    initialState,
    
    on(login , (state , action) => {
        return {...state , loading: true};
    }),
    
    on(loginSuccess, (state , action) => {
        const newState = {...state, loading: false , ...action.data};
        return newState;
    }),
    
    on(loginError, (state , action) => {
        return {...state, loading:false, error: action.message};
    }),

    on(logout , (state , acion) => {

        return {   
            name: '',
            email: '',
            token: '',
            loading:false,
            error:''
        };
    })
);


export function authReducer(state: AuthState | undefined , action : Action){
    return _authReducer(state , action);
}