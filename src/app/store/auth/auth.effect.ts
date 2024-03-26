import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, of, catchError } from "rxjs";
import { Router } from "@angular/router";
import { dummy, login, loginError, loginSuccess, logout } from "./auth.actions";
import { AuthService } from "../../services/auth.service";
import { SecureStorageService } from "../../services/secureStorage.service";

@Injectable()

export class AuthEffect {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router:Router,
        private secureStorageService:SecureStorageService
    ) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            switchMap((action) => {
                return this.authService.login(action.email, action.pass).pipe(
                    map((data) =>{ 
                        this.router.navigate([action.redirectionUrl]);
                        this.secureStorageService.setItem('auth', data);
                       return loginSuccess({ data });
                    }),
                    catchError((err) => {
                        console.error(err);
                       return of(loginError({message :err.message}));
                    })
                )
            })
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            switchMap((action) => {
                this.secureStorageService.removeItem('auth');
                this.router.navigate(['login']);
                return of(dummy());
            })
        )
    );
}
