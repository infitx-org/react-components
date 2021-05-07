module.exports ={
  "env": {
    "browser": true
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb-typescript",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "rules": {
    "import/prefer-default-export": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/label-has-associated-control": [ "error", {
      "required": {
        "some": [ "nesting", "id" ]
      }
    }]
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "rules": {
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off",
        "react/prop-types": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-curly-newline": "off",
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
}
