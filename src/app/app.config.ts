import {
  ApplicationConfig,
  provideEnvironmentInitializer,
  inject
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { ConfigService } from './services/config.service';
import { firstValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    ConfigService,
    provideEnvironmentInitializer(() => {
      const configService = inject(ConfigService);
      console.log('Environment initializer triggered');
      return firstValueFrom(configService.loadConfig()).then(config => {
        console.log('Config loaded, setting config...');
        configService.setConfig(config);
      });
    })
  ]
};
