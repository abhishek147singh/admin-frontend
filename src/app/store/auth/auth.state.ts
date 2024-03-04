import { AuthModel } from "../../core/domain/auth/auth.model";
import { SecureStorageService } from "../../services/secureStorage.service";

export interface AuthState extends AuthModel{
    loading:boolean;
    error: string; 
}

export const initialState : AuthState = getInitialState();

function getInitialState(){

    if(typeof window !== 'undefined'){
        const secureStorageService = new SecureStorageService();
        const result = secureStorageService.getItem('auth');

        if(result.userName){
            return result;
        }
    }

    return {
        userName: '',
        profile: '',
        tocken: '',
        loading:false,
        error:''
    };
}