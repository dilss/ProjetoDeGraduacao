import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { keycloakFactory } from './keycloak.factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: keycloakFactory,
      multi: true,
    },
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    MessageService,
    ConfirmationService,
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(KeycloakAngularModule),
  ],
};
