[TOC]

## CRLF and LF

| 标志 | 英文全称                  | 意义     | 程序上的表示    |
| ---- | ------------------------- | -------- | --------------- |
| CR   | Carriage Return           | 回车     | （0x0D）（\r）  |
| LF   | Line Feed                 | 换行     | （0x0A）（ \n） |
| CRLF | Carriage Return Line Feed | 回车换行 | \r\n            |

在 Windows 上默认的是CRLF

在 Linux/MacOS 上则是LF

## core.autocrlf

在Windows平台上，git默认的core.autocrlf是true，可以通过`git config --list`命令查看。

![image-20211028104453762](Git%20core.autocrlf%20%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E.assets/image-20211028104453762.png)

```git
// 提交时（git add）转换为LF，检出时(git checkout)转换为CRLF
git config --global core.autocrlf true

// 提交时转换为LF，检出时不转换
git config --global core.autocrlf input

// 提交检出均不转换
git config --global core.autocrlf false
```



## core.safecrlf

```git
// 拒绝提交包含混合换行符的文件
$ git config --global core.safecrlf true

// 允许提交包含混合换行符的文件
$ git config --global core.safecrlf false 

// 提交包含混合换行符的文件时给出警告
$ git config --global core.safecrlf warn
```



## 最终方案

- Unix/Mac 设置

```
$ git config --global core.autocrlf input
$ git config --global core.safecrlf true
```

- windows上设置

```git
$ git config --global core.autocrlf true
$ git config --global core.safecrlf true
```



## 进阶方案

以上方案为本机

