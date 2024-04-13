import{
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Router } from '@angular/router';

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const router = inject(Router);

    const newRequest = req.clone({
        withCredentials:true
    });

    return next(newRequest).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                router.navigate(['/login']);
            }

        return new Observable<HttpEvent<any>>();
    })
    );
};
