import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { createRequire } from "node:module";

import sass from 'rollup-plugin-sass';

import terser from "@rollup/plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import image from '@rollup/plugin-image';

//import { visualizer } from "rollup-plugin-visualizer";


const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

const production = !process.env.ROLLUP_WATCH;

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                inlineDynamicImports: true,
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                inlineDynamicImports: true,
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),

            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),

            sass({
                output: "dist/main.css",
            }),

            image(),


            production && terser(),

  //          visualizer(),
    ],
    },
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [
            dts(),
            ],

        external: [/\.(s?css)$/],
    },
];
