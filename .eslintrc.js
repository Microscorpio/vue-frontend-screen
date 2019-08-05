// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // https://eslint.org/docs/rules/no-console#disallow-the-use-of-console-no-console
    "no-console": [
      2,
      {
        "allow": ["warn", "error", "dir", "info", "log"]
      }
    ],
    // https://eslint.org/docs/rules/no-debugger
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    //定义数组或对象最后多余的逗号
    "comma-dangle": 0,
    //函数定义时括号前面要不要有空格
    "space-before-function-paren": 0,
    //语句强制分号结尾
    semi: [0, "never"],
    "no-unused-vars": [
      2,
      {
        // 允许声明未使用变量
        vars: "local",
        // 参数不检查
        args: "none"
      }
    ],
    //空行最多不能超过100行
    "no-multiple-empty-lines": [0, { max: 100 }],
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    "space-comment": [0],
    "brace-style": [0],
    "no-multi-spaces": 0,
    "no-use-v-if-with-v-for": 0,
    "no-case-declarations": 0
  },
  globals: {}
};
