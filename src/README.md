# @modusbox/react-components

A collection of Typescript utilities for the frontend apps.

### Installation

To install the module simply run `yarn add @modusbox/react-components`.


### Importing the styles

Styles are separated from components source code and they need to be imported manually.

The library allows to import the single bundled CSS file or to extend the SCSS source code.

#### CSS
All you need to do is to import the styles by including the `index.css`:
```ts
import '@modusbox/react-components/lib/index.css';
```

#### SCSS

Extending the SCSS is a bit more complex and requires a Sass loader enabled in your project.

You need to create your own SCSS file and import the `index.scss` from there:

```scss
// here you can override the exported variables building the themes
$color__primary: #f00;

// import the scss
@import 'node_modules/@modusbox/react-components/lib/index.scss';

```

