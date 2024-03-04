import { AUTH_STATE } from "./auth/auth.actions";
import { AuthState } from "./auth/auth.state";

export interface AppState{
    // [MANAGE_TEST_STATE]:TestModel,
    [AUTH_STATE]:AuthState,
}