import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8000/graphql",
  documents: ["src/**/*.{ts,tsx}", "!src/__generated__/**/*"], // Exclude generated files
  generates: {
    "./src/__generated__/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./src/__generated__/types.ts": {
      plugins: ["typescript"], // Only generate base types
    },
  },
};

export default config;
