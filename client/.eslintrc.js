module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: ['standard', 'plugin:react/recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'object-curly-newline': ['error', {
      'ObjectExpression': { 'multiline': true, 'minProperties': 1 },
    }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'no-tabs': ['error', { allowIndentationTabs: true }]
  },
  overrides: [
    {
      files: ['hardhat.config.js'],
      globals: { task: true },
    },
  ],
};
