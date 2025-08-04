export interface EndpointPaths {
  alcoholicDrinks: string;
  drinkDetails: string;
  [key: string]: string;
}

export interface EnvironmentConfig {
  api: {
    baseUrl: string;
    endpoints: EndpointPaths;
  };
}

export interface NavLink {
  label: string;
  path: string;
}

export interface BrandConfig {
  appName: string;
  logoUrl: string;
}

export interface AppConfig {
  env: 'development' | 'production';
  environments: {
    development: EnvironmentConfig;
    production: EnvironmentConfig;
  };
  brand?: BrandConfig;
  navLinks?: NavLink[];
}
