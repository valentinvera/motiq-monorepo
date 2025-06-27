import eslint from "@eslint/js"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import pluginImport from "eslint-plugin-import"
import onlyWarn from "eslint-plugin-only-warn"
import turboPlugin from "eslint-plugin-turbo"
import tseslint from "typescript-eslint"

/**
 * @param {object} options
 * @param {string[]} options.project
 * @param {string} options.tsconfigRootDir
 */

export const baseConfig = ({ project, tsconfigRootDir }) =>
  tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintConfigPrettier,
    {
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          sourceType: "module",
          ...(project && { project }),
          ...(tsconfigRootDir && { tsconfigRootDir }),
        },
      },
      plugins: {
        "@typescript-eslint": tsPlugin,
        turbo: turboPlugin,
        onlyWarn,
        import: pluginImport,
      },
      rules: {
        "turbo/no-undeclared-env-vars": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        "no-console": ["warn", { allow: ["warn", "error"] }],
      },
      ignores: ["dist/**", "node_modules/**", ".turbo/**", "**/eslint.config.{js,mjs}"],
    },
  )
