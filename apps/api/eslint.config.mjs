import { nestConfig } from "@motiq/eslint-config/nest"
import { resolve } from "path"
import tseslint from "typescript-eslint"
import { fileURLToPath, URL } from "url"

// @ts-expect-error
const __dirname = fileURLToPath(new URL(".", import.meta.url))
const tsconfigPath = resolve(__dirname, "tsconfig.json")

export default tseslint.config(
  ...nestConfig({
    project: [tsconfigPath],
    tsconfigRootDir: __dirname,
  }),
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: tsconfigPath,
        },
      },
    },
  },
)
