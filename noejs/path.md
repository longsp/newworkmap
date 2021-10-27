## 路径获取

- `dirname`: 获取文件的父文件夹。
- `basename`: 获取文件名部分。
- `extname`: 获取文件的扩展名。

例如：

```js
const notes = '/users/joe/notes.txt'

path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt

// 可以通过为 `basename` 指定第二个参数来获取不带扩展名的文件名：
path.basename(notes, path.extname(notes)) //notes
```



``` js
// 比如文件在 'c:/users/joe/test.js', 我们在users文件夹通过node joe/test.js 运行
process.cwd()  // 运行环境路径 c:/users
__dirname  // 文件所在路径   c:/users/joe
```



## 小总结

```csharp
小总结:
ext 扩展名
base 文件全名
dir 路径名（不包括文件名）
delimiter 分隔符
root 你懂的
----------------------------------------
path 路径 用win32、posix
path.basename(path[, ext]) 
返回最后一部分如index.html, ext为扩展名，加了后就不返回扩展名
path.delimiter 是分割符 ; 或 ： 用split分割
path.sep  路径分隔符 win: \, POSIX: /
path.dirname(path)  返回目录名，不包括当前
path.extname(path) 返回文件扩展名
path.format(pathObject) 把dir、root、base、name、ext组合，有优先级
path.isAbsolute(path)  判断是否为绝对路径
path.join([...paths])  组合路径
path.normalize(path)  规范化路径
path.parse(path) 和format 相反  返回对象dir、root、base、name、ext
path.relative(from, to)  from到to的相对路径，无参数有区别
path.resolve([...paths])  把片段路径解析为绝对路径，无参数返回当前
```



## 系统兼容问题

windows:  foo\\bar\\baz

mac:  foo/bar/baz

注意：在 Windows 上，斜杠字符（/）和反斜杠字符（\）都可作为路径分隔符； 但返回值中只用到反斜杠（\）。

解决办法1：  string.split(path.sep).join('/')