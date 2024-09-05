module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser", // Use the TypeScript parser
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-native", "@typescript-eslint"],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react-native/no-unused-styles": "off",
    "react-native/split-platform-components": "warn",
    "react-native/no-inline-styles": "error",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
