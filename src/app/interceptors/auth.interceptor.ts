import{
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Router } from '@angular/router';

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getAuth } from '../store/auth/auth.selectors';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const store = inject(Store<AppState>);

    let token = '';
    store.select(getAuth).pipe(take(1)).subscribe((data => {
        token = data.token;
    }));

    const newReq = req.clone({
        withCredentials:true,
        headers:req.headers.append('authorization', token)
    });

    const router = inject(Router);

    return next(newReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                router.navigate(['/login']);
            }

        return new Observable<HttpEvent<any>>();
    })
    );
};
