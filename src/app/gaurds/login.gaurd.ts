import { inject } from "@angular/core";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { Store } from "@ngrx/store";
import { map } from "rxjs";
import { AppState } from "../store/app.state";
import { getAuth } from "../store/auth/auth.selectors";

export const LoginGaurd:CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    const store:Store<AppState> = inject(Store<AppState>);
    const router = inject(Router);

    return store.select(getAuth).pipe(
        map(authData => {
            if(!authData.tocken || authData.tocken === ''){
                
                return router.parseUrl('login');
            }

            return true;
        })
    )
};