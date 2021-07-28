module.exports = {
  "plugins": [
    ["prismjs", {
      "languages": ["markup", "json"],
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
