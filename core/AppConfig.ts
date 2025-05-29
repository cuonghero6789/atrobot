interface AppConfigType {
  API: {
    BASE_URL: string;
    WS_URL: string;
    TIMEOUT: number;
    RETRY_ATTEMPTS: number;
  };
  APP: {
    NAME: string;
    VERSION: string;
    BUILD_NUMBER: string;
  };
  LINKS: {
    TERMS: string;
    PRIVACY: string;
    SUPPORT: string;
  };
}

const defaultConfig: AppConfigType = {
  API: {
    BASE_URL: 'https://api.example.com',
    WS_URL: 'wss://api.example.com',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
  },
  APP: {
    NAME: 'App',
    VERSION: '1.0.0',
    BUILD_NUMBER: '1',
  },
  LINKS: {
    TERMS: 'https://example.com/terms',
    PRIVACY: 'https://example.com/privacy',
    SUPPORT: 'https://example.com/support',
  },
};

let config: AppConfigType = defaultConfig;

export const setConfig = (newConfig: Partial<AppConfigType>) => {
  config = { ...config, ...newConfig };
};

export const getConfig = () => config;

export default getConfig;
