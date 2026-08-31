import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next";

const eslintConfig = defineConfig([
  next,
  // Custom rules
  {
    rules: {
      // React best practices
      "react/no-unescaped-entities": "warn",
      "react/jsx-key": "error",
      "react/self-closing-comp": "error",
      
      // Accessibility
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/no-static-element-interactions": "warn",
      
      // Performance
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@next/next/no-img-element": "error", // Prefer next/image
      
      // SEO
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/html-has-lang": "error",
    },
  },
  // Override default ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
