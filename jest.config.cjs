// Proyecto/Backend/jest.config.cjs
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/health.test.js',
    '**/routes/test/**/*.test.js',
    '**/models/test/**/*.test.js', 
    '**/tests/app.behavior.test.js',
    '**/controllers/test/**/*.test.js',
    '**/services/test/**/*.test.js'
  
  ], 

  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'html'],

  // Solo las clases con las que se cuentan los test
  collectCoverageFrom: [
    //'app.js',
    'routes/**/*.js',
    //'models/**/*.js',
    'controllers/**/*.js',
    'services/**/*.js'
  ],

  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],

  // Umbral para poder cumplir al 80% 
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80,
      branches: 75,
      statements: 80
    }
  }
};
