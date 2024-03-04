import { AUTH_STATE } from "./auth/auth.actions";
import { AuthEffect } from "./auth/auth.effect";
import { authReducer } from "./auth/auth.reducer";

export const appReducer = {
    [AUTH_STATE]:authReducer,
};

export const appEffects = [
    AuthEffect
];