







摘自： https://www.jianshu.com/p/fa4d5963b6c8

我猜点进来看的客官，至少都是使用过 Git 的。另外有些客官，可能知道，如果 Git 的换行符处理不当，就会产生某些问题。还有一些客官，也许正在忍受由于换行符处理不当所带来的各种问题。

# 究竟会有啥问题，我咋不知道？

在描述问题之前，先简要的说一些背景知识。技术大牛大可直接略过。

由于历史原因，不同的操作系统，在处理换行符时，使用了不同的方案。Windows 操作系统使用了 `CRLF`，而 Unix 阵营的操作系统则使用了 `LF`。Mac OS 最起初使用了 `CR`，后来到了 Mac OS X 后，改成了使用 `LF`，与 Unix 阵营保持了一致。虽然目前很多代码编辑器都支持自动识别和切换换行符风格，然而，总有那么一些不合群的编辑器，无法达到相应的兼容性。

所以，作为一个使用不限于 Git 的版本控制系统的程序猿，你很可能会遇到与换行符相关的尴尬局面。

# 第1层问题：被毁掉的 diff 工具

- 执行`git status` 命令，凡是打开过的文件，无论是否改过，其状态都是已修改的状态……
- 同事说他只改了一行代码，然而我看 diff，发现整个文件都被改了……

以上两个问题，在跨平台的项目开发过程中，会经常出现。问题背后的原理，其实很简单。你的代码编辑器兼容性不强，在打开一个与自身默认的换行符风格不符的文件时，编辑器就自作主张，自动地将换行符风格转换成自己的默认风格，并保存了下来。于是便出现了**明明没有改动，却被标记为修改状态**的现象。

这个问题确实讨厌。因为一旦出现该问题，diff 工具的功效便瞬间大打折扣。当然通过使用 `git diff -w`，自动忽略掉空白字符修改，可以很大程度减少问题带来的影响，但是，Git 提交历史中充斥着的大量毫无意义的换行符修改记录，同样会持续性的消耗开发人员有限而宝贵的精力。

所以，有人想出了一个方案：只要我们全部保持统一，只用一种换行风格就可以了。Git 其实也给出了解决方案。在 Windows 平台安装 Git 时，肯定遇到过这样一个选项：

![img](https:////upload-images.jianshu.io/upload_images/8526589-f810bcf564bae1ec.png?imageMogr2/auto-orient/strip|imageView2/2/w/500/format/webp)

CRLF or LF

无论我们选择第一种还是第二种选项，我们都可以保证，提交至版本库的代码都会被统一转化成 `LF` 风格。背后的原理，从图中也可以看出来，其实就是把 `core.autocrlf` 选项设置成为了 `true` 或 `input`。当然，如果你是一个非常自律且注重细节，或者不喜欢被条条框框的规则约束，甚至有些洁癖的程序猿，你大可勇敢的选择第三个选项，然后优雅的配置好你的代码编辑器，保证所有提交的风格一致。

然而，你以为这样就万事大吉的了吗？不好意思，恶梦可能刚刚开始……

# 第2层问题：恶魔般的已修改状态

自从团队统一设置了 `core.autocrlf` 选项后，好长一段时间，我们的代码提交，都显得十分的干净明了。在 commit 和 patch 中，再也没有出现过大规模无意义的换行符修改。然而，直到有一天，在我们团队来了一名新员工后，这种和谐便被打破了。

我们真的不知道他到底做了些什么，我们只知道，当我们通过 `git pull` 命令与服务器同步后，有几个文件，在刚刚 `checkout` 至工作区且没有被任何编辑器打开或修改的状态下，它们就已经处于了 modified 状态。更可怕的是，对该文件重新执行 `checkout` 命令，问题依然存在：



```bash
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
    modified:   test.c
no changes added to commit (use "git add" and/or "git commit -a")
$ git checkout ./test.c 
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   test.c

no changes added to commit (use "git add" and/or "git commit -a")
```

这种问题，可能不少人都遇到过。是不是觉得有些抓狂，甚至有些担心，我们的版本库是不是被那个毛孩子搞坏了？可是问题究竟是如何产生的呢？

这种问题经常会出现在跨平台项目中的 Windows 开发环境中（喂，那些鄙视 Windows 的程序员不要闹哈，这个锅还真不能让 Windows 背）。虽然团队规定了换行符的统一风格，甚至还要求每个人都对 Git 做同样的设置。然而，总会有一些狂奔不羁爱自由的野马程序员，或者是一些举止粗旷的粗心程序员没有按章行事。于是，就有这样一位队友，在某次提交中，提交了一个混合了两种换行符的文件。接下来，剩下的那些乖孩子，由于之前设置过 `core.autocrlf = true`，在从服务器更新这个文件时，Git 会自动将文件转化为统一的 `CRLF` 风格。此时，如果对工作区里面的文件进行 `CRLF` 向 `LF` 风格的转换，然后将转换后的文件与版本库中的对应文件对比，Oops！就会发现这两个文件竟然不一致！Git 就是通过这种方式，认定一定是你自己把文件修改了……

如果你真的遇到了这个问题，也不要慌。通过先把 `core.autocrlf` 设置为 `false`，然后人工将该文件的换行符统一修改为 `LF` 并提交，最后再把 `core.autocrlf` 重新设置成 `true` 即可解决问题。

通过上面说的办法，虽然问题解决了。但是有人要问了：我这次虽然是解决了，但是团队这么多人，要是每天都有几个猪队友不小心，手一抖，再搞出几个这样的幺蛾子出来，我岂不是要被他们烦死？

不错，对于这种情况，Git 确实也提供了一个选项，叫做 `core.safecrlf`。当你同时设置了 `core.autocrlf` 与 `core.safecrlf` 参数后，如果你的提交混合了两种换行符，Git 就会根据你的设置发出警告，或者拒绝提交。

所以，这样，就又可以万事大吉了？抱歉，还是不行！

# 第3层问题：被毁掉的数据和工程

上面提到的被毁掉的 diff ，以及偶尔冒出来的小恶魔可能并没有那么严重。然而你要小心，换行符问题还可能毁掉你的代码和工程。在 [Git manpages](https://link.jianshu.com?t=https%3A%2F%2Fgitirc.eu%2Fgit-config.html) 中，有这样一段描述。

> CRLF conversion bears a slight chance of corrupting data. autocrlf=true will convert CRLF to LF during commit and LF to CRLF during checkout. A file that contains a mixture of LF and CRLF before the commit cannot be recreated by git. For text files this is the right thing to do: it corrects line endings such that we have only LF line endings in the repository. But for binary files that are accidentally classified as text the conversion can corrupt data.

简单来说，Git 的换行符自动切换功能虽然好用，但是是有一定风险的。因为，源码文件之所以允许换行符的随意切换，是因为源码对换行符这一数据是不敏感的。对于某些特定的数据，例如二进制文件。如果该文件被意外的识别成了文本文件，并执行了换行符转换，那么这个文件的数据可能就会被永久的损坏了。

什么，听起来有些耸人听闻？那我们就举两个口味稍微清淡点的例子：

- bash 脚本文件应当使用 `LF` 作为换行符，如果使用 `CRLF` 风格的换行符，bash 解释器可能无法正常工作；

![img](https:////upload-images.jianshu.io/upload_images/8526589-441eb6dffbedf594.png?imageMogr2/auto-orient/strip|imageView2/2/w/501/format/webp)

包含CRLF风格换行符的Bash脚本



```bash
$ ./crlf_bash.sh
-bash: ./crlf_bash.sh: /bin/sh^M: bad interpreter: No such file or directory
```

- Windows 批处理 bat 文件最好使用 `CRLF` 作为换行符，如果使用LF风格的换行符，且代码中包含了中文字符，那么解释器可能无法正常工作；

![img](https:////upload-images.jianshu.io/upload_images/8526589-1e11eb389e24e8c5.png?imageMogr2/auto-orient/strip|imageView2/2/w/499/format/webp)

中文+LF换行符的批处理脚本

![img](https:////upload-images.jianshu.io/upload_images/8526589-f4e0d68f215928f5.png?imageMogr2/auto-orient/strip|imageView2/2/w/500/format/webp)

批处理解释器出错

这两个例子，影响都比较有限。最多就是面对刚刚 clone 的代码无法运行的事实，略显崩溃。之后，你仍可以使用类似于 `unix2dos` 和 `dos2unix` 之类的工具对文件的格式进行转换来解决问题。然而，如果出问题的文件是一个二进制数据，那你只有哭了……

不过，幸好，Git 专门为我们提供了 `gitattributes` 功能，可以很好的解决这个问题。

# 优雅处理换行符的终极方法

以上提到的问题，其实可以总结为两类：

1. Git 的换行符转换策略配置需要与项目同步，不能仅仅是依靠团队规范来约束；
2. 文件是否需要做换行符转换处理，是由文件本身的属性决定的，需要对每个文件分别对待；

使用 `.gitattributes` 就完美解决了以上两个问题：

- `.gitattributes` 具有最高的优先级，无论你是否设置相关的换行符风格转化属性，你都可以和团队保持一致；
- 使用 `* text=auto` 可以定义开启全局的换行符转换；
- 使用 `*.bat text eol=crlf` 就可以保证 Windows 的批处理文件在 `checkout` 至工作区时，始终被转换为 `CRLF`  风格的换行符；
- 使用 `*.sh text eol=lf` 就可以保证 Bash 脚本无论在哪个平台上，只要被 `checkout` 至工作区，始终被保持 `LF` 风格的换行符；
- 使用 `*.jpg -text` 可以禁止 Git 将 jpg 文件识别为文本文件，从而避免由于换行符转换引入的数据损坏；

关于 `.gitattributes` 的详细使用方法，可以参考[Git Documentation:gitattributes](https://link.jianshu.com?t=https%3A%2F%2Fgit-scm.com%2Fdocs%2Fgitattributes)。

如果你觉得太麻烦，可以直接到[这里](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2Falexkaratarakis%2Fgitattributes)。链接中的网站，提供了一系列针对各种开发环境，已经写好了的 `.gitattributes` 文件。

所以，赶紧给你的项目添加一个 `.gitattributes` 文件吧！

# 参考资料

- [git-config(1) Manual Page](https://link.jianshu.com?t=https%3A%2F%2Fgitirc.eu%2Fgit-config.html)
- [Git Documentation:gitattributes](https://link.jianshu.com?t=https%3A%2F%2Fgit-scm.com%2Fdocs%2Fgitattributes)
- [A collection of useful .gitattributes templates](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2Falexkaratarakis%2Fgitattributes)



作者：王菜刀
链接：https://www.jianshu.com/p/fa4d5963b6c8
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

