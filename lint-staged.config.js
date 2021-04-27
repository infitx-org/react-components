module.exports = {
  "src/**/*.{js,ts,tsx,json}": [
    "./node_modules/.bin/eslint --fix",
    "./node_modules/.bin/prettier --write",
    "yarn lint",
  ],
};
