module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // 'eslint:recommanded',
    'plugin:react/recommended',
    'plugin:testing-library/react',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
