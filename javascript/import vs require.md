

| commonjs模块（require）                                      | ES6模块(import)                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 输出的是一个值的拷贝                                         | 输出的是值的引用                                             |
| 运行时加载                                                   | 编译时输出接口                                               |
| 运行时才能得到对象，无法编译时做"静态优化" ,  ------------ 为什么？？ | 编译时加载, 使静态分析成为可能, 自动采用严格模式<br />export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。 变量只读，不可修改，对应属性可以改 |



> 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
>
> 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
>
> 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。
>



```javascript
// export-default.js
export default function foo() {
  console.log('foo');
}
// 或者写成
function foo() {
  console.log('foo');
}

export default foo;
```



```javascript
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入
```

