module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '../',
    testRegex: '.*(spec|test)\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^generated/prisma$': '<rootDir>/test/mock/prisma.ts',
    },
};