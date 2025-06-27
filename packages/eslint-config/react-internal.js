import pluginReact from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"
import { baseConfig } from "./base.js"

/**
 * @param {object} options
 * @param {string[]} options.project
 * @param {string} options.tsconfigRootDir
 */

export const reactConfig = ({ project, tsconfigRootDir }) =>
  tseslint.config(...baseConfig({ project, tsconfigRootDir }), {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
      ...pluginReact.configs.flat.recommended?.languageOptions,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  })
