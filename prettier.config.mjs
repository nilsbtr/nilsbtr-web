/** @type {import("prettier").Config} */
const config = {
  useTabs: false,
  tabWidth: 2,
  printWidth: 100,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",
  overrides: [
    {
      files: "*.md",
      options: {
        proseWrap: "preserve",
      },
    },
  ],
  importOrder: ["^react(-dom)?$", "^next(/.*)?$", "<THIRD_PARTY_MODULES>", "^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderSideEffects: false,
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
};

export default config;
