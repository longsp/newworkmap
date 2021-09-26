
# 推荐一款很好用的图床工具picgo

## 前言

我们在写文章时，通常需要单独存储图片资源，不仅占用磁盘空间，而且不好管理。自从全面使用 Markdown 进行个人文件记录后，深感其在这图片处理的无力。但是，用了图床之后，一切都不一样了。那么在这里给大家介绍一下`picgo`是怎么使用的，配合我们的`gitee`一起使用，废话不多说。

## 正文

### PicGo

- PicGo: 一个用于快速上传图片并获取图片 URL 链接的工具 。
- PicGo 不仅是图片上传工具，同时也提供简易的图床相册管理功能。
- PicGo 开源且免费，跨平台支持 Windows、macOS、Linux 系统，使用极为简单。
- PicGo 支持 Markdown、HTML、URL、UBB 和 Custom 五种格式的链接，对于 Markdown 写作者而言，最常用的就是 Markdown 格式，当然也支持自定义 Custom 。

### 下载安装

> 下载的地址：`https://github.com/Molunerfinn/picgo/releases`

![image-20210628221506975](https://gitee.com/longsiping/blog-image/raw/master/img/picgo-gitee-7.awebp)

安装成功打开后如下图：

![image-20210628221611261](https://gitee.com/longsiping/blog-image/raw/master/img/picgo-gitee-6.awebp)

### 设置

1. 下载插件`gitee-uploader 1.1.2`，我这里下载安装成功了，如下图：

![image-20210628221836212](https://gitee.com/longsiping/blog-image/raw/master/img/picgo-gitee-5.awebp)

1. 点击左边图床设计，选择`gitee`图床，具体配置如下

- 设定仓库名，填写：gitee名/库名
- 分支，**默认填master**
- 设定Token，**下面会说明怎么生成token令牌**
- 指定存储路径，**默认填img/**
- 点击确定和设为默认图床

![image-20210628222031741](https://gitee.com/longsiping/blog-image/raw/master/img/picgo-gitee-4.awebp)

1. 登录自己的`gitee`，到自己的个人主页设置里面，然后选择私人秘钥，生成秘钥，我这里生成过了，就不再生成了，信息填写完毕点击确认即可。

![image-20210628222258889](https://gitee.com/longsiping/blog-image/raw/master/img/picgo-gitee-3.awebp)

1. Typora设置，文件—》偏好设置—》图像，按照下图的选择就行。

![image-20210628222737921](https://gitee.com/longsiping/blog-image/raw/master/img/picgo-gitee-2)

1. 验证：选择一张图片，复制到你的Typora中，看图片是否上传到你的`gitee`刚才设置的`repo`中。

![image-20210628223058699](https://gitee.com/longsiping/blog-image/raw/master/img/picgo-gitee-1)

## 结尾

我写这篇博客的时候，图片都上传到我的`gitee`上面了，是不是很简单，赶紧用起来吧。



作者：初念初恋
链接：https://juejin.cn/post/6978975135596281864
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

