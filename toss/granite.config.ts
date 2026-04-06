import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'semophone',
  brand: {
    displayName: '세모구독',
    primaryColor: '#8B5CF6',
    icon: 'https://semophone.vibers.co.kr/favicon.ico',
  },
  web: {
    host: 'localhost',
    port: 3407,
    commands: { dev: 'vite', build: 'vite build' },
  },
  permissions: [],
  webViewProps: { type: 'partner' },
});
