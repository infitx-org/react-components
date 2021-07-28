import SyntaxFormatter from "./SyntaxFormatter";

export default {
  title: "Components/SyntaxFormatter",
  component: SyntaxFormatter,
};

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>`;

const json = `{
  "name": "@modusbox/react-components",
  "files": [
    "lib"
  ],
  "dependencies": {
    "@modusbox/ts-utils": "^0.0.4",
    "babel-plugin-prismjs": "^2.1.0",
    "prismjs": "^1.24.1"
  },
  "devDependencies": {
    
    "stylelint-config-standard": "22",
    "stylelint-scss": "^3.19.0",
    "typescript": "^4.2.4"
  },
  "scripts": {
    "prepack": "yarn build",
    "build": "rollup -c rollup.config.js",
    "version": "node -pe 'require('./package.json').version'"
  },
  "jest": {
    "globals": {
      "window": {}
    }
  }
}
`;

const Template = (args) => (
  <SyntaxFormatter lang={args.lang} code={args.code} />
);

export const XMLSyntax = Template.bind({});
XMLSyntax.args = {
  code: xml,
  lang: "xml",
};

export const JSONSyntax = Template.bind({});
JSONSyntax.args = {
  code: json,
  lang: "json",
};
