import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.resolve(__dirname, '.', `.env.${process.env.TARGET}`),
});
const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  reporter: [['json', {  outputFile: 'test-results/test-results.json' }]],
  webServer: {
    command: 'PORT=4000 node ./.output/server/index.mjs',
    port: 4000,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: devices['Desktop Chrome landscape'],
    },
    {
      name: 'iPhone 13',
      use: devices['iPhone 13'],
    },
  ],
};

export default config;
