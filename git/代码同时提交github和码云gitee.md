# 如何将代码同时提交到Github和码云Gitee上

[TOC]

## **1. 多个远程仓库的使用**

多个远程仓库在项目中很少使用，但Git本身是支持的。

那让我们跟着一个案例来温习一下Git命令吧：案例代码已经在Github中托管了，现在要增加Gitee远程仓库。

### **1.1 查看远程仓库**

先来查看下当前项目的远程仓库

```text
git remote
```

不出意外，应该会输出：

```text
origin
```

这个`origin`就是一个指向远程仓库的名称，是你在`clone`时 `git` 为你默认创建的。

可以通过命令查看`origin`指向的远程仓库地址：

```text
git remote -v
```

输出结果：

```text
origin  https://github.com/gozhuyinglong/blog-demos.git (fetch)
origin  https://github.com/gozhuyinglong/blog-demos.git (push)
```

该命令会显示读写远程仓库的名称和地址，我这里指向的是Github。

### **1.2 远程仓库重命名**

既然这个地址是Github，为了好识别，就将名称改成 github 吧。输入命令： `git remote rename <old_remote> <new_remote>`

```text
git remote rename origin github
```

输入查看远程仓库命令，验证下是否成功，输出结果：

```text
github  https://github.com/gozhuyinglong/blog-demos.git (fetch)
github  https://github.com/gozhuyinglong/blog-demos.git (push)
```

成功！

### **1.3 添加另一个远程仓库**

下面我们再添加Gitee上的远程仓库，首先在Gitee上创建一个空的仓库，名称与Github上相同。

然后在【克隆/下载】处复制地址。

![img](https://pic3.zhimg.com/80/v2-d202fc494e844a37015fd96792794d26_720w.jpg)

输出添加远程仓库命令： `git remote add <remote> <url>`

```text
git remote add gitee https://gitee.com/gozhuyinglong/blog-demos.git
```

再来验证下是否成功，输出结果：

```text
gitee   https://gitee.com/gozhuyinglong/blog-demos.git (fetch)
gitee   https://gitee.com/gozhuyinglong/blog-demos.git (push)
github  https://github.com/gozhuyinglong/blog-demos.git (fetch)
github  https://github.com/gozhuyinglong/blog-demos.git (push)
```

成功！

### **1.4 多个远程仓库的推送/拉取**

有了多个远程仓库，推送和拉取再也不能像以前那样`git push`和`git pull`了，必须得加上远程仓库的名称，以识别操作的是哪个远程仓库。命令如下： `git push <remote> <branch>`、`git pull <remote> <branch>`：

```text
git push github main
git pull github main

git push gitee main
git pull gitee main
```

如果不想每次操作都带着分支，需要将本地分支与远程分支进行关联： `git branch --set-upstream-to=<remote>/<remote_branch> <local_branch>`

```text
git branch --set-upstream-to=gitee/main main
```

关联后就可以不指定分支了

```text
git push github
git pull github

git push gitee
git pull gitee
```

### **1.5 移除一个远程仓库**

如果想要移除一个远程仓库，可以使用下面命令： `git remote remove <remote>`或`git remote rm <remote>`

```text
git remote remove gitee
```

执行移除远程仓库后，该仓库在本地的所有分支与配置信息也会一并删除。

### 1.6 备注

增加多个仓库之后，实际是修改了.git/config文件, 内容如下

``` bash
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "github"]
	url = https://github.com/longsp/bezier.git
	fetch = +refs/heads/*:refs/remotes/github/*
[branch "master"]
	remote = gitee
	merge = refs/heads/master
[remote "gitee"]
	url = https://gitee.com/longsiping/bezier.git
	fetch = +refs/heads/*:refs/remotes/gitee/*

```

所以也可以直接修改此文件达到以上效果

**还有一个方案是码云有一个强制同步功能，但是没以上方法通用，故放弃。**

## **2. 常见错误及解决方案**

在执行上面操作当然不是一帆风顺的，如果你遇到一些错误，这里可能有你想要的答案。

### **2.1 提示未指定分支**

当在拉取时报下面错误：

```text
You asked to pull from the remote 'gitee', but did not specify
a branch. Because this is not the default configured remote
for your current branch, you must specify a branch on the command line.
```

表示本地分支与远程分支未做关联，进行关联一下即可，执行下面命令： `git branch --set-upstream-to=<remote>/<remote_branch> <your_branch>`

```text
git branch --set-upstream-to=gitee/main main
```

### **2.2 没有存储库的权限**

当执行推送操作时，提示下面信息：

```text
remote: You do not have permission push to this repository
fatal: unable to access 'https://gitee.com/gozhuyinglong/blog-demos.git/': The requested URL returned error: 403
```

表示没有远程仓库的权限，应该首先查看远程仓库是否公开，再检查本地账号和密码是否正确。

### **2.3 远程仓库未公开**

登录Gitee，检查该代码库是否公司。若未公开，则设置为公开。

### **2.4 Windows凭据中的账号和密码错误**

打开控制面板，点击【用户账户】

![img](https://pic2.zhimg.com/80/v2-8dc6df7c2f19068d7c0ebfa34b0670d9_720w.jpg)



再点击【管理Windows凭据】

![img](https://pic4.zhimg.com/80/v2-19661e33c29fd070570312d88a94bbeb_720w.jpg)



找到你的账号，修改账号和密码即可。

![img](https://pic3.zhimg.com/80/v2-5bde9f927d51b6a32c1e7ae7eab0b72a_720w.jpg)



### **2.5 删除Windows凭据，重新登录**

你也可以直接将Windows凭据删掉，当执行推送命令后，会弹出Windows安全中心登录框。

![img](https://pic2.zhimg.com/80/v2-0b076553251cc69fa3027289bedeb225_720w.jpg)



输入你的账号或密码就可以了。

### **2.6 无法弹出Windows安全中心登录**

如果无法弹出Windows安全中心登录框，则将其卸载掉，执行下面命令：

```text
git credential-manager uninstall
```

再重新下载并安装，下载地址： [https://github.com/microsoft/Git-Credential-Manager-for-Windows/releases](https://link.zhihu.com/?target=https%3A//github.com/microsoft/Git-Credential-Manager-for-Windows/releases)

![img](https://pic2.zhimg.com/80/v2-7744d11dff9b4df09ff83f842ffa5821_720w.jpg)



### **2.7 每次推送Github时弹出登录框，可以使用SSH地址**

如下图所示，当你每次`push`代码时，都会弹出下面登录框。

![img](https://pic4.zhimg.com/80/v2-d2571988106e710ecbfa746320c12977_720w.jpg)

我们可以将远程地址改为SSH地址：

![img](https://pic2.zhimg.com/80/v2-c9d57134c103166b8c2410f335086da5_720w.jpg)

移除现在的github地址，重新添加ssh地址，具体代码参照上文。

添加好地址后，还需要在github上设置SSH Key

### **2.8 生成SSH Key，并添加到Github**

输入下面命令来生成SSH Key，双引号内填写你的登录邮箱地址

```text
ssh-keygen -t rsa -C "xxxxx@xxxxx.com" 
```

如果弹出下面提示，直接回车即可。（若已存在，会提示是否替换，输入Y再回车）

![img](https://pic1.zhimg.com/80/v2-3fe1c2327ba93a318d05b59d4ead0f58_720w.jpg)



会在你的磁盘目录【C:\Users\你的用户名.ssh\】中生成公钥，将文件【id_rsa.pub】中的内存拷贝。

打开github的【SSH and GPG keys】页面，添加即可：

![img](https://pic2.zhimg.com/80/v2-f02914da34abd7d7ff5857eb5ea72ed1_720w.jpg)



## 3. 进阶玩法

可以加上git钩子，达到push的时候，gitee和github同时push

