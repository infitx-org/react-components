import copy from 'rollup-plugin-copy'
import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

// export default {
//   input: "./src/components/index.ts",
//   output: [
//     {
//       dir: "lib",
//       format: "cjs",
//       sourcemap: true,
//     },
//   ],
//   plugins: [
//     babel({
//       babelHelpers: "bundled",
//     }),
//     postcss({
//       config: true,
//       extract: true,
//       minimize: true,
//     }),
//     peerDepsExternal(),
//     typescript(),
//     // commonjs(),
//     copy({
//       targets: [
//         { src: 'src/assets/scss', dest: 'lib' },
//       ]
//     })
//   ],
// };


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
    }),
    copy({
      targets: [
        { src: 'src/assets/scss', dest: 'lib' },
      ]
    })
  ]
};