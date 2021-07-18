module.exports = {
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    "eslint-config-airbnb",
    "plugin:jest/recommended"
  ],
  env: {
    "browser": true,
    "node": true,
    "jasmine": true
  },
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',  // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,  // Allows for the parsing of JSX
    },
    project: './tsconfig.json',
  },
  plugins: ["import"],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/interface-name-prefix": { prefixWithI: "always" },
    "react/prop-types": false,
    //"semi": "off",
    //"@typescript-eslint/semi": ["error"],
    "no-console": "warn",
    "react/destructuring-assignment": [true, "always", { "ignoreClassFields": false }],
    //"import/no-relative-parent-imports": ["warn"],
    "import/no-unresolved": "error",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
    "react/jsx-props-no-spreading": [{
      "html": "ignore",
      "custom": "ignore",
      "explicitSpread": "ignore"
    }],
    "import/prefer-default-export": 'off',
    "import/no-extraneous-dependencies": ["error", { "devDependencies": ["**/*.test.ts?", "**/*.spec.ts?", "**/story.ts?"] }]
  },
  settings: {
    react: {
      version: 'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      "typescript": {},
    },
  },
};
