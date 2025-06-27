import globals from "globals"
import tseslint from "typescript-eslint"
import { baseConfig } from "./base.js"

/**
 * @param {object} options
 * @param {string[]} options.project
 * @param {string} options.tsconfigRootDir
 */

export const nestConfig = ({ project, tsconfigRootDir }) =>
  tseslint.config(
    ...baseConfig({ project, tsconfigRootDir }),
    {
      languageOptions: {
        globals: {
          ...globals.node,
        },
      },
    },
    {
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": "warn",
        "@typescript-eslint/no-unsafe-argument": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-function": "off",
      },
    },
  )
