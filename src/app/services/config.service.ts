import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import {
  AppConfig,
  EndpointPaths,
} from '../models/app-config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private configSubject = new ReplaySubject<AppConfig>(1)
  private config!: AppConfig;

  constructor(private http: HttpClient) {}

  // Load config.json from public folder
  loadConfig(): Observable<AppConfig> {
    console.log('this.config 3', this.config)
    return this.http.get<AppConfig>('/config.json');
  }

  // Save config in memory after loading
  setConfig(config: AppConfig): void {
    console.log('[ConfigService] setConfig called1');
    this.config = config;
     this.configSubject.next(config);

    console.log('[ConfigService] setConfig called 2 ', config);
  }

  get config$(): Observable<AppConfig> {
    return this.configSubject.asObservable();
  }

  // Get base URL based on current environment
  get apiBaseUrl(): string {
    const env = this.config?.env || 'development';
    return this.config?.environments?.[env]?.api?.baseUrl || '';
  }

  // Get endpoints based on current environment
  get endpointPaths(): EndpointPaths {
    const env = this.config?.env;
    console.log('this.config?.environments?.[env]', env)
    return this.config?.environments?.[env]?.api?.endpoints || {};
  }

  // Get entire config
  get configValue(): AppConfig {
    console.log('config 2', this.config)
    return this.config;
  }

  // Get full API URL using endpoint key and optional ID
  getApiUrl(endpointKey: string, id?: string): string {
    const endpointPath = this.endpointPaths?.[endpointKey];
    console.log('endpointPath', endpointPath, this.endpointPaths)
    if (!endpointPath) {
      console.warn(`Endpoint key "${endpointKey}" not found in config.`);
      return '';
    }
    return `${this.apiBaseUrl}${endpointPath}${id ?? ''}`;
  }
}
