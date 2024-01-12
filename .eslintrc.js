module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // 在 ts 项目中解析器必须是它才能检测和规范 TS 代码
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest', // 指定解析器支持的 ES 版本
    sourceType: 'module', // 指定源代码的类型，module 代表es6模块语法
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    // 自动检测 React 的版本
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],

  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
}
