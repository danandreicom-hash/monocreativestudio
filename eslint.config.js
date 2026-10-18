// @ts-check
import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  { ignores: ["dist/", ".astro/", "node_modules/"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      // Componentele Astro pot avea props neutilizate în frontmatter (destructurare parțială).
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // TypeScript nu detectează corect tipuri/globale ambientale (ex. HTMLElementTagNameMap) —
      // regula standard e să se dezactiveze în favoarea verificării de tipuri (`astro check`).
      "no-undef": "off",
    },
  },
  {
    // Fișierele de configurare rulează în Node, nu în browser.
    files: ["*.config.{js,mjs,ts}"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
);
