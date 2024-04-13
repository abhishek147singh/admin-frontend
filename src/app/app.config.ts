import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { appEffects, appReducer } from './store';
import { provideHttpClient , withInterceptors} from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideStore(appReducer), 
    provideHttpClient(withInterceptors([authInterceptor])), 
    provideAnimations(), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideEffects(appEffects)]
};