import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import { EndOfLineState } from 'typescript';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierPlugin,
  {
    ignores: ['**/dist/**', '**/node_modules/**', 'eslint.config.mjs'],
  },
];