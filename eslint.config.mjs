import { baseConfig } from "@motiq/eslint-config/base"
import { resolve } from "path"
import tseslint from "typescript-eslint"
import { fileURLToPath, URL } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
const tsconfigPath = resolve(__dirname, "tsconfig.json")

export default tseslint.config(
  ...baseConfig({
    project: [tsconfigPath],
    tsconfigRootDir: __dirname,
  }),
  {
    ignores: ["apps/**", "packages/**"],
    settings: {
      "import/resolver": {
        typescript: {
          project: tsconfigPath,
        },
      },
    },
  },
)
