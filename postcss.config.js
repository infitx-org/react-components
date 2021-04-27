module.exports = {
  parser: "postcss-scss",
  plugins: () => [
    require("postcss-mixins"),
    require("postcss-nested"),
    require("autoprefixer"),
  ],
};
