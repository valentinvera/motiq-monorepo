import { reactConfig } from "@motiq/eslint-config/react-internal"
import { resolve } from "path"
import tseslint from "typescript-eslint"
import { fileURLToPath, URL } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
const tsconfigPath = resolve(__dirname, "tsconfig.json")

export default tseslint.config(
  ...reactConfig({
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
