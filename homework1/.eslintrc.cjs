module.exports = {
  env: {
    node: true,
    es2021: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
  },
}
