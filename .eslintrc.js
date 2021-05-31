module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
      project: './tsconfig.eslint.json',
  },
  rules: {
    "max-len": ["error", { "code": 120} ],
    "@typescript-eslint/no-unused-vars": ["error", { 
      "argsIgnorePattern": "^_"
    }],

    "class-methods-use-this": "off",

    "import/prefer-default-export": "off"
  }
};