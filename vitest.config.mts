import path from 'path';
import { defineConfig } from 'vitest/config';
import { InlineConfig } from 'vitest';

// 单元测试相关配置
const testConfig: InlineConfig = {
  include:
    process.env.NODE_ENV === 'test-snap'
      ? ['test/snap/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
      : ['src/**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  globals: true,
  environment: 'jsdom',
  testTimeout: 16000,
  transformMode: {
    web: [/\.[jt]sx$/],
  },
  coverage: {
    provider: 'istanbul',
    exclude: ['src/**.{js,ts}', 'src/_common/**', 'src/_util/**', 'src/**/{__test__,_example,style}/**'],
    reporter: ['text', 'json', 'html'],
    reportsDirectory: 'test/coverage',
  },
};

export default defineConfig({
  resolve: {
    alias: {
      'tdesign-mobile-react/es': path.resolve(__dirname, './src/'),
      'tdesign-mobile-react': path.resolve(__dirname, './src/'),
      '@test/utils': path.resolve(__dirname, './test/utils'),
    },
  },
  test: testConfig,
});
