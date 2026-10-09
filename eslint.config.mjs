import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";
import { readdirSync } from "node:fs";

const features = readdirSync(new URL("./src/features", import.meta.url), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const APP_IMPORT = {
  group: ["@/app/**"],
  message: "Routes are the top layer. Nothing outside src/app may import from it.",
};

/**
 * Module boundaries. Dependencies point one way:
 *
 *   app → features → components / config / lib / server
 *
 * Shared code never reaches up into a feature, and features stay independent
 * of each other, which leaves src/app as the only place they get composed.
 */
const boundaries = [
  {
    files: ["src/components/**", "src/config/**", "src/lib/**", "src/server/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/**"],
              message:
                "Shared code must not depend on a feature. Pass the data in, or compose in src/app.",
            },
            APP_IMPORT,
          ],
        },
      ],
    },
  },
  ...features.map((feature) => ({
    files: [`src/features/${feature}/**`],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: features
                .filter((other) => other !== feature)
                .map((other) => `@/features/${other}/**`),
              message:
                "Features must not import from each other. Compose them in src/app, or move the shared part to src/components or src/lib.",
            },
            APP_IMPORT,
          ],
        },
      ],
    },
  })),
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
  ...boundaries,
  globalIgnores([".next/**", "out/**", "build/**", "coverage/**", "next-env.d.ts"]),
  eslintConfigPrettier,
]);

export default eslintConfig;
