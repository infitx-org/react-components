import copy from 'rollup-plugin-copy'
import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

const packageJson = require("./package.json");

export default {
  input: "src/components/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    babel({
      babelHelpers: "bundled",
    }),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      config: true,
      extract: true,
      minimize: true,
      namedExports: true
    }),
    copy({
      targets: [
        { src: 'src/components/**/*.scss', dest: 'lib', rename: (name, extension, fullPath) => `${fullPath.split('/').slice(2).join('/')}` },
        // { src: 'src/assets/scss', dest: 'lib' },
      ]
    })
  ]
};