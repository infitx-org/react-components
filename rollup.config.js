import copy from 'rollup-plugin-copy'
import { babel } from "@rollup/plugin-babel";
import postcss from 'rollup-plugin-postcss';
// import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/components/index.ts",
  output: [
    {
      dir: "lib",
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      babelHelpers: "bundled",
    }),
    postcss({
      config: true,
      extract: true,
      minimize: true,
    }),
    peerDepsExternal(),
    // resolve(),
    typescript(),
    copy({
      targets: [
        { src: 'src/assets/scss', dest: 'lib' },
      ]
    })
  ],
};