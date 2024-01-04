module.exports = {
  "printWidth": 120, // 设置单行输出(不折行)的最大长度

  "semi": false, // 句尾是否添加分号

  "singleQuote": true, // 使用单引号

  "trailingComma": "all", // 在任何可能的多行中输入尾逗号，如json的最后一个字段

  "bracketSpacing": true, // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格

  "jsxBracketSameLine": true, // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）

  "arrowParens": "always", // 为单行箭头函数的参数添加圆括号，参数个数为 1 时可以省略圆括号

  "tabWidth": 2, // 每行代码的缩进空格数

  "useTabs": false, // 使用tab（制表位）缩进而非空格

  "requirePragma": false, // (v1.7.0+) Prettier可以严格按照按照文件顶部的一些特殊的注释格式化代码，这些注释称为“require pragma”(必须杂注)

  "insertPragma": false, //  (v1.8.0+) Prettier可以在文件的顶部插入一个 @format的特殊注释，以表明改文件已经被Prettier格式化过了。
};