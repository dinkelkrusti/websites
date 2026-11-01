// @ts-check
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettierConfig from "eslint-config-prettier";

export default defineConfig(
  { ignores: ["dist/", ".astro/"] },

  {
    files: ["**/*.{js,mjs,cjs,ts,astro}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      astro.configs.recommended,
      astro.configs["jsx-a11y-strict"],
    ],
  },

  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["astro.config.mjs"],
    languageOptions: { globals: { process: "readonly" } },
  },
  prettierConfig,
);
