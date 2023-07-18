// http://zhufengpeixun.com/strong/html/128.rollup.html#t81.4%20%E6%94%AF%E6%8C%81babel
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.cjs.js", //输出文件的路径和名称
    format: "umd", //五种输出格式：amd/es6/iife/umd/cjs
    name: "bundleName", //当format为iife和umd时必须提供，将作为全局变量挂在window下

    globals: {
      lodash: "_", //告诉rollup全局变量_即是lodash
      jquery: "$", //告诉rollup全局变量$即是jquery
    },
  },
  plugins: [
    // 1、处理ES6新语法
    babel({
      exclude: "node_modules/**",
    }),

    // 2、支持第三方打包进去，例如 lodash
    resolve(),
    commonjs(),

    // 3、支持ts
    typescript(),

    // 4、压缩JS
    terser(),

    // 5、支持css
    postcss()
  ],
  external: ["lodash", "jquery"],
};
