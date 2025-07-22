import nextJest from 'next/jest';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
const config = {
    modulePaths: ['<rootDir>'],
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/app/**',
        '!**/services/**',
        '!**/interfaces/**',
        '!**/hooks/**',
        '!**/store/**',
        '!**/node_modules/**',
        '!**/.next/**',
        '!**/.vercel/**',
        '!**/coverage/**',
        '!**/public/**',
        '!**/jest.config.ts',
        '!**/jest.setup.ts',
        '!**/__mocks__/**',
        '!**/__tests__/**',
        '!**/test/**',
        '!**/tests/**',
        '!**/config/**',
        '!<rootDir>/*.config.{js,ts}',
        '!**/*.test.{js,jsx,ts,tsx}',
    ],
    testEnvironment: 'jest-environment-jsdom',

    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
