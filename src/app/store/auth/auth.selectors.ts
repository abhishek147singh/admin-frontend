import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { AUTH_STATE } from "./auth.actions";

export const getAuthState = createFeatureSelector<AuthState> (AUTH_STATE);

export const getAuth = createSelector(
    getAuthState,
    (state) => state
);