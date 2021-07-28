module.exports = {
  "plugins": [
    ["prismjs", {
      "languages": ["markup", "xml", "json"],
      "plugins": ["line-numbers"],
    }]
  ],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ],
};
