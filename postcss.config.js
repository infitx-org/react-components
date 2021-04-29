module.exports = {
  parser: "postcss-scss",
  plugins: [
    require("postcss-import"),
    require("postcss-mixins"),
    require("postcss-advanced-variables"),
    require("postcss-nested"),
    require("autoprefixer"),
  ],
};
