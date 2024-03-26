import { AuthModel } from "../../core/domain/auth/auth.model";
import { SecureStorageService } from "../../services/secureStorage.service";

export interface AuthState extends AuthModel{
    loading:boolean;
    error: string; 
}

export const initialState : AuthState = getIntialState();

function getIntialState(){
    const secureStorage = new SecureStorageService();
    const authState = secureStorage.getItem('auth');

    if(authState){
        return authState;
    }else{
        return {
            name: '',
            email: '',
            token: '',
            loading:false,
            error:''
        }
    }
}