import { terser } from "rollup-plugin-terser";
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';
import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import svgr from '@svgr/rollup';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

const packageJson = require("./package.json");

function renameScss(name, extension, fullPath) {
  return `${fullPath.split('/').slice(1).join('/')}`;
}

export default {
  input: "src/index.ts",
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
    terser(),
    peerDepsExternal(),
    svgr(),
    babel({
      babelHelpers: "bundled",
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.build.json',
      useTsconfigDeclarationDir: true
    }),
    scss({
      output: 'lib/index.css',
      processor: css => postcss([autoprefixer()]),
    }),
    copy({
      targets: [
        { src: 'src/index.scss', dest: 'lib', rename: renameScss },
        { src: 'src/scss/*.scss', dest: 'lib', rename: renameScss },
        { src: 'src/components/*.scss', dest: 'lib', renameScss },
      ]
    }),
  ],
};